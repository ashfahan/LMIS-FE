import { Form, Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const { Option } = Select
  const { t } = useTranslation()
  // const [defaultVal, setDefaultVal] = React.useState(props.selectedVal);
  const [form] = Form.useForm()
  const fetchRef = React.useRef(0)

  if (props.selectedVal) {
    form.setFieldsValue({
      loookup: props.selectedVal,
    })
  }
  useEffect(() => {
    setOptions([])
    setFetching(true)
    fetchOptions(props.value).then((newOptions) => {
      setOptions(newOptions)
      setFetching(false)
    })
  }, [])
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      // setDefaultVal(props.selectedVal);
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
      <Form.Item name="loookup" noStyle>
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
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
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

async function fetchUserList(username, typeID) {
  let _language = sessionStorage.getItem('i18nextLng')
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/LKP/GetAllLookUpValues_ByFK_LookUpId?FK_LookUpId=${typeID}`,
  )
    .then((response) => response.json())
    .then((body) =>
      body.map((user) => ({
        label: `${_language === 'en' ? user.lookUpValue : user.lookUpValue_Ar}`,
        value: user.lookUpValue,
      })),
    )
}

const FetchSelectGender = ({
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
