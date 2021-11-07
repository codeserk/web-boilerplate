import { Injectable } from '@nestjs/common'
import * as moment from 'moment'

import { PaginatedOutput, PaginationInput } from '../../interfaces/pagination.types'
import { stringToObjectId } from '../../utils/mongodb'
import { EntryModel, EntryObject, InjectEntryModel } from './entry.schema'
import { EntryParams } from './interfaces/entry.interface'
import { EntryStats, EntryStatsQuantity, EntryStatsWeekComparison, FindEntriesInput } from './interfaces/entry.types'

@Injectable()
export class EntryService {
  /**
   * Constructor.
   * @param model
   */
  constructor(@InjectEntryModel() private readonly model: EntryModel) {}

  /**
   * Crates a new entry in the database
   * @param params
   */
  async createOne(params: EntryParams): Promise<EntryObject> {
    const created = await this.model.create({
      userId: stringToObjectId(params.userId),
      title: params.title,
      description: params.description,
      image: params.image,
      date: params.date,
    })

    return created?.toObject()
  }
  /**
   * Finds entries using some parameters
   * @param params
   */
  async findMultiple(params: FindEntriesInput): Promise<EntryObject[]> {
    const query: any = {}
    if (params.userId) {
      query.userId = stringToObjectId(params.userId)
    }
    if (params.fromDate) {
      query.date = { $gte: params.fromDate }
    }
    if (params.toDate) {
      if (!query.date) {
        query.date = {}
      }
      query.date.$lte = params.toDate
    }

    const entries = await this.model.find(query).sort({ date: -1 })

    return entries.map(entry => entry.toObject())
  }

  /**
   * Finds entries using some parameters
   * @param params
   * @param pagination
   */
  async findMultiplePaginated(
    params: FindEntriesInput,
    pagination: PaginationInput,
  ): Promise<PaginatedOutput<EntryObject>> {
    const query: any = {}
    if (params.userId) {
      query.userId = stringToObjectId(params.userId)
    }
    if (params.fromDate) {
      query.date = { $gte: params.fromDate }
    }
    if (params.toDate) {
      if (!query.date) {
        query.date = {}
      }
      query.date.$lte = params.toDate
    }

    const count = await this.model.count(query)
    const queryResult = await this.model
      .find(query)
      .populate('userId')
      .skip(pagination.page * pagination.limit)
      .limit(pagination.limit)
      .sort({ date: -1 })

    const entries = queryResult.map(entry => {
      const object = entry.toObject()

      return {
        ...object,
        user: object.userId,
      }
    })

    return {
      ...pagination,
      items: entries,
      count,
      pages: Math.ceil(count / pagination.limit),
    }
  }

  /**
   * Finds an entry by its id
   * @param id
   */
  async findById(id: string): Promise<EntryObject | undefined> {
    const entry = await this.model.findById(stringToObjectId(id))

    return entry?.toObject() ?? undefined
  }

  /**
   * Updates one entry by its id
   * @param id
   * @param params
   */
  async updateBtId(id: string, params: Omit<EntryParams, 'userId'>): Promise<EntryObject | undefined> {
    const entry = await this.model.findByIdAndUpdate(
      stringToObjectId(id),
      {
        title: params.title,
        description: params.description,
        image: params.image,
        date: params.date,
      },
      {
        new: true,
      },
    )

    return entry?.toObject() ?? undefined
  }

  /**
   * Deletes one entry by its id
   * @param id
   */
  async deleteById(id: string): Promise<void> {
    await this.model.findByIdAndDelete(stringToObjectId(id))
  }

  /**
   * Gets statistics from the entries in the database.
   */
  async calculateStats(): Promise<EntryStats> {
    return {
      entriesPerDay: await this.calculateEntriesPerDayStats(),
      entriesWeekComparison: await this.calculateWeekComparisonStats(),
    }
  }

  /**
   * Calculates the entries created per day
   */
  protected async calculateEntriesPerDayStats(): Promise<EntryStatsQuantity[]> {
    const date14DaysAgo = moment().subtract(14, 'days').toDate()

    return await this.model.aggregate([
      { $match: { date: { $gte: date14DaysAgo } } },
      // Format the createdAt field
      { $addFields: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } } },

      // Group by date and extract quantity of entries
      { $group: { _id: '$date', quantity: { $sum: 1 } } },
      { $sort: { _id: 1 } },

      // Project result
      { $project: { _id: 0, date: '$_id', quantity: 1 } },
    ])
  }

  /**
   * Calculates the week comparison stats
   */
  protected async calculateWeekComparisonStats(): Promise<EntryStatsWeekComparison> {
    const date14DaysAgo = moment().subtract(14, 'days').toDate()
    const date7DaysAgo = moment().subtract(7, 'days').toDate()

    const entriesPerWeek = await this.model.aggregate([
      { $match: { date: { $gte: date14DaysAgo } } },

      // Group by week and extract quantity of entries
      {
        $group: {
          _id: {
            $cond: [{ $lt: ['$date', date7DaysAgo] }, 'previous7Days', 'last7Days'],
          },
          quantity: { $sum: 1 },
        },
      },

      // Project result
      { $project: { _id: 0, bucket: '$_id', quantity: 1 } },
    ])

    return entriesPerWeek.reduce((result, row) => {
      result[row.bucket] = row.quantity

      return result
    }, {})
  }
}
