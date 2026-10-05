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
      ["windows-x64-download", "windows_x64"],
      ["windows-arm-download", "windows_arm"],
      ["intune-download", "intune"],
      ["intune-detect-download", "intune_detect"],
    ]) {
      const link = document.getElementById(id);
      if (!link) continue;
      if (!release[key]) throw new Error("Download unavailable");
      const url = new URL(release[key]);
      if (
        url.protocol !== "https:" ||
        url.hostname !== "github.com" ||
        ![
          "/naimkarabag/karabag-dict-downloads/releases/download/",
          "/naimkarabag/karabag-dictation-downloads/releases/download/",
        ].some((prefix) => url.pathname.startsWith(prefix))
      )
        throw new Error("Unexpected download source");
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
