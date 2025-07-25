// Helper functions for chart data generation and manipulation

export function generateRandomValues(min: number, max: number, count: number): number[] {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

export function getColorPalette(count: number): string[] {
  const baseColors = [
    "rgba(73, 173, 245, 1)", // light blue
    "rgba(33, 150, 243, 1)", // blue
    "rgba(0, 188, 212, 1)", // cyan
    "rgba(0, 150, 136, 1)", // teal
    "rgba(76, 175, 80, 1)", // green
    "rgba(174, 213, 129, 1)", // light green
    "rgba(205, 220, 57, 1)", // lime
    "rgba(255, 193, 7, 1)", // amber
    "rgba(255, 152, 0, 1)", // orange
  ]

  // If we need more colors than we have in our base palette, we'll repeat them
  if (count <= baseColors.length) {
    return baseColors.slice(0, count)
  }

  // Otherwise, repeat the palette
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(baseColors[i % baseColors.length])
  }

  return result
}
