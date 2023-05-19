/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_VAR: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }