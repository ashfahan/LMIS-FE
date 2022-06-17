import { Form, Select, Spin } from 'antd'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'

function Dropdown({ fetchOptions, i18n: { language }, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [form] = Form.useForm()

  if (props.selectedVal) form.setFieldsValue({ company_name_lkp: props.selectedVal })

  useEffect(() => {
    setOptions([])
    setFetching(true)
    fetchOptions(props.value).then((newOptions) => {
      setOptions(newOptions)
      setFetching(false)
    })
  }, [])

  useEffect(() => {
    const newValue = options.map((option) => ({ ...option, label: option.languages?.[language] ?? option.label }))
    if (!isEqual(options, newValue)) setOptions(newValue)
  }, [language, options])

  return (
    <Form name="basic" layout="vertical" form={form} onFinish={() => {}} onFinishFailed={() => {}} autoComplete="off">
      <Form.Item name="company_name_lkp" noStyle>
        <Select
          //filterOption={false}
          size="large"
          showSearch
          className="fontSm"
          // onSearch={debounceFetcher}
          // onClick={debounceFetcher}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          {...props}
          // options={options}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          defaultValue={props.defaultValue}
        >
          {options &&
            options.map((option) => {
              return (
                <Option key={Math.random} value={option.value}>
                  {option.label}
                </Option>
              )
            })}
        </Select>
      </Form.Item>
    </Form>
  )
}

const DebounceSelect = withTranslation()(Dropdown)

async function fetchUserList() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/Common/GetAllCompany`, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}` },
  })
    .then((response) => response.json())
    .then((body) =>
      body.map((user) => ({
        label: user.companyName,
        languages: {
          en: user.companyName,
          ar: user.companyName_Ar,
        },
        value: user.companyId,
      })),
    )
}

const FetchSelectCompanies = ({ typeID, onOptionSelect, selectedValue, defaultValue }) => {
  const [value, setValue] = useState([])

  const onSelectOption = (newValue) => {
    setValue(newValue)
    onOptionSelect(newValue)
  }

  return (
    <DebounceSelect
      value={value}
      showSearch
      // placeholder={t("select_an_option")}
      fetchOptions={() => fetchUserList(value, typeID)}
      onChange={onSelectOption}
      selectedVal={selectedValue}
      defaultValue={defaultValue}
      style={{
        width: '100%',
      }}
    />
  )
}

export default FetchSelectCompanies
