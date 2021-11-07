import { Button, Form, Input, notification, Space, Typography } from 'antd'
import { AuthStoreContext } from 'frontend/modules/auth/auth.store'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export default function AuthLoginPage() {
  const { t } = useTranslation()

  const { login } = useContext(AuthStoreContext)

  async function onSubmit({ username, password }) {
    const result = await login(username, password)
    if (!result) {
      notification.error({
        message: 'Invalid credentials',
      })
    }
  }

  return (
    <Wrapper id="AuthLoginPage">
      <div className="container">
        <img className="banner" alt="Banner" src="/images/banner.png" />
        <div className="form-container">
          <Typography.Title className="title" level={2}>
            {t('auth.login.title')}
          </Typography.Title>
          <Form
            className="form"
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ username: 'admin', password: 'password' }}
            onFinish={onSubmit}
            size="large">
            <Space direction="vertical">
              <Form.Item
                label={t('auth.login.username')}
                name="username"
                rules={[{ required: true, message: t('auth.login.errors.username') }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label={t('auth.login.password')}
                name="password"
                rules={[{ required: true, message: t('auth.login.errors.password') }]}>
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 15 }}>
                <Button type="primary" htmlType="submit">
                  {t('auth.login.submit')}
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;

  .container {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);

    .form {
      padding: 2em;
    }

    .title {
      text-align: center;
      padding-top: 40px;
    }
  }

  .banner {
    width: 550px;
    height: 100%;
  }
`
