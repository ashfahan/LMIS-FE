import { Form, Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const fetchRef = React.useRef(0)
  const [form] = Form.useForm()
  const { t } = useTranslation()
  if (props.selectedVal) {
    form.setFieldsValue({
      company_name_lkp: props.selectedVal,
    })
  }
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }

        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])
  return (
    <Form
      name="basic"
      layout="vertical"
      form={form}
      onFinish={() => {}}
      onFinishFailed={() => {}}
      autoComplete="off"
    >
      <Form.Item name="company_name_lkp" noStyle>
        <Select
          filterOption={false}
          size="large"
          className="fontSm"
          onClick={debounceFetcher}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          {...props}
          options={options}
          defaultValue={props.defaultValue}
        />
      </Form.Item>
    </Form>
  )
}

async function fetchUserList(username) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/RoleManagement/GetRoles`)
    .then((response) => response.json())
    .then((body) =>
      body.map((user) => ({
        label: `${user.name}`,
        value: user.id,
      })),
    )
}

const FetchSelectRole = ({
  typeID,
  onOptionSelect,
  selectedValue,
  defaultValue,
}) => {
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
      fetchOptions={() => fetchUserList()}
      onChange={onSelectOption}
      selectedVal={selectedValue}
      defaultValue={defaultValue}
      style={{
        width: '100%',
      }}
    />
  )
}

export default FetchSelectRole
