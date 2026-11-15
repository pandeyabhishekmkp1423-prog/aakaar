/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_MARKETING_SITE_URL?: string;
  readonly VITE_GOVERNING_PROVINCE?: string;
  readonly VITE_CONVERSION_EVENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

