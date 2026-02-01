export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const getThemeColor = (count: number) => {
  if (count === 0) return "rgba(31, 41, 55, 0.4)";
  if (count <= 2) return "#4c1d95";
  if (count <= 5) return "#6d28d9";
  if (count <= 10) return "#8b5cf6";
  return "#c4b5fd";
};
