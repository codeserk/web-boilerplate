export interface PaginationInput {
  /** Requested page */
  readonly page: number

  /** Max number of items */
  readonly limit: number
}

export interface PaginatedOutput<T> {
  /** Requested page */
  readonly page: number

  /** Max number of entries */
  readonly limit: number

  /** Items found in the page */
  readonly items: T[]

  /** Total number of pages */
  readonly pages: number

  /** Total number of items */
  readonly count: number
}
