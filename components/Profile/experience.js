import { LeftOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import FetchSelectCompanies from '../../shared/fetch_select_companies'
import { addExperienceApi } from '../../stores/apis/auth_apis'
import { getCandidatesExperience } from '../../stores/apis/candidates_api'
import { addExperience } from '../../stores/interfaces/profile'
import Profile from '../../styles/profile.module.scss'
import ExperienceAdded from './ExperienceAdded'

const AddExperience = (props) => {
  const { Option } = Select
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const { addToast } = useToasts()
  const { mutateAsync, isLoading, isSuccess } = useMutation(addExperienceApi)
  const { t } = useTranslation()

  const experienceInt = addExperience()
  const [comp, setComp] = useState()
  const [currentlyWorkign, setCurrentlyWorking] = useState(false)
  const { data } = useQuery('getCandidatesExperience', () =>
    getCandidatesExperience(props.candiID ? props.candiID : sessionStorage.getItem('jobhop_loggedin_candidate_id')),
  )
  // if (props.editMode) {
  //   form.setFieldsValue({
  //     ...form.getFieldsValue(),
  //     designation: props.record_to_edit.designation,
  //     companyName: props.record_to_edit.lkpCompanyID,
  //     employmentType: props.record_to_edit.employmentType,
  //     location: props.record_to_edit.location,
  //     lkpCompanyID: props.record_to_edit.lkpCompanyID,
  //     isCurrntlyWorking: props.record_to_edit.isCurrntlyWorking,
  //     description: props.record_to_edit.description,
  //     startDate: moment(props.record_to_edit.startDate),
  //     endDate: moment(props.record_to_edit.endDate),
  //   });
  //   setCurrentlyWorking(props.record_to_edit.isCurrntlyWorking ? true : false);
  // }
  useEffect(() => {
    if (props.editMode) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        designation: props.record_to_edit.designation,
        companyName: props.record_to_edit.lkpCompanyID,
        employmentType: props.record_to_edit.employmentType,
        location: props.record_to_edit.location,
        lkpCompanyID: props.record_to_edit.lkpCompanyID,
        isCurrntlyWorking: props.record_to_edit.isCurrntlyWorking,
        description: props.record_to_edit.description,
        startDate: moment(props.record_to_edit.startDate),
        endDate: moment(props.record_to_edit.endDate),
      })
      setCurrentlyWorking(props.record_to_edit.isCurrntlyWorking ? true : false)
    } else {
      form.resetFields()
      setCurrentlyWorking(false)
    }
  }, [props])

  const onExperienceSubmit = (values) => {
    if (values.startDate > values.endDate) {
      addToast('Start Date cannot be greater than End Date', {
        appearance: 'error',
        autoDismiss: true,
      })
      return false
    }
    values = { ...experienceInt, ...values }
    if (props.editMode) {
      values.candidatesEmplopymentDetailID = props.record_to_edit.candidatesEmplopymentDetailID
    }
    // if (props.type !== "inDashboard") {
    //   values.lkpCompanyID = comp;
    //   values.isCurrntlyWorking = currentlyWorkign;
    // }
    // if (currentlyWorkign || !values.endDate) {
    //   values.endDate = new Date();
    // }
    values = {
      ...values,
      startDate: new Date(values['startDate']),
      endDate: new Date(values['endDate']),
      employmentType: values['employmentType'] ? values['employmentType'] : 0,
      location: values['location'] ? values['location'] : '',
      description: values['description'] ? values['description'] : '',
    }
    // values.lkpCompanyID = comp;
    // values.isCurrntlyWorking = currentlyWorkign;
    values.isExperienceAdded = true
    values.FK_UserId = parseInt(sessionStorage.getItem('jobhop_loggedin_user_id'))
    mutateAsync(values, {
      onSuccess: async () => {
        addToast('Information added successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        sessionStorage.setItem('isExperienceAdded', true)
        if (props.isSuccessUpdated) props.isSuccessUpdated(3, 'finish')
        form.resetFields()
        // setCurrentlyWorking(false);
        if (props.closeModal) props.closeModal()
        queryClient.invalidateQueries('getCandidatesExperience')
        // props.onSuccessAction();
      },
    })
  }

  const onCompanySelect = (cmp) => {
    // setComp(cmp.value);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      lkpCompanyID: cmp,
    })
  }

  const disableEndDate = () => {
    setCurrentlyWorking(!currentlyWorkign)
    if (currentlyWorkign) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        endDate: '',
      })
    } else {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        endDate: moment(new Date()),
      })
    }
  }
  const handleNext = () => {
    props.onSuccessAction()
    if (data?.length === 0) {
      if (props.isSuccessUpdated) props.isSuccessUpdated(3, 'error')
    }
  }

  return (
    <div className={Profile.BiggerForms} style={props.type === 'inDashboard' ? { width: 'auto', marginTop: '0' } : {}}>
      {props.type != 'inDashboard' && <p className="title_size_text mt-3">Add your experience details</p>}

      <Form
        name="basic"
        layout="vertical"
        onFinish={onExperienceSubmit}
        onFinishFailed={() => {}}
        autoComplete="off"
        form={form}
      >
        <Row gutter={30}>
          <Col span={12}>
            <Form.Item label={t('Title')} name="designation" rules={[{ required: true }]} hasFeedback>
              <Input size="large" placeholder="E.g. Design Manager" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Employment Type" name="employmentType">
              <Select placeholder="E.g. Full time" size="large">
                <Option value={0}>{t('Full_time')}</Option>
                <Option value={1}>{t('Part_time')}</Option>
                <Option value={2}>{t('Remote')}</Option>
                <Option value={3}>{t('Contract')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col span={12}>
            <Form.Item label={t('Company')} name="lkpCompanyID" rules={[{ required: true }]} hasFeedback>
              {/* <FetchSelectCompanies typeID={1} onOptionSelect={onCompanySelect} /> */}

              <FetchSelectCompanies
                typeID={1}
                onOptionSelect={onCompanySelect}
                selectedValue={props.editMode && props.record_to_edit.companyName}
              />
              {/* <Input size="large" placeholder="E.g. Salesforce" /> */}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="location" label={t('Location')}>
              <Input size="large" placeholder="E.g. Barlin, Germany" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Form.Item name="isCurrntlyWorking" valuePropName="checked" onChange={disableEndDate}>
            <Checkbox>I am currently working here</Checkbox>
          </Form.Item>
        </Row>

        <Row gutter={30}>
          <Col span={12}>
            <Form.Item
              name="startDate"
              label={t('Start Date')}
              rules={[
                {
                  required: true,
                  message: 'Please select start date',
                },
              ]}
              hasFeedback
            >
              <DatePicker
                style={{ width: '100%' }}
                size="large"
                picker="month"
                disabledDate={(current) => {
                  return moment().add(-1, 'days') < current
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="endDate"
              label={t('End Date')}
              dependencies={['startDate']}
              rules={[
                {
                  required: true,
                  message: 'Please select end date',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('startDate') < value) {
                      return Promise.resolve()
                    } else if (currentlyWorkign) {
                      return Promise.resolve()
                    }
                    return Promise.reject('start date must be greater than end date')
                  },
                }),
              ]}
              hasFeedback
            >
              <DatePicker
                disabled={currentlyWorkign}
                picker="month"
                size="large"
                style={{ width: '100%' }}
                placeholder="select and date"
                disabledDate={(current) => {
                  return moment().add(-1, 'days') < current
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col span={24}>
            <Form.Item name="description" label={t('Description')}>
              <Input.TextArea placeholder="Details about this experience" />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" loading={isLoading} htmlType="submit" style={{ marginBottom: '15px' }}>
          {props.editMode ? 'Edit ' : 'Add '}Experience
        </Button>

        <Form.Item>
          {props.type != 'inDashboard' && <ExperienceAdded type="inProcessProfile" />}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {props.type != 'inDashboard' && (
              <div className="skip_back_options" style={{ paddingTop: '10px' }}>
                <span onClick={() => props.stepBack()}>
                  <LeftOutlined /> Back
                </span>
              </div>
            )}
            <div>
              {/* {props.type != "inDashboard" && (
                  <span onClick={() => props.onSuccessAction()} style={{ color: "#BFBFBF", paddingRight: "20px" }}>
                    Skip this step
                  </span>
              )} */}
              {props.type != 'inDashboard' && (
                <Button type="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddExperience
