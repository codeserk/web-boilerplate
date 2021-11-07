import { Avatar, Button, Drawer, Popconfirm, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { EntriesStoreContext } from 'frontend/modules/entries/entry.store'
import moment from 'moment'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EntryForm } from '../../components/EntryForm'

const PAGINATION_LIMIT = 12

export default function AdminEntriesPage() {
  const { t } = useTranslation()

  const { isLoading, entriesPage, loadEntriesPage, updateEntry, deleteEntry } = useContext(
    EntriesStoreContext,
  )

  const [selectedId, setSelectedId] = useState()

  const selected = useMemo(() => entriesPage?.items?.find((item) => item.id === selectedId), [
    selectedId,
  ])

  const tableColumns: ColumnProps<any>[] = useMemo(
    () => [
      {
        title: 'User',
        dataIndex: ['user', 'username'],
      },
      {
        title: 'Image',
        dataIndex: 'image',
        render(value) {
          return <Avatar src={value} shape="square" size="large" alt="Image" />
        },
      },
      {
        title: 'Title',
        dataIndex: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Added at',
        dataIndex: 'date',
        render(value) {
          return moment(value).format('YYYY-MM-DD HH:mm')
        },
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render(entry) {
          return (
            <Popconfirm
              title="Are you sure to delete this food entry?"
              onConfirm={async (e) => {
                e.stopPropagation()
                await deleteEntry(entry.id)
                await loadEntriesPage(entriesPage?.page, entriesPage?.limit)
              }}
              onCancel={(e) => e.stopPropagation()}
              okText="Yes"
              cancelText="No">
              <Button
                href="#"
                size="small"
                type="ghost"
                danger
                onClick={(e) => e.stopPropagation()}>
                Delete
              </Button>
            </Popconfirm>
          )
        },
      },
    ],
    [entriesPage],
  )

  useEffect(() => {
    loadEntriesPage(0, PAGINATION_LIMIT)
  }, [])

  return (
    <div>
      <Table
        dataSource={entriesPage?.items ?? []}
        loading={isLoading}
        columns={tableColumns}
        rowKey="id"
        rowSelection={{
          type: 'radio',
          columnWidth: 32,
          selectedRowKeys: selectedId ? [selectedId] : [],
          onChange: (keys) => {
            if (keys && keys[0]) {
              setSelectedId(keys[0] as any)
            } else {
              setSelectedId(null)
            }
          },
        }}
        onRow={(row) => ({
          onClick() {
            if (row.id === selectedId) {
              setSelectedId(null)
            } else {
              setSelectedId(row.id)
            }
          },
        })}
        pagination={{
          pageSize: entriesPage?.limit ?? PAGINATION_LIMIT,
          total: entriesPage?.count ?? 0,
          onChange: (page: number, limit: number) => loadEntriesPage(page - 1, limit),
        }}
      />
      <Drawer
        title={'Edit Entry'}
        placement="right"
        width={400}
        mask={false}
        onClose={() => setSelectedId(null)}
        closable={!isLoading}
        visible={!!selectedId}>
        <EntryForm
          isLoading={isLoading}
          values={selected}
          submitTitle={t('diary.updateButton')}
          onSubmit={async (params) => {
            const image = params.image ? params.image[0]?.response : undefined
            await updateEntry(selectedId, params.date, params.title, params.description, image)
            await loadEntriesPage(entriesPage?.page, entriesPage?.limit)

            setSelectedId(null)
          }}
        />
      </Drawer>
    </div>
  )
}
