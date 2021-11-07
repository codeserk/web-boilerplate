import { EntryDto, PaginatedResultResponse, PopulatedEntryDto } from '../../client'
import { Config } from '../../interfaces/config.interface'

/**
 * Transforms the incoming entry.
 * Adds the base url.
 * @param entry
 * @param config
 * @returns transformed entry
 */
export function transformEntry(entry: EntryDto, config: Config): EntryDto {
  return {
    ...entry,
    image: entry.image ? `${config.api.baseUrl}${entry.image}` : undefined,
  }
}

/**
 * Transforms the incoming entry.
 * Adds the base url.
 * @param entry
 * @param config
 * @returns transformed entry
 */
export function transformPopulatedEntry(
  entry: PopulatedEntryDto,
  config: Config,
): PopulatedEntryDto {
  return {
    ...entry,
    image: entry.image ? `${config.api.baseUrl}${entry.image}` : undefined,
  }
}

/**
 * Transforms a paginated result.
 * @param page
 * @param config
 * @returns transformed page
 */
export function transformEntryPage(
  page: PaginatedResultResponse,
  config: Config,
): PaginatedResultResponse {
  return {
    ...page,
    items: page.items.map((item) => transformPopulatedEntry(item, config)),
  }
}
