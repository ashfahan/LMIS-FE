import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { permissionsEnum } from '../../shared/permissionsEnum'
import { PostCompanyValue } from '../../stores/apis/lookup_api'
import lookupCompanyInterface from '../../stores/interfaces/company'
import Style from '../../styles/empDashLookups.module.scss'

const LookupsCompanyForm = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { addToast } = useToasts()
  const [form] = Form.useForm()
  const [isAddCategory, setIsAddCategory] = useState(true)
  const { mutateAsync, isLoading, isSuccess } = useMutation(PostCompanyValue)
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  useEffect(() => {
    let _permissions = JSON.parse(sessionStorage.getItem('permissions')) || []
    setIsAddCategory(
      _permissions.some((item) => item === permissionsEnum.addCandidate),
    )
  }, [])

  useEffect(() => {
    if (props.editMode) {
      const { companyName, companyName_Ar, companyShortName } = props.company
      form.setFieldsValue({
        ...form.getFieldsValue(),
        companyName: companyName,
        companyName_Ar: companyName_Ar,
        companyShortName: companyShortName,
      })
      setIsModalVisible(true)
    }
  }, [props.editMode])

  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true)
    props.handleEditMode()
  }

  const onSubmitCompany = (values) => {
    const interfc = lookupCompanyInterface()
    values = { ...interfc, ...values }
    if (props.editMode) {
      values.companyId = props.company.companyId
    }
    mutateAsync(values, {
      onSuccess: async () => {
        setIsModalVisible(false)
        addToast('Company Saved successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        props.handleEditMode()
        queryClient.invalidateQueries('getAllCompanies')
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
        <input onChange={handleSearch} placeholder={t('type_here')} />
        {isAddCategory && (
          <Button
            size="large"
            onClick={showModal}
            className={Style.btn}
            icon={<PlusOutlined className={Style.icon} />}
          >
            {' '}
            {t('add_company')}
          </Button>
        )}
      </div>
      {isModalVisible && (
        <Modal
          title={t('add_new_company')}
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form layout="vertical" form={form} onFinish={onSubmitCompany}>
            <Form.Item label={t('company_name') + ':'} name="companyName">
              <Input required placeholder={t('type_here')} />
            </Form.Item>
            <Form.Item
              label={t('company_name_arabic') + ':'}
              name="companyName_Ar"
            >
              <Input required placeholder={t('type_here')} />
            </Form.Item>
            <Form.Item label={t('short_name') + ':'} name="companyShortName">
              <Input required placeholder={t('type_here')} />
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
                  {props.editMode ? 'Update' : t('submit')}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default LookupsCompanyForm
