import { UploadOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Space, Upload } from 'antd'
import moment from 'moment'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { SettingsStoreContext } from '../../frontend/src/modules/settings/settings.store'

interface Props {
  isLoading: boolean
  values?: Record<string, any>
  submitTitle: string

  onSubmit(params: any): void
}

export function EntryForm(props: Props) {
  const { t } = useTranslation()

  const { jwt } = useContext(SettingsStoreContext)

  const [form] = Form.useForm<any>()

  useEffect(() => {
    form.resetFields()
    if (props.values) {
      form.setFieldsValue({
        ...props.values,
        date: moment(props.values?.addedAt) ?? moment(),
      })
    }
  }, [props.values])

  return (
    <Container
      className="form"
      colon={false}
      form={form}
      layout="horizontal"
      name="addEntry"
      size="large"
      labelCol={{ span: 8 }}
      onFinish={props.onSubmit}>
      <Space direction="vertical">
        <Form.Item
          name="date"
          label={t('diary.form.date')}
          rules={[{ required: true, message: t('diary.errors.date') }]}>
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            allowClear={false}
            disabledDate={(date) => date.isAfter(moment())}
          />
        </Form.Item>

        <Form.Item
          label={t('diary.form.title')}
          name="title"
          rules={[{ required: true, message: t('diary.errors.title') }]}>
          <Input placeholder={t('diary.form.titlePlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('diary.form.description')}
          name="description"
          rules={[{ required: true, message: t('diary.errors.description') }]}>
          <Input.TextArea
            placeholder={t('diary.form.descriptionPlaceholder')}
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </Form.Item>

        <Form.Item
          name="image"
          label={t('diary.form.image')}
          getValueFromEvent={(ev) => {
            if (!ev?.file) {
              return []
            }

            const file = ev.file
            if (file.response) {
              file.url = `http://office:3011/api/v1/media/${file.response}`
            }

            return [file]
          }}
          getValueProps={(value) => {
            if (Array.isArray(value)) {
              return { fileList: value }
            }

            if (typeof value === 'string') {
              return {
                fileList: [
                  {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: value,
                  },
                ],
              }
            }

            return { fileList: [] }
          }}
          valuePropName="fileList">
          <Upload
            name="file"
            listType="picture-card"
            multiple={false}
            maxCount={1}
            type="select"
            action="http://office:3011/api/v1/media"
            headers={{
              Authorization: `bearer ${jwt}`,
            }}>
            <UploadOutlined />
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12 }}>
          <Button block type="primary" htmlType="submit" disabled={props.isLoading}>
            {props.submitTitle}
          </Button>
        </Form.Item>
      </Space>
    </Container>
  )
}

// Styles

const Container = styled(Form)``
