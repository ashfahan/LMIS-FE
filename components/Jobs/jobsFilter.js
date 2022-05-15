import { LoadingOutlined } from '@ant-design/icons'
import { Checkbox, Collapse, Slider, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { getAllFilters } from '../../stores/apis/jobs_api'
import { JobFilters, singleJob } from '../../stores/atoms/job_atom.js'
import Style from '../../styles/jobs.module.scss'

const JobsFilter = (props) => {
  const { t } = useTranslation()
  const { Panel } = Collapse
  const [filters, setFilters] = useRecoilState(JobFilters)
  const [job, setJob] = useRecoilState(singleJob)
  const { isLoading, error, data } = useQuery('getAllFilters', getAllFilters)
  let sliderMinValue = 10
  let sliderMaxValue = 100
  const router = useRouter()
  const { jobTitle, location, industry, company } = router.query

  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])

  useEffect(() => {
    let filtertitlearray = parseInt(jobTitle) > 0 ? [jobTitle] : []
    let _cityFilter = parseInt(location) > 0 ? [location] : []
    let _company = parseInt(company) > 0 ? [company] : []
    let _industry = parseInt(industry) > 0 ? [industry] : []
    setFilters({
      ...filters,
      city: _cityFilter.join(','),
      jobTitle: filtertitlearray.join(','),
      company: _company.join(','),
    })
  }, [jobTitle, location, company, industry])
  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      </div>
    )
  if (error) return 'An error has occurred: ' + error.message

  function onChange(value) {
    // console.log("onChange: ", value);
  }

  function onAfterChange(value) {
    let filtertitlearray = []

    if (value) {
      filtertitlearray.push(value)
    } else {
      filtertitlearray = filtertitlearray.filter((item) => item != value)
    }
    // filtertitlearray = filtertitlearray.filter(el => el != null && el != '');
    setFilters({ ...filters, salary: filtertitlearray.join(',') })
  }

  const selectTitleFilter = (event) => {
    let filtertitlearray = filters.jobTitle
      ? filters.jobTitle.split(',').map((x) => +x)
      : []
    if (jobTitle !== undefined) {
      filtertitlearray = filtertitlearray.filter(
        (item) => item !== parseInt(jobTitle),
      )
    }

    if (event.target.checked) {
      event.target.value !== '' && filtertitlearray.push(event.target.value)
    } else {
      filtertitlearray = filtertitlearray.filter(
        (item) => item != event.target.value,
      )
    }
    filtertitlearray = filtertitlearray.filter((el) => el != null && el != '')
    setFilters({ ...filters, jobTitle: filtertitlearray.join(',') })
    setJob({})
    props.resetDefaultJobTitle()
  }

  const selectExperienceFilter = (event) => {
    let filterExpearray = filters.experience
      ? filters.experience.split(',').map((x) => +x)
      : []
    if (event.target.checked) {
      event.target.value !== '' && filterExpearray.push(event.target.value)
    } else {
      filterExpearray = filterExpearray.filter(
        (item) => item != event.target.value,
      )
    }
    filterExpearray = filterExpearray.filter((el) => el != null && el != '')
    setFilters({ ...filters, experience: filterExpearray.join(',') })
    setJob({})
  }

  const selectJobTypeFilter = (event) => {
    let filterJobTypearray = filters.jobType
      ? filters.jobType.split(',').map((x) => x)
      : []
    if (event.target.checked) {
      event.target.value !== '' && filterJobTypearray.push(event.target.value)
    } else {
      filterJobTypearray = filterJobTypearray.filter(
        (item) => item != event.target.value,
      )
    }
    filterJobTypearray = filterJobTypearray.filter(
      (el) => el != null && el != '',
    )
    setFilters({ ...filters, jobType: filterJobTypearray.join(',') })
    setJob({})
  }

  const selectCompanyFilter = (event) => {
    let filterCompanyarray = filters.company
      ? filters.company.split(',').map((x) => +x)
      : []
    if (event.target.checked) {
      event.target.value !== '' && filterCompanyarray.push(event.target.value)
    } else {
      filterCompanyarray = filterCompanyarray.filter(
        (item) => item != event.target.value,
      )
    }
    filterCompanyarray = filterCompanyarray.filter(
      (el) => el != null && el != '',
    )
    setFilters({ ...filters, company: filterCompanyarray.join(',') })
    setJob({})
  }

  const selectGenderFilter = (event) => {
    let filterGendararray = filters.gender ? filters.gender.split(',') : []
    if (event.target.checked) {
      event.target.value !== '' && filterGendararray.push(event.target.value)
    } else {
      filterGendararray = filterGendararray.filter(
        (item) => item !== event.target.value,
      )
    }
    filterGendararray = filterGendararray.filter((el) => el != null && el != '')
    setFilters({ ...filters, gender: filterGendararray.join(',') })
    setJob({})
  }
  const selectCityFilter = (event) => {
    let _city = filters.city ? filters.city.split(',').map((x) => +x) : []
    if (location !== undefined) {
      _city = _city.filter((item) => item !== parseInt(location))
    }

    if (event.target.checked) {
      event.target.value !== '' && _city.push(event.target.value)
    } else {
      _city = _city.filter((item) => item != event.target.value)
    }
    _city = _city.filter((el) => el != null && el != '')
    setFilters({ ...filters, city: _city.join(',') })
    setJob({})
    props.resetDefaultCity()
  }
  if (data?.salary?.length) {
    sliderMinValue = Math.min.apply(
      Math,
      data.salary.map(function (item) {
        return item.title
      }),
    )
    sliderMaxValue =
      10 +
      Math.max.apply(
        Math,
        data.salary.map(function (item) {
          return item.title
        }),
      )
  }
  return (
    <div className={Style.jobFilters}>
      <h3>{t('filters')}</h3>
      <Collapse defaultActiveKey={['1', '2', '3', '4', '5']} ghost>
        <Panel
          className={Style.filterPanelSingle}
          header={t('job_title')}
          key="1"
        >
          <ul>
            {data.jobTitle.map((item, index) => {
              return (
                <li key={index}>
                  <Checkbox onChange={selectTitleFilter} value={item.id}>
                    {language === 'en' ? item.title : item.title_ar}
                  </Checkbox>
                  <span>{item.count}</span>
                </li>
              )
            })}
          </ul>
          <div className={Style.jobFiltersDevider}></div>
        </Panel>
        <Panel
          className={Style.filterPanelSingle}
          header={t('experience')}
          key="2"
        >
          <ul>
            {data.experience.map((item, index) => {
              return (
                <li key={index}>
                  <Checkbox onChange={selectExperienceFilter} value={item.id}>
                    {language === 'en' ? item.title : item.title_ar}
                  </Checkbox>
                  <span>{item.count}</span>
                </li>
              )
            })}
          </ul>
          <div className={Style.jobFiltersDevider}></div>
        </Panel>

        <div className={Style.filterPanelSalary}>
          <label>
            {t('salary')}{' '}
            <span className="dFlex align-item-center">
              {sliderMinValue >= 1000
                ? sliderMinValue / 1000 + 'k'
                : sliderMinValue}{' '}
              -{' '}
              {sliderMaxValue - 10 >= 1000
                ? (sliderMaxValue - 10) / 1000 + 'k'
                : sliderMaxValue - 10 + ' '}
              <span style={{ fontSize: '10px', marginLeft: '5px' }}>LYD</span>
            </span>
          </label>

          <Slider
            range
            step={5}
            defaultValue={[0, sliderMaxValue]}
            max={sliderMaxValue}
            onChange={onChange}
            onAfterChange={onAfterChange}
          />
          <div className={Style.jobFiltersDevider}></div>
        </div>

        <Panel
          className={Style.filterPanelSingle}
          header={t('job_type')}
          key="3"
        >
          <ul>
            {data?.jobType.map((item, index) => {
              return (
                <li key={index}>
                  <Checkbox onChange={selectJobTypeFilter} value={item.id}>
                    {language === 'en' ? item.title : item.title_ar}
                  </Checkbox>
                  <span>{item.count}</span>
                </li>
              )
            })}
          </ul>
        </Panel>
        <Panel
          className={Style.filterPanelSingle}
          header={t('company')}
          key="4"
        >
          <ul>
            {data.company.map((item, index) => {
              return (
                <li key={index}>
                  <Checkbox onChange={selectCompanyFilter} value={item.id}>
                    {language === 'en' ? item.title : item.title_ar}
                  </Checkbox>
                  <span>{item.count}</span>
                </li>
              )
            })}
          </ul>
          <div className={Style.jobFiltersDevider}></div>
        </Panel>
        <Panel className={Style.filterPanelSingle} header={t('gender')} key="5">
          <ul>
            {data.gender.map((item, index) => {
              return (
                <li key={index}>
                  <Checkbox onChange={selectGenderFilter} value={item.id}>
                    {language === 'en' ? item.title : item.title}
                  </Checkbox>
                  <span>{item.count}</span>
                </li>
              )
            })}
          </ul>
        </Panel>
        <Panel className={Style.filterPanelSingle} header={t('city')} key="6">
          <ul>
            {data?.city?.map((item, index) => {
              return (
                <li key={index}>
                  <Checkbox onChange={selectCityFilter} value={item.id}>
                    {language === 'en' ? item.title : item.title_ar}
                  </Checkbox>
                  <span>{item.count}</span>
                </li>
              )
            })}
          </ul>
        </Panel>
      </Collapse>
    </div>
  )
}

export default JobsFilter
