const maxExpIndexEl: HTMLDivElement | null = document.querySelector(
  "[data-max-exp-index]"
);
const leftChveron: HTMLButtonElement | null = document.querySelector(
  "button.left-chevron"
);
const rightChveron: HTMLButtonElement | null = document.querySelector(
  "button.right-chevron"
);

const nbOfExperiences = Number(maxExpIndexEl?.dataset.maxExpIndex);
let currentExperienceIndex = 0; // Used to scroll through the experiences
let largestExpContent = -1; // Used to determine the min-height of the Experience section when the content is getting smaller

/* Used to decide if the "resize" event must be really fired or not
Example: On Mobile Safari, scrolling up and down might hide the URL bar
This hidding/showing effect fires the "resize" event and we don't really want to respond to that
The intention of "resize" is to adapt the Experience Card when the width changes, which is not this case
*/ 
let screenWidth = document.body.getClientRects()[0].width; 

rightChveron?.addEventListener("click", () => {
  if (currentExperienceIndex + 1 >= nbOfExperiences) return;

  // Hide current exp
  hideExp(currentExperienceIndex);
  // Show next exp
  showExp(++currentExperienceIndex);

  // Check whether button must be disabled (no more experiences left to move forward)
  if (currentExperienceIndex + 1 == nbOfExperiences) {
    rightChveron.disabled = true;
    rightChveron.classList.add("disabled-button");
  }

  // At this point, I moved to the right, so it is always possible to move to the left
  leftChveron.disabled = false;
  leftChveron.classList.remove("disabled-button");

  // New element is potentially larger, check and set its size, if needed
  updateLargestExpSection();
});

leftChveron?.addEventListener("click", () => {
  if (currentExperienceIndex - 1 < 0) return;
  // Hide current exp
  hideExp(currentExperienceIndex);
  // Show next exp
  showExp(--currentExperienceIndex);

  // Check whether button must be disabled (no more experiences left to move backward)
  if (currentExperienceIndex == 0) {
    leftChveron.disabled = true;
    leftChveron.classList.add("disabled-button");
  }
  // At this point, I moved to the left, so it is always possible to move to the righ
  rightChveron.disabled = false;
  rightChveron.classList.remove("disabled-button");

  // New element is potentially larger, check and set its size, if needed
  updateLargestExpSection();
});

function showExp(expIndex: number) {
  const nextExp = document.querySelector(`[data-exp="${expIndex}"]`);
  if (!nextExp) return;
  nextExp.classList.add("show");
  nextExp.classList.remove("hide");
}

function hideExp(expIndex: number) {
  const currentExp = document.querySelector(`[data-exp="${expIndex}"]`);
  if (!currentExp) return;
  currentExp.classList.add("hide");
  currentExp.classList.remove("show");
}

/** 
 * Calculate the max. height among all experiences
 * so that we can have a stable card height that makes a better UX

 * Resizing the window changes the grid layout, so it is a good candidate
 * to run the function below and guarantee we have enough room
 * Also, I guess it's a good approach to reset the height value
 * so we measure every experience again 
*/
window.addEventListener("resize", () => {
  const newScreenWidth = document.body.getClientRects()[0].width;
  if (newScreenWidth == screenWidth) return; 

  screenWidth = newScreenWidth;
  resetExpSectionCalculation();
});

window.addEventListener("DOMContentLoaded", () => {
  resetExpSectionCalculation();
});

function updateLargestExpSection() {
  // Selects the visible section to calculate its height
  const currentExpSection: HTMLDivElement | null = document.querySelector(".show[data-exp]");
  if (!currentExpSection) return;

  const height = currentExpSection.getBoundingClientRect().height;
  // Update largest value and CSS Custom Property
  largestExpContent = height > largestExpContent ? height : largestExpContent;
  document.body.style.setProperty(
    "--exp-min-height",
    `${largestExpContent.toString()}px`
  );
}

 /** 
 * Calculate the max. height among all experiences
 * so that we can have a stable card height that makes a better UX

 * Resizing the window changes the grid layout, so it is a good candidate
 * to run the function below and guarantee we have enough room
 * Also, I guess it's a good approach to reset the height value
 * so we measure every experience again 
*/
function resetExpSectionCalculation() {
 // Reset so measurements can restart properly
 largestExpContent = 0;
  document.querySelectorAll("[data-exp]").forEach(dataExp => {
    dataExp.classList.remove("min-experience-height");
  })
  updateLargestExpSection();
  document.querySelectorAll("[data-exp]").forEach(dataExp => {
    dataExp.classList.add("min-experience-height");
  }) 
}