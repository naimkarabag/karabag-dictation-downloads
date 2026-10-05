for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    const code = button.closest(".field").querySelector("code");
    const status = document.getElementById("copy-status");
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = "Feld kopiert: " + code.textContent;
      button.textContent = "Kopiert";
      setTimeout(() => {
        button.textContent = "Kopieren";
      }, 2000);
    } catch {
      status.textContent = "Bitte den markierten Text manuell kopieren.";
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
}
