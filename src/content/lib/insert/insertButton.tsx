import insertNewElement from "utils/insertNewElement";
import renderComponent from "utils/renderComponent";
import Button from "../../components/Button";

export default function insertButton() {
  const ghostityButton = insertNewElement<"button">({
    parentElement: document.querySelector(
      ".ytp-right-controls"
    ) as HTMLDivElement,
    tag: "button",
    class: "ytp-button relative -top-[1.2rem] h-[48px] w-[48px]",
    id: "ghostity",
    prepend: true,
  });

  // For Tooltip
  ghostityButton.addEventListener("mouseenter", () => {
    const tooltip = document.querySelector(
      ".ytp-tooltip.ytp-bottom"
    ) as HTMLDivElement;

    const tooltipText = document.querySelector(
      ".ytp-tooltip-text"
    ) as HTMLSpanElement;

    // For smoother transition between YouTube tooltips and Ghostity tooltip
    tooltip.style.display = "none";

    setTimeout(() => {
      tooltip.style.display = "unset";
      tooltipText.innerHTML = "Ghostity";
      tooltip.style.left = `${ghostityButton.offsetLeft - 12}px`;
    }, 100);
  });

  ghostityButton.addEventListener("mouseleave", () => {
    const tooltip = document.querySelector(
      ".ytp-tooltip.ytp-bottom"
    ) as HTMLDivElement;

    tooltip.style.display = "none";
  });
  
  renderComponent(<Button />, ghostityButton);
}
