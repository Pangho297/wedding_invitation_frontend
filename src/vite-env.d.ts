/// <reference types="vite/client" />

// 환경변수를 typescript의 intellisense 감지를 위한 타입 지정
interface ImportMetaEnv {
  readonly VITE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
