/** Diary entry interface */
export interface Entry {
  /** Entry's id. */
  readonly id: string

  /** Id of the user that has created the entry. */
  readonly userId: string

  /** Title of the entry. */
  readonly title: string

  /** Description of the entry. */
  readonly description: string

  /** ID of the image */
  readonly image?: string

  /** Date when the entry was added. */
  readonly date: Date
}

export type EntryParams = Omit<Entry, 'id'>
