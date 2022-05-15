import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import {
  addUpdateUserRoles,
  getAllPermission,
} from '../../stores/apis/lookup_api'
import Style from '../../styles/empDashLookups.module.scss'

const RolesManagement = (props) => {
  const { Option } = Select
  const [form] = Form.useForm()
  const [buttonSaveText, setButtonSaveText] = useState('Submit')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { addToast } = useToasts()
  const { mutateAsync, isLoading, isSuccess } = useMutation(addUpdateUserRoles)
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const {
    isLoading: loadingRoles,
    error,
    data: permissions,
  } = useQuery('getAllPermission', () => getAllPermission())

  const showModal = () => {
    form.resetFields()
    setButtonSaveText('Submit')
    setIsModalVisible(true)
  }

  useEffect(() => {
    if (props.editMode) {
      const { id, permissions, name } = props.role
      console.log('permissions', props.role)
      form.setFieldsValue({
        ...form.getFieldsValue(),
        name: name,
        permissions: permissions === null ? [] : permissions,
      })
      setIsModalVisible(true)
      setButtonSaveText('Update')
    }
  }, [props.editMode])

  const onFinish = (values) => {
    if (props.editMode) {
      values.id = props.role.id
    }
    mutateAsync(values, {
      onSuccess: async () => {
        setIsModalVisible(false)
        form.resetFields()
        addToast('Saved roles successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        props.handleEditMode()
        queryClient.invalidateQueries('getAllRoles')
      },
    })
  }

  const handleCancel = () => {
    props.handleEditMode()
    setIsModalVisible(false)
    form.resetFields()
  }
  const handleSearch = (event) => {
    props.handleSearch(event.target.value)
  }

  return (
    <div className={Style.lookupsForm}>
      <h3>{props.pageTitle}</h3>
      <div className={Style.search}>
        <input onChange={handleSearch} placeholder={t('type_here')} />
        <Button
          size="large"
          onClick={showModal}
          className={Style.btn}
          icon={<PlusOutlined className={Style.icon} />}
        >
          {' '}
          Add Role
        </Button>
      </div>
      {isModalVisible && (
        <Modal
          title={'Add New Role'}
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item label={'Role Name:'} name="name">
              <Input required placeholder={t('type_here')} />
            </Form.Item>
            <Form.Item
              label={'Permission'}
              rules={[{ required: true }]}
              name="permissions"
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                size="large"
                placeholder="Enter permission"
              >
                {permissions &&
                  permissions.map((permission) => {
                    return (
                      <Option key={Math.random()} value={permission.id}>
                        {permission.name}
                      </Option>
                    )
                  })}
              </Select>
              {/* <div className={Style.postJobTagsOuter}>
                        <PostJobTags />
                    </div> */}
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
              <div className={Style.lookupFormPopupBtns}>
                <Button
                  className={Style.btn}
                  type="normal"
                  onClick={handleCancel}
                >
                  {t('cancel')}
                </Button>
                <Button
                  className={Style.btn}
                  type="primary"
                  loading={isLoading}
                  htmlType="submit"
                >
                  {buttonSaveText}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default RolesManagement
