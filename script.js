// Typing Effect for Prolog Section
document.addEventListener("DOMContentLoaded", function () {
  const textArray = [
    "passionate about learning technology,",
    "especially when it comes to algorithms and programming.",
  ];

  const typedTextElement = document.getElementById("typed-text");
  const lineIndex = { current: 0 };
  const charIndex = { current: 0 };
  let isDeleting = false;

  const TYPING_SPEED = 80;
  const DELETING_SPEED = 50;
  const PAUSE_END = 2000;
  const PAUSE_START = 500;

  function type() {
    const currentLine = textArray[lineIndex.current];

    if (!isDeleting) {
      typedTextElement.innerHTML =
        textArray
          .slice(0, lineIndex.current)
          .map((line) => `<i>${line}</i>`)
          .join("<br>") +
        (lineIndex.current < textArray.length
          ? `<br><i>${currentLine.substring(0, charIndex.current)}</i>`
          : "");

      charIndex.current++;

      if (charIndex.current > currentLine.length) {
        lineIndex.current++;
        charIndex.current = 0;

        if (lineIndex.current < textArray.length) {
          setTimeout(type, PAUSE_START);
        } else {
          setTimeout(() => {
            isDeleting = true;
            lineIndex.current = textArray.length - 1;
            charIndex.current = textArray[lineIndex.current].length;
            type();
          }, PAUSE_END);
        }
        return;
      }
    } else {
      const currentLineForDelete = textArray[lineIndex.current];

      typedTextElement.innerHTML =
        textArray
          .slice(0, lineIndex.current)
          .map((line) => `<i>${line}</i>`)
          .join("<br>") +
        (charIndex.current > 0
          ? `<br><i>${currentLineForDelete.substring(0, charIndex.current)}</i>`
          : "");

      charIndex.current--;

      if (charIndex.current < 0) {
        lineIndex.current--;

        if (lineIndex.current >= 0) {
          charIndex.current = textArray[lineIndex.current].length;
        } else {
          isDeleting = false;
          lineIndex.current = 0;
          charIndex.current = 0;
          setTimeout(type, PAUSE_START);
          return;
        }
      }
    }

    setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  setTimeout(type, PAUSE_START);
});
