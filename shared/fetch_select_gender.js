import { Form, Select, Spin } from 'antd'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'

async function fetchUserList(username, typeID) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/LKP/GetAllLookUpValues_ByFK_LookUpId?FK_LookUpId=${typeID}`)
    .then((response) => response.json())
    .then((body) =>
      body.map((user) => ({
        label: user.lookUpValue,
        languages: { en: user.lookUpValue, ar: user.lookUpValue_Ar },
        value: user.lookUpValue,
      })),
    )
}

export const Dropdown = (props) => {
  const {
    fetchOptions,
    debounceTimeout = 800,
    selectedVal,
    value,
    i18n: { language },
    defaultValue,
    i18n,
    ...rest
  } = props
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const { Option } = Select
  const [form] = Form.useForm()

  if (selectedVal) form.setFieldsValue({ loookup: selectedVal })

  useEffect(() => {
    setOptions([])
    setFetching(true)
    fetchOptions(value).then((newOptions) => {
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
      <Form.Item name="loookup" noStyle>
        <Select
          size="large"
          showSearch
          className="fontSm"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          {...rest}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          defaultValue={defaultValue}
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

const FetchSelectGender = ({ typeID, onOptionSelect, selectedValue, defaultValue }) => {
  const [value, setValue] = useState([])

  const onSelectOption = (newValue) => {
    setValue(newValue)
    onOptionSelect(newValue)
  }

  return (
    <DebounceSelect
      value={value}
      showSearch
      //placeholder={t("select_an_option")}
      fetchOptions={() => fetchUserList(value, typeID)}
      onChange={onSelectOption}
      defaultValue={defaultValue}
      selectedVal={selectedValue}
      style={{
        width: '100%',
      }}
    />
  )
}

export default FetchSelectGender
