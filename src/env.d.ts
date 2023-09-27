/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_ID: string
    readonly VITE_BLOWFISH_KEY: string
    readonly VITE_BLOWFISH_IV: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}