export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 3);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const generateRandomColor = () => {
  return "#" + Math.random().toString(16).substr(-6);
};
