export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function isPhoneComplete(phone: string) {
  return normalizePhone(phone).length === 11;
}
