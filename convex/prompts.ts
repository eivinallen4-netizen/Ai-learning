export function buildStudyPrompt(sourceText: string): string {
  return [
    "Generate study outputs that are specific to this source text only.",
    "Do not use outside knowledge.",
    "",
    "Full source context:",
    sourceText.trim(),
  ].join("\n");
}

