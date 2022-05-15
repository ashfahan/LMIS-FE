import { LoadingOutlined } from '@ant-design/icons'
import { Form, Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 800,
  bordered = true,
  ...props
}) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const { Option } = Select
  // const [defaultVal, setDefaultVal] = React.useState(props.selectedVal);
  const [form] = Form.useForm()
  const fetchRef = React.useRef(0)
  const { t } = useTranslation()
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
          bordered={bordered}
          //filterOption={false}
          size="large"
          showSearch
          className="fontSm"
          // onSearch={debounceFetcher}
          // onClick={debounceFetcher}
          notFoundContent={
            fetching ? (
              <Spin
                size="small"
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : null
          }
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
        value: user.lookUpValueId,
      })),
    )
}

const FetchSelectLookup = ({
  typeID,
  onOptionSelect,
  selectedValue,
  defaultValue,
  bordered,
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
      bordered={bordered}
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

async function fetchEmploymentType(username, typeID) {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/LKP/GetAllLookUpValues_ByFK_LookUpId?FK_LookUpId=${typeID}`,
  )
    .then((response) => response.json())
    .then((body) =>
      body.map((user) => ({
        label: `${user.lookUpValue}`,
        value: `${user.lookUpValue}`,
      })),
    )
}

const FetchSelectEmploymentType = ({
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

// import React, {useState, useEffect} from 'react';
// import { Select, Spin} from 'antd';
// import {useQuery} from 'react-query';
// import {getLookups} from '../stores/apis/lookup_api';

// const FetchSelectLookup = ({typeID, onOptionSelect, selectedValue}) => {

//     const [showoptoins, setShowOptions] = useState([]);

//     useEffect(() => {
//         setShowOptions([]);
//     }, [])

//     const debounceFetcher = (newValue) => {
//         console.log(newValue);
//         const {isLoading, error, data} = useQuery("getAllLookups", () => getLookups(typeID), {
//             onSuccess: (data) => {
//                 setShowOptions(data);
//             }
//         });
//     }

//     return (
//         <Select
//              placeholder={t("select_an_option")}
//             size="large"
//             showSearch
//             // onSearch={debounceFetcher}
//             notFoundContent={  <Spin size="small" /> }
//         >
//         {showoptoins.map(option => {
//             return <Option value={option.lookUpValueId}>{option.lookUpValue}</Option>
//         })}
//       </Select>

//     );
// }

// export default FetchSelectLookup;
