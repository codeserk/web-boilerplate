import { BarConfig } from '@ant-design/charts'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Col, Empty, Row, Space, Statistic, Typography } from 'antd'
import { EntriesStoreContext } from 'frontend/modules/entries/entry.store'
import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { Color } from '../../src/styles/variables'

const Bar = dynamic(() => import('@ant-design/charts').then((mod) => mod.Bar) as any, {
  ssr: false,
}) as any

export default function AdminReportPage() {
  const { stats, loadStats } = useContext(EntriesStoreContext)

  useEffect(() => {
    loadStats()
  }, [])

  if (!stats) {
    return (
      <EmptyContainer>
        <Empty />
      </EmptyContainer>
    )
  }

  const hasIncreasedQuantity =
    stats?.entriesWeekComparison?.last7Days > stats?.entriesWeekComparison?.previous7Days

  const entriesPerDayConfig: BarConfig = {
    data: stats.entriesPerDay,
    yField: 'date',
    xField: 'quantity',
    xAxis: {
      alias: 'Quantity',
    },
    autoFit: true,
  }

  return (
    <Container>
      <div className="chart-container centered">
        <Typography.Title level={2}>Food entries added</Typography.Title>
        <Space size="large">
          <Statistic
            title="Last 7 days"
            value={stats?.entriesWeekComparison?.last7Days}
            precision={0}
            valueStyle={{ color: hasIncreasedQuantity ? Color.Success : Color.Error }}
            prefix={hasIncreasedQuantity ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          />
          <Statistic
            title="The week before"
            value={stats?.entriesWeekComparison?.previous7Days}
            precision={0}
          />
        </Space>
      </div>

      <div className="chart-container">
        <Typography.Title level={2}>Food entries added per day</Typography.Title>
        <Bar {...entriesPerDayConfig} />
      </div>
    </Container>
  )
}

// Styles

const EmptyContainer = styled.div`
  margin: auto;
`

const Container = styled.div`
  .chart-container {
    margin-bottom: 2em;

    &.centered {
      text-align: center;
    }
  }
`
