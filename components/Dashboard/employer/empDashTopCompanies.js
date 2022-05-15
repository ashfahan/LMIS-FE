import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Style from '../../../styles/dashboard.module.scss'
import DataNotFound from '../dataNotFound'
import CatTopsPicksSingle from './catTopsPicksSingle'

const EmpTopCompanies = (props) => {
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  const { t } = useTranslation()
  return (
    <div className={Style.empTopCompaniesMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p>{props.title}</p>
      </div>
      {props?.data && props?.data?.length > 0 ? (
        <ol className={Style.empDashTopsList}>
          {props.data.map((pick) => {
            return (
              <CatTopsPicksSingle
                key={pick.title}
                catItemName={language === 'en' ? pick.title : pick.title_ar}
                itemProgress={pick.Progress}
                info={pick.count}
              />
            )
          })}
        </ol>
      ) : (
        <DataNotFound title={t('data_not_found')} />
      )}
    </div>
  )
}

export default EmpTopCompanies
