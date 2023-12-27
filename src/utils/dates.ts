export const dateFromTimestamp = (created_at: string) => {
  const date = new Date(parseInt(created_at));
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return formattedDate;
};
