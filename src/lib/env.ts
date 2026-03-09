export const ENV = {
	instagramUrl: import.meta.env.PUBLIC_INSTAGRAM_URL ?? process.env.PUBLIC_INSTAGRAM_URL,
	facebookUrl: import.meta.env.PUBLIC_FACEBOOK_URL ?? process.env.PUBLIC_FACEBOOK_URL,
	contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? process.env.PUBLIC_CONTACT_EMAIL,
	googleServiceAccountEmail: import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	googlePrivateKey: import.meta.env.GOOGLE_PRIVATE_KEY ?? process.env.GOOGLE_PRIVATE_KEY,
	contactGoogleSheetId: import.meta.env.CONTACT_GOOGLE_SHEET_ID ?? process.env.CONTACT_GOOGLE_SHEET_ID,
	resendAPIKey: import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY,
	resendFrom: import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY,
	contactEmailDistroList: import.meta.env.CONTACT_EMAIL_DISTRO_LIST ?? process.env.CONTACT_EMAIL_DISTRO_LIST,
	disableMailer: (import.meta.env.DISABLE_MAILER ?? process.env.DISABLE_MAILER) === 'true',
};
