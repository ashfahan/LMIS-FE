import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { newPassword } from '../stores/apis/auth_apis'
import styles from '../styles/auth.module.scss'

export default function NewPassword() {
  const { mutateAsync, isLoading, isSuccess } = useMutation(newPassword)
  const [showValidationError, setShowValidationError] = useState(false)
  const { addToast } = useToasts()
  const router = useRouter()
  const { redist } = router.query
  const resetPassword = (values) => {
    let _token = redist.replace(/ /g, '+')
    values.resetToken = _token
    if (values.confirmPassword !== values.password) {
      setShowValidationError(true)
      return
    }
    setShowValidationError(false)
    mutateAsync(values, {
      onSuccess: async (response) => {
        addToast('Password reset successfully. Please Login', {
          appearance: 'success',
          autoDismiss: true,
        })
      },
      onError: async (error) => {
        addToast('Email not found', {
          appearance: 'error',
          autoDismiss: true,
        })
      },
    })
  }

  return (
    <>
      <main>
        <div style={{ width: '30%', margin: 'auto', marginTop: '100px' }}>
          {showValidationError && (
            <p style={{ color: 'red' }}>
              Password and confirm password does not match.
            </p>
          )}
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={resetPassword}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item label="New Password">
              <Form.Item
                label="Password"
                noStyle
                name="password"
                validateTrigger="onSubmit"
                rules={[
                  { required: true, message: 'Password is required', min: 8 },
                ]}
              >
                <Input.Password size="large" placeholder="••••••••" />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Confirm Password">
              <Form.Item
                label="Confirm Password"
                noStyle
                name="confirmPassword"
                validateTrigger="onSubmit"
                rules={[
                  { required: true, message: 'Password is required', min: 8 },
                ]}
              >
                <Input.Password size="large" placeholder="••••••••" />
              </Form.Item>
            </Form.Item>

            <Form.Item className={styles.frm_footer}>
              <Button
                type="primary"
                block
                loading={isLoading}
                htmlType="submit"
              >
                Submit
              </Button>
              {/* <span className={styles.back_step}><LeftOutlined /> Back</span> */}
            </Form.Item>
          </Form>
        </div>
      </main>
    </>
  )
}
