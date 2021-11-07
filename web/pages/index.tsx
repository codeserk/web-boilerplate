import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Avatar, Button, DatePicker, List, Space, Typography } from 'antd'
import { EntriesStoreContext } from 'frontend/modules/entries/entry.store'
import moment from 'moment'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { EntryForm } from '../components/EntryForm'

export default function HomePage() {
  const { t } = useTranslation()

  const { isLoading, date, entries, changeDate, addEntry } = useContext(EntriesStoreContext)

  const momentDate = useMemo(() => moment(date), [date])

  async function onSubmit(params) {
    const image = params.image[0]?.response
    await addEntry(params.date.toDate(), params.title, params.description, image)
  }

  return (
    <Container>
      <List
        className="list"
        header={
          <Space className="header">
            <Button
              icon={<LeftOutlined />}
              onClick={() => changeDate(moment(date).subtract(1, 'day').toDate())}
            />
            <DatePicker
              value={momentDate}
              onChange={(newDate) => changeDate(newDate?.toDate() ?? new Date())}
              allowClear={false}
              disabledDate={(date) => date.isAfter(moment())}
            />
            <Button
              icon={<RightOutlined />}
              onClick={() => changeDate(moment(date).add(1, 'day').toDate())}
              disabled={moment(date).isSame(moment(), 'day')}
            />
          </Space>
        }
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={entries}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={item.description}
              avatar={item.image && <Avatar src={item.image} shape="square" size="large" />}
            />
          </List.Item>
        )}
      />
      <div className="details">
        <div className="form-container">
          <Typography.Title level={2}>New Diary Entry</Typography.Title>

          <EntryForm
            isLoading={isLoading}
            values={{ date: moment(), image: [] }}
            onSubmit={onSubmit}
            submitTitle={t('diary.addButton')}
          />
        </div>
      </div>
    </Container>
  )
}

// Style

const Container = styled.div`
  @media (min-width: 720px) {
    display: flex;
  }

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
  }

  .list {
    min-width: 40%;

    .ant-spin-nested-loading {
      height: calc(100vh - 310px);
      overflow-y: scroll;
    }

    .ant-list-item {
      padding-right: 12px;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 0 1em;

    .form-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .ant-typography {
        margin-bottom: 1em;
      }
    }
  }
`
