export function allowed(role, permission) {
  if (role === "ADMIN") return ["content", "inquiries", "settings"].includes(permission);
  return role === "EDITOR" && permission === "content";
}
