import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import logo from '../../public/img/logo.png'
import { language } from '../../stores/atoms/app_config_atom'
import styles from '../../styles/auth.module.scss'

const AuthSidebar = ({ currentStep, page }) => {
  const { t } = useTranslation()

  const lan = useRecoilValue(language)
  return (
    <React.Fragment>
      <aside className={styles.auth_sidebar}>
        <Image src={logo} alt="Logo" />
        <span className={styles.sidebarBelowLogo}></span>
        <span
          className={styles.sidebar_search_icon}
          style={lan == 'ar' ? { right: '0px', transform: 'scaleX(-1)' } : {}}
        ></span>
        {page === 'signin' ? (
          <p style={{ color: '#fff', fontSize: '18px', padding: '20px 0' }}>
            Something to show here
          </p>
        ) : (
          <ul>
            <li className={`${currentStep === 1 ? styles.active : null}`}>
              <span>1</span>
              <p style={{ margin: '0' }}>{t('create_an_account')}</p>
            </li>
            <li className={`${currentStep === 2 ? styles.active : null}`}>
              <span>2</span>
              <p style={{ margin: '0', cursor: 'pointer' }}>
                {t('setup_your_profile')}
              </p>
            </li>
            <li className={`${currentStep === 3 ? styles.active : null}`}>
              <span>3</span>
              <p style={{ margin: '0', cursor: 'pointer' }}>
                {t('setup_your_preferences')}
              </p>
            </li>
          </ul>
        )}
        <div className={styles.info_footer}>
          <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: 'bold' }}>
            {t('get_hired_text')}
          </h2>
          {/* <Image src={hired} alt="search" /> */}
          <p>{t('get_hired_text_2')}</p>
        </div>
      </aside>
    </React.Fragment>
  )
}

export default AuthSidebar
