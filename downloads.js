// Only the release assembler supplies links; no browser account or access token.
(async () => {
  const status = document.getElementById("release-status");
  try {
    const response = await fetch("downloads.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Release unavailable");
    const release = await response.json();
    for (const [id, key] of [
      ["mac-download", "mac"],
      ["windows-download", "windows"],
    ]) {
      const url = new URL(release[key]);
      if (
        url.protocol !== "https:" ||
        url.hostname !== "github.com" ||
        !url.pathname.startsWith(
          "/naimkarabag/karabag-dictation-downloads/releases/download/",
        )
      )
        throw new Error("Unexpected download source");
      const link = document.getElementById(id);
      link.href = url.href;
      link.removeAttribute("aria-disabled");
    }
    document.getElementById("version").textContent =
      `Version ${release.version}`;
    status.textContent =
      "Die Modelle werden nur bei der ersten Einrichtung geladen. App-Updates laden sie nicht erneut.";
  } catch {
    status.textContent =
      "Die Downloads sind noch nicht veröffentlicht. Bitte später erneut versuchen.";
  }
})();
