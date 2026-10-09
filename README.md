# React + Vite

## CEO admin access

Only the account matching `VITE_CEO_EMAIL` and `VITE_CEO_PASSWORD` receives admin access. Copy `.env.example` to `.env`, replace both values with private credentials, and restart the Vite server. Customer login is limited to people who have completed the signup form; each signup creates a profile that is saved in the browser. Customer accounts cannot see or open `/admin`.

This frontend-only protection controls the interface, not a secure backend. For real production security, product changes should be sent to a server or CMS that authenticates the CEO on every request.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
