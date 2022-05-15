import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { PostLookupValue } from '../../stores/apis/lookup_api'
import lookupInterface from '../../stores/interfaces/lookup'
import Style from '../../styles/empDashLookups.module.scss'

const LookupsForm = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const { addToast } = useToasts()
  const { mutateAsync, isLoading, isSuccess } = useMutation(PostLookupValue)

  useEffect(() => {
    if (props.editMode) {
      const { lookUpValue, lookUpValueCode, lookUpValue_Ar } = props.editData
      form.setFieldsValue({
        ...form.getFieldsValue(),
        lookUpValue: lookUpValue,
        lookUpValueCode: lookUpValueCode,
        lookUpValue_Ar: lookUpValue_Ar,
      })
      setIsModalVisible(true)
    }
  }, [props.editMode])

  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true)
    props.handleEditMode()
  }

  const onSubmitFormLkt = (values) => {
    const interf = lookupInterface()
    values = { ...values, ...interf }
    values.fK_LookUpId = props.formLookupId
    if (props.editMode) {
      values.lookUpValueId = props.editData.lookUpValueId
    }

    mutateAsync(values, {
      onSuccess: async () => {
        setIsModalVisible(false)
        addToast('Lookup table saved successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        props.handleEditMode()
        queryClient.invalidateQueries('getLookups')
      },
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    props.handleEditMode()
    form.resetFields()
  }
  const handleSearch = (event) => {
    props.handleSearch(event.target.value)
  }
  return (
    <div className={Style.lookupsForm}>
      <h3>{props.pageTitle}</h3>
      <div className={Style.search}>
        <input onChange={handleSearch} placeholder="Type Here" />
        <Button
          size="large"
          onClick={showModal}
          className={Style.btn}
          icon={<PlusOutlined className={Style.icon} />}
        >
          {props.btnText}
        </Button>
      </div>
      {isModalVisible && (
        <Modal
          title="Add New Category"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form layout="vertical" onFinish={onSubmitFormLkt} form={form}>
            <Form.Item label="Category Name:" name="lookUpValue">
              <Input required placeholder="Enter Text Here" />
            </Form.Item>
            <Form.Item label="Category Arabic:" name="lookUpValue_Ar">
              <Input required placeholder="Enter Text Here" />
            </Form.Item>
            <Form.Item label="Category Code:" name="lookUpValueCode">
              <Input required placeholder="Enter Text Here" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
              <div className={Style.lookupFormPopupBtns}>
                <Button
                  className={Style.btn}
                  type="normal"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className={Style.btn}
                  type="primary"
                  loading={isLoading}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default LookupsForm
