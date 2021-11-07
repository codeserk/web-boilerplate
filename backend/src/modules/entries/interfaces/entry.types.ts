export interface FindEntriesInput {
  /** User id that has created the entry */
  readonly userId?: string

  /** Initial date from which should look for entries */
  readonly fromDate?: Date

  /** Final date before which should look for entries */
  readonly toDate?: Date
}

/** Statistics from the entities */
export interface EntryStats {
  readonly entriesPerDay: EntryStatsQuantity[]
  readonly entriesWeekComparison: EntryStatsWeekComparison
}

/** Quantity of entries created per day (from all the users) */
export interface EntryStatsQuantity {
  readonly date: Date
  readonly quantity: number
}

/** Quantity of entries created previous 7 days compared to the entries created last 7 days */
export interface EntryStatsWeekComparison {
  readonly previous7Days: number
  readonly last7Days: number
}
