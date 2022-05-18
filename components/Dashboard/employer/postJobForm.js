import { Button, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import FetchSelectCompanies from '../../../shared/fetch_select_companies'
import FetchSelectGender from '../../../shared/fetch_select_gender'
import { FetchSelectLookup } from '../../../shared/fetch_select_lookup'
import { getLookups } from '../../../stores/apis/lookup_api'
// import PostJobTags from './postJobTags';
import Style from '../../../styles/postJob.module.scss'
import PostJobEditor from './postJobEditor'

const PostJobForm = ({ onJobPostedHit, onFormLoading, jobObjToEdit, onEditorChange, editJobEditor }) => {
  const { Option } = Select
  const [saveButtonText, setSaveButtonText] = useState('Save as Draft')
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const onFinish = (values) => {
    onJobPostedHit(values)
  }

  const [language, setLanguage] = useState('en')
  let appLanguage = typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])

  useEffect(() => {
    if (jobObjToEdit) {
      setSaveButtonText('Update')
      form.setFieldsValue({
        ...form.getFieldsValue(),
        designation: jobObjToEdit.designation,
        lkpJobTitleID: jobObjToEdit.lkpJobTitleID,
        experience: jobObjToEdit.experience,
        fK_CompanyorDeptID: jobObjToEdit.fK_CompanyorDeptID,
        jobType: jobObjToEdit.jobType,
        city: jobObjToEdit.city,
        industry: jobObjToEdit.industry,
        salary: jobObjToEdit.salary,
        noOfVacancy: jobObjToEdit.noOfVacancy,
        skillsRequired: jobObjToEdit.skillsRequired ? jobObjToEdit.skillsRequired.split(',').map((x) => +x) : null,
        lateDatetoApply: moment(jobObjToEdit.lateDatetoApply),
        experiance: jobObjToEdit.experiance,
        Gender: jobObjToEdit.gender,
      })
    }
  }, [jobObjToEdit])

  const { isLoading, error, data: jobCategories } = useQuery('getAllLookups', () => getLookups(12))

  const onFinishFailed = () => {
    console.log('an Error occured')
  }

  const onCompanySelect = (cmp) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      fK_CompanyorDeptID: cmp,
    })
  }
  const onEmployementTypeSelect = (value) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      jobType: value,
    })
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  const onTitleSelect = (val) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      lkpJobTitleID: val,
    })
  }

  const onExperienceSelect = (val) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      experiance: val,
    })
  }

  const onGenderSelect = (val) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      Gender: val,
    })
  }

  const onCitySelect = (val) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      city: val,
    })
  }
  const onIndustrySelect = (val) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      industry: val,
    })
  }
  return (
    <div className={Style.postJobForm}>
      <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} autoComplete="off">
        <Form.Item label={t('job_title')} name="lkpJobTitleID" rules={[{ required: true }]}>
          <FetchSelectLookup
            typeID={16}
            onOptionSelect={onTitleSelect}
            defaultValue={jobObjToEdit && jobObjToEdit.lookUpValue}
          />
          {/* <Input placeholder="E.g. Design Manager" size="large"/> */}
        </Form.Item>
        <Form.Item label={t('company')} rules={[{ required: true }]} name="fK_CompanyorDeptID">
          <FetchSelectCompanies
            typeID={1}
            onOptionSelect={onCompanySelect}
            defaultValue={jobObjToEdit && jobObjToEdit.companyName}
          />
        </Form.Item>
        <Form.Item label={t('employment_type')} rules={[{ required: true }]} name="jobType">
          <Select
            //placeholder={t("select_an_option")}
            size="large"
            defaultValue={jobObjToEdit && jobObjToEdit.jobType}
          >
            <Select.Option value="full-time">{t('Full_time')}</Select.Option>
            <Select.Option value="part-time">{t('Part_time')}</Select.Option>
            <Select.Option value="contract">{t('Remote')}</Select.Option>
            <Select.Option value="remote">{t('Contract')}</Select.Option>
          </Select>
          {/* <FetchSelectEmploymentType
            typeID={19}
            onOptionSelect={onEmployementTypeSelect}
            defaultValue={jobObjToEdit && jobObjToEdit.jobType}
          /> */}
        </Form.Item>
        <Form.Item label={t('no_of_vacancies')} rules={[{ required: true }]} name="noOfVacancy">
          <Input placeholder={t('no_of_vacancies')} type="number" size="large" />
        </Form.Item>
        <Form.Item label={t('salary')} rules={[{ required: true }]} name="salary">
          <Input placeholder="E.g. 300" type="number" addonAfter="LYD" size="large" />
        </Form.Item>
        <Form.Item label={t('Job_Experience')} rules={[{ required: true }]} name="experiance">
          <FetchSelectLookup
            typeID={8}
            onOptionSelect={onExperienceSelect}
            defaultValue={jobObjToEdit && jobObjToEdit.experianceTitle}
          />
        </Form.Item>
        <Form.Item label={t('gender')} rules={[{ required: true }]} name="Gender">
          <FetchSelectGender
            typeID={11}
            onOptionSelect={onGenderSelect}
            defaultValue={jobObjToEdit && jobObjToEdit.gender}
          />
        </Form.Item>
        <Form.Item label={t('city')} rules={[{ required: true }]} name="city">
          <FetchSelectLookup
            typeID={3}
            onOptionSelect={onCitySelect}
            defaultValue={jobObjToEdit && jobObjToEdit.cityName}
          />
        </Form.Item>
        <Form.Item label={t('industry')} rules={[{ required: true }]} name="industry">
          <FetchSelectLookup
            typeID={18}
            onOptionSelect={onIndustrySelect}
            defaultValue={jobObjToEdit && jobObjToEdit.industryTitle}
          />
        </Form.Item>
        <Form.Item label={t('job_category')} rules={[{ required: true }]} name="skillsRequired">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            size="large"
            placeholder={t('Enter Jobs Category, seperated with comma')}
          >
            {jobCategories &&
              jobCategories.map((cetegory) => {
                return (
                  <Option key={Math.random()} value={cetegory.lookUpValueId}>
                    {language === 'en' ? cetegory.lookUpValue : cetegory.lookUpValue_Ar}
                  </Option>
                )
              })}
          </Select>
          {/* <div className={Style.postJobTagsOuter}>
                        <PostJobTags />
                    </div> */}
        </Form.Item>
        <Form.Item label={t('closing_date')} rules={[{ required: true }]} name="lateDatetoApply">
          <DatePicker
            disabledDate={disabledDate}
            size="large"
            placeholder="E.g. 20-03-2021"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <div className={Style.postJobEditorMobile}>
          <PostJobEditor onEditorChange={onEditorChange} editJobEditor={editJobEditor} />
        </div>

        <div className={Style.publishBtn}>
          <Button className={Style.btn} type="primary" block htmlType="submit" loading={onFormLoading}>
            {saveButtonText}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default PostJobForm
