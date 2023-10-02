export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

export function getCurrentTimeInBrazil(): Date {
  // Create a date object with the current UTC time
  const now = new Date();

  // Convert the UTC time to Brazil's time
  const offsetBrazil = -3; 
  now.setHours(now.getUTCHours() + offsetBrazil);

  return now;
}

export function formatTimeForBrazil(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Format in the 24-hour format
    timeZone: "America/Sao_Paulo",
  };

  let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedTime;
}
