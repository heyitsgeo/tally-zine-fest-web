interface ImportMetaEnv {
	readonly PUBLIC_INSTAGRAM_URL: string;
	readonly PUBLIC_FACEBOOK_URL: string;
	readonly PUBLIC_CONTACT_EMAIL: string;
	readonly GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
	readonly GOOGLE_PRIVATE_KEY: string;
	readonly CONTACT_GOOGLE_SHEET_ID: string;
	readonly RESEND_API_KEY: string;
	readonly RESEND_FROM: string;
	readonly CONTACT_EMAIL_DISTRO_LIST: string;
	readonly DISABLE_MAILER: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
