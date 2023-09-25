export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}
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
