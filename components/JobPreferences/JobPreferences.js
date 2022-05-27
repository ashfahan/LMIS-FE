import { LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Slider, Spin, Switch } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilValue } from 'recoil'
import { FetchSelectLookup } from '../../shared/fetch_select_lookup'
import { getSingleJobPreferences } from '../../stores/apis/candidates_api'
import { SavePreferences } from '../../stores/apis/jobs_api'
import { language } from '../../stores/atoms/app_config_atom'
import { saveJobPreferences } from '../../stores/interfaces/profile'
import Profile from '../../styles/profile.module.scss'

const JobPreferencesSub = (props) => {
  const [minRange, setMinRange] = useState(1)
  const [maxRange, setMaxRange] = useState(20)
  const lan = useRecoilValue(language)
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { addToast } = useToasts()
  const { mutateAsync, isLoading, isSuccess } = useMutation(SavePreferences)
  const router = useRouter()

  const { data, isLoading: preferenceLoading } = useQuery(
    'GetSingleJobPreferences',
    () => getSingleJobPreferences(sessionStorage.getItem('jobhop_loggedin_candidate_id')),
    {
      onSuccess: async (response) => {
        if (response.length > 0) {
          response = response.reverse()
          form.setFieldsValue({
            ...form.getFieldsValue(),
            lkp_JobTitleID: response && response.length > 0 && response[0]?.lkp_JobTitleID,

            lkp_Location: response && response.length > 0 && response[0]?.lkp_Location,

            // gender: response && response.length >=1 && response[0].gender,
            // about: response && response.length >=1 && response[0].about,
          })
          setMinRange(response[0]?.expectedSalary ? response[0]?.expectedSalary / 1000 : 0)
          setMaxRange(response[0]?.expectedSalaryMax ? response[0]?.expectedSalaryMax / 1000 : 20)
        }
      },
    },
  )

  const pref = saveJobPreferences()

  const onSliderChange = (val) => {
    setMinRange(val[0])
    setMaxRange(val[1])
  }

  const onPrefSave = (values) => {
    values = { ...pref, ...values }
    values.expectedSalary = minRange * 1000
    values.expectedSalaryMax = maxRange * 1000
    if (props.editMode) {
      values.jobPrefrancesID = data[data.length - 1]?.jobPrefrancesID
    }
    mutateAsync(values, {
      onSuccess: async (response) => {
        addToast('Information Added Successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        // typeof window !== "undefined" && sessionStorage.setItem("jobhop_loggedin_user_id", response);
        !props.editMode && router.push('/dashboard')
      },
      onError: async (error) => {
        addToast('An Error Occured', {
          appearance: 'error',
          autoDismiss: true,
        })
      },
    })
  }

  const onTitleSelect = (val) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      lkp_JobTitleID: val,
    })
  }

  const citySelected = (val) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      lkp_Location: val,
    })
  }

  return (
    <div className={Profile.authWrapper} style={props.editMode ? { margin: 0 } : {}}>
      {!props.editMode && <p className="title_size_text mt-3">{t('pref_top_heading')}</p>}

      {preferenceLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
          }}
        >
          <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <Form
          layout="vertical"
          form={form}
          // initialValues={{ remember: true }}
          onFinish={onPrefSave}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item label={t('pref_label_1')} name="lkp_JobTitleID" rules={[{ required: true }]}>
            <FetchSelectLookup
              typeID={16}
              onOptionSelect={onTitleSelect}
              defaultValue={data && data[data.length - 1]?.jobtitleNameEn}
            />
            {/* <Input placeholder="E.g. Design Manager" size="large"/> */}
          </Form.Item>
          <Form.Item name="lkp_Location" label={t('pref_label_2')} rules={[{ required: true }]}>
            <FetchSelectLookup
              typeID={3}
              onOptionSelect={citySelected}
              defaultValue={data && data[data.length - 1]?.locationName}
            />
          </Form.Item>

          <Form.Item name="expectedSalary" label={`${t('pref_label_3')} (LYD)`}>
            <span className={Profile.salaryRange}>
              {minRange}K - {maxRange}K
            </span>
            <Slider
              tooltipVisible={false}
              range={{ draggableTrack: true }}
              onChange={onSliderChange}
              defaultValue={[minRange, maxRange]}
            />
          </Form.Item>

          <Form.Item name="remote" style={{ marginBottom: '30px' }}>
            <Switch size="small" /> &nbsp;{t('perf_salary_range')}
          </Form.Item>

          <Button loading={isLoading} type="primary" block htmlType="submit">
            {props.editMode ? t('pref_button_2') : t('pref_button_1')}
          </Button>
        </Form>
      )}
    </div>
  )
}

export default JobPreferencesSub
