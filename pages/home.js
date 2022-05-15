import { Col, Row, Tabs } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import JobsByFunction from '../components/Jobs/jobsByFunction'
import Navigation from '../components/Layout/header'
import Style from '../styles/home.module.scss'

const Home = () => {
  const { TabPane } = Tabs
  const { t } = useTranslation()

  return (
    <>
      <main>
        <Navigation />
        <div className={Style.homeBanner}>
          <div>
            <h2> {t('a_new_opportunity_awaits_you')}</h2>
            <p>{t('Search_for_a_job_now')}</p>
            <div className={Style.homeSearchBox}>
              <input placeholder="Job Title" />
              <div className={Style.bdr} />
              <input placeholder="Location" />
              <button className={Style.btn}>Search Jobs</button>
            </div>
          </div>
        </div>
      </main>

      <main>
        <Col lg={{ span: 18, offset: 3 }}>
          <div className={Style.homeJobsSection}>
            <h2>Jobs in Libya</h2>
            <div className="homePageTabs">
              <Tabs defaultActiveKey="1">
                <TabPane tab="BY FUNCTION" key="1">
                  <JobsByFunction />
                </TabPane>
                <TabPane tab="BY INDUSTRY" key="2">
                  <h1>2</h1>
                </TabPane>
                <TabPane tab="BY CITY" key="3">
                  <h1>3</h1>
                </TabPane>
                <TabPane tab="BY COMPANY" key="4">
                  <h1>4</h1>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Col>
      </main>

      <main>
        <Col lg={{ span: 16, offset: 4 }}>
          <div className={Style.homeFooter}>
            <Row>
              <Col lg={8}>
                <h2>Logo Comes Here</h2>
              </Col>
              <Col lg={16}>
                <Row>
                  <Col lg={6}>
                    <h3>By Function</h3>
                    <ul>
                      <li>
                        <a href="#">Operations</a>
                      </li>
                      <li>
                        <a href="#">Retail</a>
                      </li>
                      <li>
                        <a href="#">Marketing</a>
                      </li>
                      <li>
                        <a href="#">Administration</a>
                      </li>
                      <li>
                        <a href="#">Engineering</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={6}>
                    <h3>By Industry</h3>
                    <ul>
                      <li>
                        <a href="#">Computer Sofware</a>
                      </li>
                      <li>
                        <a href="#">Manufacturing</a>
                      </li>
                      <li>
                        <a href="#">Real Estate</a>
                      </li>
                      <li>
                        <a href="#">Health Care</a>
                      </li>
                      <li>
                        <a href="#">Hospitality</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={6}>
                    <h3>By City</h3>
                    <ul>
                      <li>
                        <a href="#">Tripoli</a>
                      </li>
                      <li>
                        <a href="#">Benghazi</a>
                      </li>
                      <li>
                        <a href="#">Misrata</a>
                      </li>
                      <li>
                        <a href="#">Sirte</a>
                      </li>
                      <li>
                        <a href="#">Al Bayda</a>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={6}>
                    <h3>By Company</h3>
                    <ul>
                      <li>
                        <a href="#">Hyphen</a>
                      </li>
                      <li>
                        <a href="#">Z Creatives</a>
                      </li>
                      <li>
                        <a href="#">Softpers</a>
                      </li>
                      <li>
                        <a href="#">GrowHawk</a>
                      </li>
                      <li>
                        <a href="#">Foodpanda</a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </main>

      <footer className={Style.footerBar}>
        <p>2021 All rights reserved</p>
      </footer>
    </>
  )
}

export default Home
