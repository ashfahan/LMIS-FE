import { Form, Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import React, { useState } from 'react'

function Dropdown({ fetchOptions, debounceTimeout = 800, i18n: { language }, ...props }) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const fetchRef = React.useRef(0)
  const [form] = Form.useForm()

  if (props.selectedVal) {
    form.setFieldsValue({
      company_name_lkp: props.selectedVal,
    })
  }

  useEffect(() => {
    setOptions((prev) => prev.map((option) => ({ ...option, label: option.languages?.[language] ?? option.label })))
  }, [language, options])

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
    <Form name="basic" layout="vertical" form={form} onFinish={() => {}} onFinishFailed={() => {}} autoComplete="off">
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

const DebounceSelect = withTranslation()(Dropdown)

async function fetchUserList(username) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/Users/GetUsers`)
    .then((response) => response.json())
    .then((body) =>
      body.map((user) => ({
        label: `${user.userFName} ${user.user_LName !== null ? user.user_LName : ''}`,
        value: user.userId,
      })),
    )
}

const FetchSelectUser = ({ typeID, onOptionSelect, selectedValue, defaultValue }) => {
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

export default FetchSelectUser
