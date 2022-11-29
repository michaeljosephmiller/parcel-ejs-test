export const startOverlayObserver = () => {
  const OVERLAY = document.querySelector(".overlay");
  const MAIN = document.querySelector("main");

  if (OVERLAY && MAIN) {
    // Create mutation observer to hide overlay when triggered
    const observer = new MutationObserver(function (mutationsList, observer) {
      console.log(mutationsList);
      OVERLAY.classList.toggle("hidden");
    });

    // Set observer to observe .plot div for changes in child list.
    observer.observe(MAIN, {
      characterData: false,
      childList: true,
      attributes: false,
    });
  } else {
    console.log("No OVERLAY found");
  }
};
