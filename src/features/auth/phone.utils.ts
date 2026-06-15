export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function isPhoneComplete(phone: string) {
  return normalizePhone(phone).length === 11;
}

export function formatPhone(phone: string) {
  const normalized = normalizePhone(phone);
  return normalized.replace(
    /^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/,
    "+$1 ($2) $3‑$4‑$5",
  );
}
