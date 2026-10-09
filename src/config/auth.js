const defaultCeoEmail = 'ceo@emberandloam.com'
const defaultCeoPassword = 'change-this-ceo-password'

export const ceoEmail = import.meta.env.VITE_CEO_EMAIL || defaultCeoEmail
export const ceoPassword = import.meta.env.VITE_CEO_PASSWORD || defaultCeoPassword

export function isCeoCredentials(email, password) {
  return email.trim().toLowerCase() === ceoEmail.toLowerCase() && password === ceoPassword
}
