const DEFAULT_ADMIN_EMAILS = ['aditya.gupta10jan@gmail.com'];

export function getAdminEmails() {
  const configured = String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return configured.length ? configured : DEFAULT_ADMIN_EMAILS;
}

export function isAdminEmail(email = '') {
  if (!email) return false;
  return getAdminEmails().includes(String(email).trim().toLowerCase());
}
