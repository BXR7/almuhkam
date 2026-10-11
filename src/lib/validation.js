export function validId(id) { return typeof id === "string" && /^[a-zA-Z0-9_-]{1,100}$/.test(id); }
export function validForm(data) {
  if (!(data instanceof FormData)) return false;
  let total = 0;
  for (const [key, value] of data) {
    if (typeof value !== "string" || key.length > 100 || value.length > 100000) return false;
    total += value.length;
  }
  return total <= 200000;
}
export function validInquiry({ name, email, phone, service, message }) {
  return typeof name === "string" && name.length > 0 && name.length <= 200 &&
    typeof email === "string" && email.length <= 254 && /^[^\s<>"@]+@[^\s<>"@]+\.[^\s<>"@]+$/.test(email) &&
    (!phone || (phone.length <= 40 && /^[+()0-9 .-]+$/.test(phone))) &&
    typeof service === "string" && service.length <= 200 &&
    typeof message === "string" && message.length > 0 && message.length <= 10000;
}
export function validEdits(value) {
  try {
    const edits = JSON.parse(value);
    return Array.isArray(edits) && edits.length <= 500 && edits.every(e =>
      e && [e.from, e.to, e.type].every(v => typeof v === "string" && v.length <= 2000));
  } catch { return false; }
}
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
