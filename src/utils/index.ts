export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 3);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const generateRandomColor = () => {
  return "#" + Math.random().toString(16).substr(-6);
};

export const formatCellphone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})/, "$1-$2")
    .slice(0, 15);
};

export const formatCep = (value: string) => {
  if (!value) return "";
  const rawValue = value.replace(/\D/g, "");
  return rawValue.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
};
