// Typing Effect for Prolog Section
document.addEventListener("DOMContentLoaded", function () {
  const textArray = [
    "passionate about learning technology,",
    "especially when it comes to algorithms and programming.",
  ];

  const typedTextElement = document.getElementById("typed-text");
  const cursorElement = document.querySelector(".cursor");

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;
  let deletingSpeed = 50;
  let pauseEnd = 2000;
  let pauseStart = 500;

  function type() {
    const currentLine = textArray[lineIndex];

    if (!isDeleting) {
      // Typing
      typedTextElement.innerHTML =
        textArray
          .slice(0, lineIndex)
          .map((line) => `<i>${line}</i>`)
          .join("<br>") +
        (lineIndex < textArray.length
          ? `<br><i>${currentLine.substring(0, charIndex)}</i>`
          : "");

      charIndex++;

      if (charIndex > currentLine.length) {
        // Finished typing current line
        lineIndex++;
        charIndex = 0;

        if (lineIndex < textArray.length) {
          // Move to next line
          setTimeout(type, pauseStart);
        } else {
          // Finished all lines, pause then restart
          setTimeout(() => {
            isDeleting = true;
            lineIndex = textArray.length - 1;
            charIndex = currentLine.length;
            type();
          }, pauseEnd);
        }
        return;
      }
    } else {
      // Deleting
      if (lineIndex >= 0) {
        const currentLineForDelete = textArray[lineIndex];

        typedTextElement.innerHTML =
          textArray
            .slice(0, lineIndex)
            .map((line) => `<i>${line}</i>`)
            .join("<br>") +
          (charIndex > 0
            ? `<br><i>${currentLineForDelete.substring(0, charIndex)}</i>`
            : "");

        charIndex--;

        if (charIndex < 0) {
          // Finished deleting current line
          lineIndex--;

          if (lineIndex >= 0) {
            // Move to previous line
            charIndex = textArray[lineIndex].length;
          } else {
            // Finished deleting all lines, restart typing
            isDeleting = false;
            lineIndex = 0;
            charIndex = 0;
            setTimeout(type, pauseStart);
            return;
          }
        }
      }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
  }

  // Start typing effect
  setTimeout(type, pauseStart);
});
