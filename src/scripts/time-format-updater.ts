import { getDataFormatterBasedOnScreen } from "../lib/helpers.ts";

let screenWidth = -1;
window.addEventListener("DOMContentLoaded", () => {
  updateFormatTime();
});

window.addEventListener("resize", () => {
  updateFormatTime();
});

function updateFormatTime() {
  const newScreenWidth = document.body.getClientRects()[0].width;
  if (newScreenWidth == screenWidth) return;
  screenWidth = newScreenWidth;

  const timeListEl = document.querySelectorAll("[data-date]");
  if (!timeListEl) return;

  timeListEl.forEach((timeEl) => {
    const isoDate = timeEl?.dataset.date;
    if (!isoDate) return;

    const formattedDate = getDataFormatterBasedOnScreen().format(
      new Date(isoDate)
    );
    timeEl.textContent = formattedDate;
  });
}