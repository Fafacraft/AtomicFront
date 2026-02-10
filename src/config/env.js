// In the browser (Vite), use `import.meta.env` for environment variables.
// `.env` files are loaded by Vite during dev/build; prefix vars with `VITE_`.
export const env = {
  backServiceToken: import.meta.env.VITE_BACK_SERVICE_TOKEN,
  backServiceUrl: import.meta.env.VITE_BACK_SERVICE_URL,
};