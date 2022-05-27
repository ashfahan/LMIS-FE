import { Button, Col, Modal, Row, Tabs } from 'antd'
// import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import DashSidebar from '../../components/Dashboard/user/dashSideBar'
import JobPreferencesSub from '../../components/JobPreferences/JobPreferences'
import Navigation from '../../components/Layout/header'
import AboutYourself from '../../components/Profile/aboutYourself'
import AddEducation from '../../components/Profile/education'
import Educationadded from '../../components/Profile/EducationAdded'
import AddExperience from '../../components/Profile/experience'
import ExperienceAdded from '../../components/Profile/ExperienceAdded'
import { userTypeAtom } from '../../stores/atoms/app_config_atom'
import { Education_to_Edit_atom, Experience_to_Edit_atom } from '../../stores/atoms/profile_atom'
import Style from '../../styles/dashboard.module.scss'

const CandidateProfile = () => {
  // const queryClient = useQueryClient();
  const userType = useRecoilValue(userTypeAtom)
  const { t } = useTranslation()
  const router = useRouter()

  const [showEduModal, setShowEduModal] = useState(false)
  const [showExpModal, setShowExpModal] = useState(false)
  const EduToEdit = useRecoilValue(Education_to_Edit_atom)
  // const [educationEdit, setEducationEdit] = useRecoilState(Education_to_Edit_atom);
  const ExpToEdit = useRecoilValue(Experience_to_Edit_atom)
  const [editMode, setEditMode] = useState(false)

  // const [editmode, setEditmode] = useState(false);
  // const [editRecState, setEditRecState] = useState({});
  const { TabPane } = Tabs

  const onEditModalEdu = () => {
    setEditMode(true)
    setShowEduModal(true)
  }

  const onEditModalExp = () => {
    setEditMode(true)
    setShowExpModal(true)
  }

  const RecordAddedSuccess = () => {
    setShowEduModal(false)
    setShowExpModal(false)
  }

  const addNewEducation = () => {
    setShowEduModal(true)
    setEditMode(false)
  }

  const addNewExperience = () => {
    setShowExpModal(true)
    setEditMode(false)
  }

  return (
    <div>
      <Navigation />
      <Row>
        <Col lg={4} xs={24}>
          <DashSidebar />
        </Col>
        <Col lg={20} xs={24}>
          <Row style={{ marginRight: 0 }}>
            <Col xs={24}>
              {/* <div className={Style.dboardCenterCol} style={{maxWidth: '1000px', margin: '0 auto'}}> */}
              <div className={Style.dboardCenterCol}>
                <h2 style={{ display: 'block', width: '100%' }}>{t('profile')}</h2>
                <Tabs className="dashboardTabsWrapper" defaultActiveKey="1">
                  <TabPane tab={t('about_yourself')} key="1">
                    <AboutYourself editMode={true} />
                  </TabPane>
                  <TabPane tab={t('education')} key="2">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <div className="recordAddition">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '-15px',
                            marginBottom: '20px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <div></div>
                          <Button className={Style.recordAdditionBtn} type="primary" onClick={addNewEducation}>
                            {t('add_new_education')}
                          </Button>
                        </div>
                        <Educationadded openEditModal={onEditModalEdu} />
                        <Modal
                          title={`${editMode ? t('edit') : t('add_new') + ' ' + t('education')}`}
                          visible={showEduModal}
                          onCancel={() => setShowEduModal(false)}
                          footer={null}
                        >
                          <AddEducation
                            type="inDashboard"
                            record_to_edit={EduToEdit}
                            editMode={editMode}
                            onCancel={() => setShowEduModal(false)}
                            onSuccessAction={RecordAddedSuccess}
                          />
                        </Modal>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={t('experience')} key="3">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <div className="recordAddition">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '-15px',
                            marginBottom: '20px',
                          }}
                        >
                          <div></div>
                          <Button className={Style.recordAdditionBtn} type="primary" onClick={addNewExperience}>
                            {t('add_new_experience')}
                          </Button>
                        </div>
                        <ExperienceAdded openEditModal={onEditModalExp} />
                        <Modal
                          title={`${editMode ? t('edit') : t('add_new') + ' ' + t('experience')}`}
                          visible={showExpModal}
                          onCancel={() => setShowExpModal(false)}
                          footer={null}
                        >
                          <AddExperience
                            type="inDashboard"
                            record_to_edit={ExpToEdit}
                            editMode={editMode}
                            closeModal={() => setShowExpModal(false)}
                            onSuccessAction={RecordAddedSuccess}
                          />
                        </Modal>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={t('job_preferences')} key="4">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                      }}
                      className={Style.jobPreferencesWrapper}
                    >
                      <JobPreferencesSub editMode={true} />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CandidateProfile
