import { contactFormSchema } from '@/lib/contact-schema';
import { getEnv } from '@/lib/env';
import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { DateTime } from 'luxon';
import { Resend } from 'resend';
const requestTokens = new Set<string>();

const contactRequestSchema = contactFormSchema.extend({
	idempotencyKey: z.string().min(1),
	company: z.string().optional(),
	phone: z.string().optional(),
});

type ContactRequest = z.infer<typeof contactRequestSchema>;

export const server = {
	submitContactForm: defineAction({
		accept: 'form',
		input: contactRequestSchema,
		handler: async (input, context) => {
			const ENV = getEnv(context.locals.runtime.env);

			const googleAuth = new JWT({
				email: ENV.googleServiceAccountEmail,
				key: ENV.googlePrivateKey,
				scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/gmail.send'],
			});

			const tallyZineFestDoc = new GoogleSpreadsheet(ENV.contactGoogleSheetId, googleAuth);
			const resend = new Resend(ENV.resendAPIKey);

			const matchingRequestToken = requestTokens.has(input.idempotencyKey);

			if (matchingRequestToken) {
				console.info('Duplicate request detected.');
				return { success: true };
			}

			requestTokens.add(input.idempotencyKey);

			const submittedAt = DateTime.now();
			const isSpam = !!(input.company || input.phone);

			async function appendContactToSheet(input: ContactRequest & { submittedAt: DateTime; isSpam: boolean }) {
				await tallyZineFestDoc.loadInfo();
				const sheet = tallyZineFestDoc.sheetsById[0];

				await sheet.addRow([
					input.submittedAt.setZone('America/New_York').toLocaleString(DateTime.DATETIME_SHORT),
					input.name,
					input.email,
					input.subject,
					input.message,
					input.isSpam ? 'SPAM' : '',
				]);
			}

			async function sendEmails(input: ContactRequest & { submittedAt: DateTime }) {
				await Promise.all([
					resend.emails.send({
						from: `Tally Zine Fest <${ENV.resendFrom}>`,
						to: import.meta.env.DEV ? 'delivered@resend.dev' : input.email,
						subject: `We received your message, ${input.name}`,
						text: `Hi ${input.name},\n\nThanks for reaching out. We've received your message and will be in touch soon.\n\n- Tally Zine Fest Crew`,
					}),
					resend.emails.send({
						from: `Tally Zine Fest Site <${ENV.resendFrom}>`,
						to: import.meta.env.DEV ? 'delivered@resend.dev' : ENV.contactEmailDistroList.split(','),
						subject: `New contact request from ${input.name}`,
						text: `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${input.subject}Date: ${input.submittedAt.setZone('America/New_York').toLocaleString(DateTime.DATETIME_SHORT)}\nMessage: ${input.message}`,
					}),
				]);
			}

			try {
				if (isSpam) {
					console.info('Spam submission detected, logging to sheet without emailing.');
					await appendContactToSheet({ ...input, submittedAt, isSpam: true });
				} else {
					const tasks: Promise<unknown>[] = [appendContactToSheet({ ...input, submittedAt, isSpam: false })];
					if (ENV.disableMailer) {
						console.info('Mailer disabled, skipping email send.');
					} else {
						tasks.push(sendEmails({ ...input, submittedAt }));
					}
					await Promise.all(tasks);
				}
			} catch (error) {
				console.error(error);
				return { success: false };
			} finally {
				console.info('Clearing idempotency key, request is complete.');
				requestTokens.delete(input.idempotencyKey);
			}

			console.info('Successfully processed contact request.');
			return { success: true };
		},
	}),
};
