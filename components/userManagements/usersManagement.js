import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import FetchSelectRole from '../../shared/fetch_select_role'
import FetchSelectUser from '../../shared/fetch_select_user'
import { assignRole } from '../../stores/apis/lookup_api'
import Style from '../../styles/empDashLookups.module.scss'
import SignupFields from '../Auth/steps/signupFields'

const UsersManagement = (props) => {
  const { Option } = Select
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [buttonSaveText, setButtonSaveText] = useState('Save')
  const [assignRoleModal, setAssginRoleModal] = useState(false)
  const { addToast } = useToasts()
  const { mutateAsync, isLoading, isSuccess } = useMutation(assignRole)
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  useEffect(() => {
    if (props.editMode) {
      const { userId, userName, roleId } = props.assignRole
      form.setFieldsValue({
        ...form.getFieldsValue(),
        userId: userId,
        roleId: roleId,
      })
      setAssginRoleModal(true)
      setButtonSaveText('Update')
    }
  }, [props.editMode])

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleAssignRoleModal = (value) => {
    setAssginRoleModal(value)
    props.handleEditMode()
    form.resetFields()
    setButtonSaveText('Submit')
  }
  const selectUser = (value) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      userId: value,
    })
  }
  const selectRole = (value) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      roleId: value,
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleSearch = (event) => {
    props.handleSearch(event.target.value)
  }
  const onFinish = (values) => {
    mutateAsync(values, {
      onSuccess: async () => {
        setAssginRoleModal(false)
        addToast('Assign role successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        props.handleEditMode()
        queryClient.invalidateQueries('getAssignRole')
      },
    })
  }
  return (
    <div className={Style.lookupsForm}>
      <h3>{props.pageTitle}</h3>
      <div className={Style.search}>
        <input onChange={handleSearch} placeholder={t('type_here')} />
        <div>
          <Button
            size="large"
            onClick={() => {
              handleAssignRoleModal(true)
            }}
            style={{ marginRight: '5px' }}
            className={Style.btn}
            icon={<PlusOutlined className={Style.icon} />}
          >
            {' '}
            Assign Role
          </Button>
          <Button
            size="large"
            onClick={showModal}
            className={Style.btn}
            icon={<PlusOutlined className={Style.icon} />}
          >
            {' '}
            Add User
          </Button>
        </div>
      </div>
      {isModalVisible && (
        <Modal
          title={'Add New User'}
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          bodyStyle={{ paddingTop: 0 }}
        >
          <SignupFields
            userType={0}
            closeModal={() => setIsModalVisible(false)}
            isModalVisible={isModalVisible}
          />
        </Modal>
      )}
      {assignRoleModal && (
        <Modal
          title={'Assign Role'}
          visible={assignRoleModal}
          footer={null}
          onCancel={() => handleAssignRoleModal(false)}
        >
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item
              label={'Select User'}
              rules={[{ required: true }]}
              name="userId"
            >
              <FetchSelectUser
                onOptionSelect={selectUser}
                defaultValue={
                  props.editMode
                    ? props.assignRole && props.assignRole.userName
                    : null
                }
              />
            </Form.Item>
            <Form.Item
              label={'Select Role'}
              rules={[{ required: true }]}
              name="roleId"
            >
              <FetchSelectRole
                onOptionSelect={selectRole}
                defaultValue={
                  props.editMode
                    ? props.assignRole && props.assignRole.role
                    : null
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                block
                loading={isLoading}
                htmlType="submit"
              >
                {buttonSaveText}
              </Button>
              {/* <span className={styles.back_step}><LeftOutlined /> Back</span> */}
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default UsersManagement
