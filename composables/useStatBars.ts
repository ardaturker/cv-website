/**
 * Shared maths for the segmented "stat screen" bars used by the skills and
 * projects sections. A 0–100 value is spread across five cells; each cell
 * covers a 20-point band and fills proportionally within it.
 */
export const STAT_CELLS = 5

/** Fill percentages (0–100) for each of the five cells of a bar. */
export function statCells(value: number): number[] {
  return Array.from({ length: STAT_CELLS }, (_, i) =>
    Math.max(0, Math.min(100, ((value - i * 20) / 20) * 100)),
  )
}

/** Tier word for a project workstream contribution. */
export function contributionTier(value: number): string {
  if (value >= 95) return 'Owned'
  if (value >= 80) return 'Major'
  if (value >= 60) return 'Shared'
  return 'Support'
}

/** Tier word for a skill proficiency. */
export function skillTier(value: number): string {
  if (value >= 95) return 'Expert'
  if (value >= 80) return 'Advanced'
  if (value >= 60) return 'Proficient'
  return 'Familiar'
}
