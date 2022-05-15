import { Button, Menu, Select } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Style from '../../../styles/dashboard.module.scss'

const SearchJobs = ({
  searchKeyword,
  handleClick,
  handleDropdownClick,
  isButtonVisible = true,
}) => {
  const { t } = useTranslation()
  const { Option } = Select

  const selectionList = (
    <Menu>
      <Menu.Item key="1">{t('this_week')}</Menu.Item>
      <Menu.Item key="2">{t('last_two_weeks')}</Menu.Item>
      <Menu.Item key="3">{t('this_month')}</Menu.Item>
      <Menu.Item key="4">{t('all_the_time')}</Menu.Item>
    </Menu>
  )
  const handleButtonClick = () => {
    handleClick()
  }
  const handleSelectChange = (value) => {
    handleDropdownClick(value)
  }
  return (
    <div className={Style.searchJobsSelectMain}>
      <div className={Style.searchJobsSelect}>
        <Select
          filterOption={false}
          size="large"
          onChange={handleSelectChange}
          defaultValue={'This week'}
        >
          <Option key={Math.random} value={'0'}>
            {t('this_week')}
          </Option>
          <Option key={Math.random} value={'1'}>
            {t('last_two_weeks')}
          </Option>
          <Option key={Math.random} value={'2'}>
            {t('this_month')}
          </Option>
          <Option key={Math.random} value={'3'}>
            {t('all_the_time')}
          </Option>
        </Select>
        {isButtonVisible && (
          <Button type="primary" onClick={handleButtonClick}>
            {t(searchKeyword)}
          </Button>
        )}
      </div>
    </div>
  )
}

export default SearchJobs
