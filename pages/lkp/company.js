import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import EmpDashSidebar from '../../components/Dashboard/employer/empDashSidebar'
import Navigation from '../../components/Layout/header'
import CompanyTable from '../../components/Lookups/companyTable'
import LookupsCompanyForm from '../../components/Lookups/lookupsCompanyForm'
import Style from '../../styles/empDashLookups.module.scss'

const CompanyLookup = () => {
  const { t } = useTranslation()
  const [editMode, setEditMode] = useState(false)
  const [company, setCompany] = useState({})
  const [searchKeywords, setSearchKeywords] = useState('')
  const handleSearch = (value) => {
    setSearchKeywords(value)
  }
  const handleEditRecord = (companyData) => {
    setEditMode(true)
    setCompany(companyData)
  }
  const handleEditMode = () => {
    setEditMode(false)
  }
  return (
    <div>
      <Navigation />
      <Row style={{ gap: '30px' }}>
        <Col lg={4} xs={24}>
          <EmpDashSidebar />
        </Col>
        <Col
          lg={{ span: 18, offset: 0 }}
          xs={{ span: 22, offset: 1 }}
          className={Style.lookupsTableCol}
        >
          <Row>
            <LookupsCompanyForm
              pageTitle={t('company_lookups')}
              handleSearch={handleSearch}
              editMode={editMode}
              handleEditMode={handleEditMode}
              company={company}
            />
          </Row>
          <Row>
            <CompanyTable
              searchKeywords={searchKeywords}
              handleEditRecord={handleEditRecord}
            />
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CompanyLookup
