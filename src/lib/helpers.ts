export const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

export const mediumDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

/**
 * Return the proper dataFormatter based on the screen width
 * My plan is to use a shorter format in small screen
 */
export function getDataFormatterBasedOnScreen() {
  // 400px width seems good enough to state we are dealing with a small real state
  if (window.screen.width <= 400) {
    return mediumDateFormatter;
  }
  else {
    return longDateFormatter;
  }
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
