import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import JobsFilters from '../components/Jobs/jobsFilter'
import JobsList from '../components/Jobs/jobsList'
import JobsMain from '../components/Jobs/jobsMain'
import Navigation from '../components/Layout/header'
import { FetchSelectLookup } from '../shared/fetch_select_lookup'
import { getLookups } from '../stores/apis/lookup_api'
import { sidebarToggleBtn } from '../stores/atoms/app_config_atom'
import Style from '../styles/dashboard.module.scss'

const Jobs = () => {
  const router = useRouter()
  const { jobTitle, location } = router.query
  const [sidebar, setSidebar] = useRecoilState(sidebarToggleBtn)
  const showSidebar = () => setSidebar(!sidebar)
  const [defaultJobTitle, setDefaultJobTitle] = useState(null)
  const [defaultCityTitle, setDefaultCityTitle] = useState(null)
  const [isLoader, setIsloader] = useState(false)
  const [jobTitleCounter, setJobTitleCounter] = useState(1)
  const [cityTitleCounter, setCityTitleCounter] = useState(1)
  const resetCheckBoxes = () => {
    let _inputs = document.getElementsByClassName('ant-checkbox')
    for (let i = 0; i < _inputs.length; i++) {
      _inputs[i].classList.remove('ant-checkbox-checked')
    }
    let _inputsCheckboxes =
      document.getElementsByClassName('ant-checkbox-inner')

    for (let i = 0; i < _inputsCheckboxes.length; i++) {
      _inputsCheckboxes[i].classList.remove('ant-checkbox-inner::after')
    }
  }

  const selcteJobTitle = (value) => {
    resetCheckBoxes()
    let _url = `/jobs?jobTitle=${value}&location=${
      location !== undefined ? location : ''
    }`
    router.replace(_url)
  }

  const selectCityTitle = (value) => {
    resetCheckBoxes()
    let _url = `/jobs?jobTitle=${
      jobTitle !== undefined ? jobTitle : ''
    }&location=${value}`
    router.replace(_url)
  }

  const { mutateAsync: getJobsMutateAsync, isLoading: jobIsLoadin } =
    useMutation(getLookups)
  const { mutateAsync: getCitiesMutateAsync, isLoading: cityIsLoading } =
    useMutation(getLookups)

  useEffect(() => {
    getJobsMutateAsync(16, {
      onSuccess: async (response) => {
        if (response?.length) {
          setDefaultJobTitle(
            response?.find((job) => job.lookUpValueId === parseInt(jobTitle))
              ?.lookUpValue,
          )
        }
      },
    })
  }, [jobTitle])
  useEffect(() => {
    getCitiesMutateAsync(3, {
      onSuccess: async (response) => {
        if (response?.length) {
          setDefaultCityTitle(
            response?.find((job) => job.lookUpValueId === parseInt(location))
              ?.lookUpValue,
          )
        }
      },
    })
  }, [location])

  useEffect(() => {
    setIsloader(true)
  }, [cityTitleCounter, jobTitleCounter])

  const resetDefaultCity = () => {
    setIsloader(false)
    setDefaultCityTitle('Select a city')
    setCityTitleCounter((prev) => prev + 1)
  }
  const resetDefaultJobTitle = () => {
    setIsloader(false)
    setDefaultJobTitle('Select a job title')
    setJobTitleCounter((prev) => prev + 1)
  }
  return (
    <div>
      <Navigation />
      {/* <Row style={{margin: '0'}}>
                <Col span={24}>
                    <SearchBox />
                </Col>
            </Row>         */}

      {/* <div className={Style.sidebarToggleBtn}>
                <button>
                    <FilterOutlined  onClick={showSidebar} />
                </button>
            </div> */}
      {!jobIsLoadin && !cityIsLoading && isLoader && (
        <Row style={{ margin: '10px', gap: '20px' }}>
          <Col lg={6} xs={0}></Col>
          <Col lg={5} xs={24}>
            <FetchSelectLookup
              typeID={16}
              onOptionSelect={selcteJobTitle}
              defaultValue={defaultJobTitle || 'Select a job title'}
            />
          </Col>
          <Col lg={5} xs={24}>
            <FetchSelectLookup
              typeID={3}
              onOptionSelect={selectCityTitle}
              defaultValue={defaultCityTitle || 'Select a city'}
            />
          </Col>
        </Row>
      )}
      <Row style={{ margin: '0', gap: '20px' }}>
        <Col
          lg={5}
          xs={24}
          className={sidebar ? 'SidebarHsOpened' : 'SidebarHsClosed'}
        >
          <div className={`${Style.sidebarToggleBtn} closefiltersBtn`}>
            <button>
              <ArrowLeftOutlined onClick={showSidebar} />
            </button>
          </div>
          <JobsFilters
            resetDefaultJobTitle={resetDefaultJobTitle}
            resetDefaultCity={resetDefaultCity}
          />
        </Col>

        <Col lg={5} sm={10} xs={24} style={{ padding: '40px 10px 20px' }}>
          <JobsList />
        </Col>
        <Col lg={12} sm={13} xs={24} style={{ padding: '40px 10px 20px' }}>
          <div className={Style.jobsMainWrapper}>
            <JobsMain />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Jobs
