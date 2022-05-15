import { Button } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Style from '../../../styles/jobs.module.scss'

const Viewjobdescription = ({
  jobDescription,
  saveJobLoading,
  applyBtn,
  isApplied,
  applyOnThisJob,
}) => {
  const { t } = useTranslation()
  return (
    <div className={Style.jobsMainSection}>
      <div className={Style.jobsMainBox}>
        <div className={Style.mainBoxHeader}>
          <h3>{t('job_requirements')}</h3>
          {applyBtn && applyBtn == 'true' ? (
            <div className={Style.jobApplyBtnWrapper}>
              <Button
                loading={saveJobLoading}
                onClick={applyOnThisJob}
                type={isApplied && isApplied == 'true' ? '' : 'primary'}
                disabled={isApplied && isApplied == 'true' ? true : false}
              >
                {isApplied && isApplied == 'true' ? 'Applied' : 'Apply'}
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          className={Style.jobDescriptionWrapper}
          dangerouslySetInnerHTML={{ __html: jobDescription }}
        ></div>
      </div>
    </div>
  )
}

export default Viewjobdescription
