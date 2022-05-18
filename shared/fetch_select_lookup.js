import { Form, Select } from 'antd'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'

function Dropdown({ fetchOptions, debounceTimeout = 800, bordered = true, i18n: { language }, ...props }) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const { Option } = Select
  const [form] = Form.useForm()

  if (props.selectedVal) form.setFieldsValue({ loookup: props.selectedVal })

  useEffect(() => {
    setOptions([])
    setFetching(true)
    fetchOptions(props.value).then((newOptions) => {
      console.log(newOptions)
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
          bordered={bordered}
          size="large"
          showSearch
          className="fontSm"
          loading={fetching}
          {...props}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          defaultValue={props.defaultValue}
        >
          {options?.map((option) => (
            <Option key={Math.random} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

const DebounceSelect = withTranslation()(Dropdown)

async function fetchUserList(username, typeID) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/LKP/GetAllLookUpValues_ByFK_LookUpId?FK_LookUpId=${typeID}`)
    .then((response) => response.json())
    .then((body) =>
      body.map((user) => ({
        label: user.lookUpValue,
        languages: {
          en: user.lookUpValue,
          ar: user.lookUpValue_Ar,
        },
        value: user.lookUpValueId,
      })),
    )
}

const FetchSelectLookup = ({ typeID, onOptionSelect, selectedValue, defaultValue, bordered }) => {
  const [value, setValue] = useState([])

  const onSelectOption = (newValue) => {
    setValue(newValue)
    onOptionSelect(newValue)
  }

  return (
    <DebounceSelect
      value={value}
      showSearch
      bordered={bordered}
      fetchOptions={() => fetchUserList(value, typeID)}
      onChange={onSelectOption}
      defaultValue={defaultValue}
      selectedVal={selectedValue}
      style={{ width: '100%' }}
    />
  )
}

async function fetchEmploymentType(username, typeID) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/LKP/GetAllLookUpValues_ByFK_LookUpId?FK_LookUpId=${typeID}`)
    .then((response) => response.json())
    .then((body) =>
      body.map((user) => ({
        label: `${user.lookUpValue}`,
        languages: {
          en: user.lookUpValue,
          ar: user.lookUpValue_Ar,
        },
        value: `${user.lookUpValue}`,
      })),
    )
}

const FetchSelectEmploymentType = ({ typeID, onOptionSelect, selectedValue, defaultValue }) => {
  const [value, setValue] = useState([])

  const onSelectOption = (newValue) => {
    setValue(newValue)
    onOptionSelect(newValue)
  }

  return (
    <DebounceSelect
      value={value}
      showSearch
      fetchOptions={() => fetchEmploymentType(value, typeID)}
      onChange={onSelectOption}
      defaultValue={defaultValue}
      selectedVal={selectedValue}
      style={{
        width: '100%',
      }}
    />
  )
}

export { FetchSelectEmploymentType, FetchSelectLookup }
