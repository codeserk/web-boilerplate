import moment from 'moment'
import { createContext, useEffect, useState } from 'react'

import { api } from '../../api/clients'
import { EntryDto, EntryStatsResponse, PaginatedResultResponse } from '../../client'
import { AuthStore } from '../auth/auth.store'
import { SettingsStore } from '../settings/settings.store'
import { transformEntry, transformEntryPage } from './entry.transformer'

export function useEntriesStore(settings: SettingsStore, auth: AuthStore) {
  // State

  const [isLoading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const [entries, setEntries] = useState<EntryDto[]>([])
  const [entriesPage, setEntriesPage] = useState<PaginatedResultResponse | null>(null)
  const [stats, setStats] = useState<EntryStatsResponse | null>(null)

  // Getters

  // Actions

  /**
   * Loads entries from the current date
   */
  async function loadEntries(date: Date) {
    setLoading(true)

    try {
      const response = await api.entries.getEntries({
        fromDate: moment(date).startOf('day').toISOString(),
        toDate: moment(date).endOf('day').toISOString(),
      })

      setEntries(response.data.map((item) => transformEntry(item, settings.config)))
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  async function changeDate(newDate: Date) {
    setDate(newDate)

    await loadEntries(newDate)
  }

  /**
   * Loads one page of entries
   * @param page
   * @param limit
   */
  async function loadEntriesPage(page: number, limit: number) {
    setLoading(true)

    try {
      const result = await api.entries.getAllEntriesPaginated({ page, limit })
      setEntriesPage(transformEntryPage(result.data, settings.config))
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  /**
   * Adds a new entry
   * @param date
   * @param title
   * @param description
   * @param image
   */
  async function addEntry(date: Date, title: string, description: string, image?: string) {
    setLoading(true)

    try {
      await api.entries.createEntry({
        entryParamsRequest: {
          title,
          description,
          image,
          date: moment(date).toISOString(),
        },
      })
      await loadEntries(date)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  /**
   * Adds a new entry
   * @param id
   * @param date
   * @param title
   * @param description
   * @param image
   */
  async function updateEntry(
    id: string,
    date: Date,
    title: string,
    description: string,
    image?: string,
  ) {
    setLoading(true)

    try {
      await api.entries.updateEntry({
        id,
        entryParamsRequest: {
          title,
          description,
          image,
          date: moment(date).toISOString(),
        },
      })
      await loadEntries(date)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  /**
   * Deletes an entry
   * @param id
   */
  async function deleteEntry(id: string) {
    setLoading(true)

    try {
      await api.entries.deleteEntry({ id })
      await loadEntries(date)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  async function loadStats() {
    setLoading(true)

    try {
      const stats = await api.entries.getEntryStats()

      setStats(stats.data)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  // Effects

  useEffect(() => {
    if (auth.isAuthenticated) {
      loadEntries(date)
    } else {
      setEntries([])
    }
  }, [auth.isAuthenticated])

  return {
    isLoading,
    date,
    entries,
    stats,
    entriesPage,

    changeDate,
    addEntry,
    updateEntry,
    deleteEntry,
    loadStats,
    loadEntriesPage,
  }
}

export type EntriesStore = ReturnType<typeof useEntriesStore>

export const EntriesStoreContext = createContext<EntriesStore>(null as any)
