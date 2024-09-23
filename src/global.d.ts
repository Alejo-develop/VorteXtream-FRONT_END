// src/global.d.ts
export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    botpressWebChat: any; // Cambia `any` por el tipo correcto si lo conoces
  }
}
