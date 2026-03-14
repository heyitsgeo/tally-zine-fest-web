type RuntimeEnv = Record<string, string | undefined>;

function get(key: string, runtimeEnv?: RuntimeEnv): string | undefined {
	return runtimeEnv?.[key] ?? import.meta.env[key];
}

export function getEnv(runtimeEnv?: RuntimeEnv) {
	return {
		instagramUrl: get('PUBLIC_INSTAGRAM_URL', runtimeEnv),
		facebookUrl: get('PUBLIC_FACEBOOK_URL', runtimeEnv),
		contactEmail: get('PUBLIC_CONTACT_EMAIL', runtimeEnv),
		googleServiceAccountEmail: get('GOOGLE_SERVICE_ACCOUNT_EMAIL', runtimeEnv),
		googlePrivateKey: get('GOOGLE_PRIVATE_KEY', runtimeEnv),
		contactGoogleSheetId: get('CONTACT_GOOGLE_SHEET_ID', runtimeEnv),
		resendAPIKey: get('RESEND_API_KEY', runtimeEnv),
		resendFrom: get('RESEND_FROM', runtimeEnv),
		contactEmailDistroList: get('CONTACT_EMAIL_DISTRO_LIST', runtimeEnv),
		disableMailer: get('DISABLE_MAILER', runtimeEnv) === 'true',
	};
}
