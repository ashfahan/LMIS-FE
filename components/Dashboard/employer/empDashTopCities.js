import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Style from '../../../styles/dashboard.module.scss'
import DataNotFound from '../dataNotFound'
import CatTopsPicksSingle from './catTopsPicksSingle'

const EmpDashTopCities = (props) => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  return (
    <div className={Style.empDashCatTopPicksMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p>{props.title}</p>
      </div>
      {props?.data?.length > 0 ? (
        <ol className={Style.empDashTopsList}>
          {props.data.map((pick) => {
            return (
              <CatTopsPicksSingle
                key={pick.title}
                catItemName={language === 'en' ? pick.title : pick.title_ar}
                itemProgress={pick.count}
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

export default EmpDashTopCities
