import { Col, Row } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import EmpDashSidebar from '../components/Dashboard/employer/empDashSidebar'
import Navigation from '../components/Layout/header'
import auth from '../shared/auth'
import { permissionsEnum } from '../shared/permissionsEnum'
import { getOverView } from '../stores/apis/jobs_api'

export const EmployerDashboard = () => {
  const { t } = useTranslation()
  const { addToast } = useToasts()
  const [isPostJobVisible, setIsPostJobVisible] = useState(true)

  const router = useRouter()
  // const userType = useRecoilValue(userTypeAtom);
  // const { isLoading, error, data } = useQuery("getOverView", () =>
  //   getOverView(`Dashboard/TopStatistics`)
  // );
  const { mutateAsync, isLoading, isSuccess, error, data } = useMutation(getOverView)

  useEffect(() => {
    if (!auth()) {
      router.push('/')
    }
    let _permissions = JSON.parse(sessionStorage.getItem('permissions')) || []
    setIsPostJobVisible(_permissions.some((item) => item === permissionsEnum.postAJob))
  }, [])

  useEffect(() => {
    let _date = new Date()
    let _startingDate = new Date(_date)
    _startingDate.setDate(_startingDate.getDate() - 7)
    _startingDate = _startingDate.toDateString()
    _startingDate = moment(_startingDate).format('YYYY-MM-DD')
    _date = moment(_date).format('YYYY-MM-DD')
    getNewData(_startingDate, _date)
  }, [])

  const handleDropdownClick = (value) => {
    let _date = new Date()
    let _startingDate = new Date(_date)
    switch (value) {
      case '0':
        _startingDate.setDate(_startingDate.getDate() - 6)
        break
      case '1':
        _startingDate.setDate(_date.getDate() - 13)
        break
      case '2':
        _startingDate.setDate(_date.getDate() - 29)
        break
      case '3':
        _date = ''
        _startingDate = ''
        break
    }
    if (value !== '3') {
      _startingDate = _startingDate.toDateString()
      _startingDate = moment(_startingDate).format('YYYY-MM-DD')
      _date = moment(_date).format('YYYY-MM-DD')
    }
    getNewData(_startingDate, _date)
  }
  const getNewData = (startingDate, endingDate) => {
    let _url = `Dashboard/TopStatistics`
    if (startingDate !== '' && endingDate !== '') {
      _url += `?fromDate=${startingDate}&toDate=${endingDate}`
    }
    mutateAsync(_url, {
      onSuccess: async (response) => {},
      onError: async (error) => {
        addToast('Something went wrong.', {
          appearance: 'error',
          autoDismiss: true,
        })
      },
    })
  }

  return (
    <div>
      <Navigation />
      <Row>
        <Col lg={4} xs={24}>
          <EmpDashSidebar />
        </Col>
      </Row>
    </div>
  )
}

export default EmployerDashboard
