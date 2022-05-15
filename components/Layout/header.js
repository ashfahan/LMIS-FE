import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
// import useSessionStorage from '../../shared/useSessionStorage';
import user from '../../public/img/user.png'
import auth from '../../shared/auth'
import getUserType from '../../shared/userType'
import { is_admin_user, is_candidate_user, language, sidebarToggleBtn } from '../../stores/atoms/app_config_atom'

const Navigation = () => {
  const [sidebar, setSidebar] = useRecoilState(sidebarToggleBtn)
  const isAdmin = useRecoilValue(is_admin_user)
  const isCandidate = useRecoilValue(is_candidate_user)
  const [userType, setUserType] = useState(
    typeof window !== 'undefined' && sessionStorage.getItem('jobhop_loggedin_user_type'),
  )
  const [picExten, setPicExten] = useState(
    typeof window !== 'undefined' &&
      sessionStorage.getItem('jobhop_loggedin_user') &&
      JSON.parse(sessionStorage.getItem('jobhop_loggedin_user')).picture,
  )
  const [userID, setUserID] = useState(
    typeof window !== 'undefined' &&
      sessionStorage.getItem('jobhop_loggedin_user') &&
      JSON.parse(sessionStorage.getItem('jobhop_loggedin_user')).userId,
  )

  const { i18n, t } = useTranslation()
  const [lan, setLan] = useRecoilState(language)
  const [sig, setSignin] = useState('')
  const router = useRouter()
  const showSidebar = () => setSidebar(!sidebar)
  const [hideResponsiveBtn, setHideResponsiveBtn] = useState(false)
  useEffect(() => {
    setSignin(auth() || (typeof window !== 'undefined' && sessionStorage.getItem('jobhop_loggedin_candidate_id')))
  }, [])
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('jobhop_loggedin_user_type') === 1) {
      setUserType(1)
    } else if (typeof window !== 'undefined' && sessionStorage.getItem('jobhop_loggedin_user_type') === 0) {
      setUserType(0)
    }
    if (router.pathname == '/') {
      setHideResponsiveBtn(true)
    }
  }, [router])

  // const signin = useRecoilValue(isLoggedIn);
  const [currentlang, setLang] = useState(lan == 'ar' ? false : true)

  const logoutUser = () => {
    typeof window !== 'undefined' && sessionStorage.removeItem('jobhop_loggedin_user')
    typeof window !== 'undefined' && sessionStorage.removeItem('jobhop_loggedin_candidate_id')
    typeof window !== 'undefined' && sessionStorage.removeItem('jobhop_loggedin_user_id')
    typeof window !== 'undefined' && sessionStorage.removeItem('jobhop_loggedin_user_type')
    typeof window !== 'undefined' && sessionStorage.removeItem('user_first_login_jobhop')
    sessionStorage.removeItem('userToken')
    sessionStorage.removeItem('userType')
    sessionStorage.removeItem('permissions')
    sessionStorage.removeItem('isDpAdded')
    sessionStorage.removeItem('isCVAdded')
    sessionStorage.removeItem('isBioAdded')
    sessionStorage.removeItem('isEducationAdded')
    sessionStorage.removeItem('isExperienceAdded')

    setSignin(false)
    router.push('/signin')
  }

  const changeLanguage = () => {
    setLang(!currentlang)
    if (lan == 'ar') {
      i18n.changeLanguage('en')
      setLan('en')
    } else {
      i18n.changeLanguage('ar')
      setLan('ar')
    }
  }

  const nvgiationheader = () => {
    let _url = '/'
    if (getUserType() === '0') {
      _url = '/employerdashboard'
    } else if (userType == 1) {
      _url = '/dashboard'
    }
    router.push(_url)
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <p onClick={logoutUser} style={{ cursor: 'pointer', margin: 0 }}>
          Logout
        </p>
      </Menu.Item>
      <Menu.Item>
        <p
          onClick={() => {
            router.push('/forgotpassword')
          }}
          style={{ cursor: 'pointer', margin: 0 }}
        >
          Change Password
        </p>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="main_header" style={lan == 'ar' ? { flexDirection: 'row-reverse' } : {}}>
      <div className="relative flex gap-3 items-center">
        {!hideResponsiveBtn && (
          <div className="sidebarToggleBtn">
            <Link href="">
              <span onClick={showSidebar}>{!sidebar ? <MenuOutlined /> : <CloseOutlined />}</span>
            </Link>
          </div>
        )}
        <div className="logo-wrap">
          <a onClick={() => nvgiationheader()}> {t('header_web_name')}</a>
          <span className="responsivelogo">LMIS</span>
        </div>
      </div>
      <div className="navigation" style={lan == 'ar' ? { flexDirection: 'row-reverse' } : {}}>
        {sig && (
          <>
            {picExten && (
              <span
                style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '30px',
                  border: 'solid 1px #ddd',
                  overflow: 'hidden',
                }}
              >
                <img style={{ width: '100%' }} src={`${picExten}`} alt="search" />
              </span>
            )}
            {!picExten && (
              <span
                style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '30px',
                  border: 'solid 1px #ddd',
                  overflow: 'hidden',
                }}
              >
                <Image src={user} alt="search" />
              </span>
            )}
          </>
        )}

        {sig && (
          <div style={{ cursor: 'pointer' }}>
            <Dropdown overlay={menu}>
              <span style={{ minWidth: '100px' }}>
                {sig && (
                  <span>
                    Hi,{' '}
                    {typeof window !== 'undefined' &&
                      sessionStorage.getItem('jobhop_loggedin_user') &&
                      JSON.parse(sessionStorage.getItem('jobhop_loggedin_user')).user &&
                      JSON.parse(sessionStorage.getItem('jobhop_loggedin_user')).user.userFName}
                  </span>
                )}
              </span>
            </Dropdown>
          </div>
        )}
        {!sig && (
          <Link href="/signin">
            <a>Login</a>
          </Link>
        )}
        {!sig && (
          <Link href="/signup">
            <Button type="primary">Signup</Button>
          </Link>
        )}
        <span className="seperator"></span>
        <span
          onClick={changeLanguage}
          style={{
            color: 'blue',
            cursor: 'pointer',
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span>{currentlang ? 'عربي' : 'English'}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.41226 0.0382703C0.741471 0.170028 0.171262 0.752128 0.0412623 1.43788C-0.0137541 1.72798 -0.0137541 14.7581 0.0412623 15.0482C0.174349 15.7501 0.741081 16.317 1.44285 16.4502C1.57856 16.4759 3.31232 16.4901 6.33017 16.4901H11.0072L11.1342 16.332C11.204 16.2451 11.2759 16.1224 11.294 16.0594C11.3171 15.9788 11.0624 13.8097 10.4326 8.72284C9.94078 4.75069 9.51882 1.42162 9.49487 1.32489C9.38991 0.900497 8.98428 0.388711 8.59585 0.190469C8.22152 -0.000541641 8.1699 -0.00312128 4.76842 0.000826357C3.01692 0.0028588 1.50666 0.0197047 1.41226 0.0382703ZM10.9812 3.59575C10.9812 3.61936 11.3171 6.32361 11.7275 9.60515C12.2028 13.4054 12.4724 15.6889 12.4701 15.8947C12.4662 16.2343 12.373 16.5911 12.2253 16.8316C12.1825 16.9013 11.5518 17.64 10.8237 18.4732L9.49995 19.9882L13.9233 19.9981C16.7775 20.0046 18.4224 19.9941 18.5602 19.9686C19.2669 19.838 19.8378 19.266 19.9687 18.5575C19.9952 18.4142 20.005 16.0914 19.9977 11.6604C19.9856 4.33392 20.0049 4.89386 19.7487 4.45157C19.4966 4.01632 19.032 3.67858 18.5661 3.59192C18.2594 3.5349 10.9812 3.53857 10.9812 3.59575ZM6.12546 4.2373C6.42145 4.35616 6.40426 4.29499 7.05961 7.56743C7.38978 9.21606 7.6599 10.6061 7.6599 10.6563C7.6599 10.9258 7.35724 11.2135 7.07379 11.2135C6.88315 11.2135 6.65453 11.0752 6.57231 10.9101C6.53234 10.8297 6.41535 10.3375 6.31231 9.81621L6.12503 8.86839H5.29592H4.4668L4.27952 9.81621C4.17648 10.3375 4.06074 10.8273 4.02229 10.9046C3.82153 11.3083 3.21705 11.3066 3.01059 10.9019C2.96733 10.817 2.93193 10.7065 2.93193 10.6563C2.93193 10.6061 3.20205 9.21606 3.53223 7.56743C4.18418 4.31184 4.17136 4.35808 4.45582 4.23926C4.65534 4.15593 5.91919 4.15444 6.12546 4.2373ZM4.93628 6.52326L4.70191 7.69582H5.29592H5.88992L5.65556 6.52326L5.42119 5.35069H5.29592H5.17065L4.93628 6.52326ZM16.14 7.7745C16.3733 7.89356 16.4516 8.07968 16.4516 8.51506V8.86839H17.4105C18.2944 8.86839 18.3814 8.87453 18.5235 8.94707C18.6969 9.03556 18.8351 9.26073 18.8351 9.45467C18.8351 9.63126 18.6966 9.87316 18.5514 9.95016C18.4818 9.9871 18.3482 10.027 18.2545 10.0389L18.0841 10.0605L17.9579 10.4123C17.7331 11.0387 17.3114 11.7884 16.822 12.4318L16.6832 12.6143L17.007 12.8842C17.1851 13.0326 17.5078 13.2892 17.7242 13.4545C18.2512 13.8569 18.3492 14.0689 18.1703 14.4195C18.0325 14.6899 17.6839 14.8043 17.4167 14.6669C17.2772 14.5951 16.3279 13.8639 16.0715 13.6307C15.9806 13.5481 15.8889 13.4805 15.8676 13.4805C15.8463 13.4805 15.7009 13.5912 15.5444 13.7266C15.0701 14.1369 14.4858 14.5981 14.3533 14.6666C14.0866 14.8045 13.7377 14.6901 13.5997 14.4195C13.4282 14.0832 13.5226 13.8573 13.987 13.493C14.1713 13.3484 14.4853 13.091 14.6847 12.9209L15.0474 12.6117L14.9387 12.4706C14.4957 11.8954 14.061 11.1006 13.8128 10.4123L13.686 10.0605L13.5156 10.0389C13.4219 10.027 13.2882 9.9871 13.2186 9.95016C13.0734 9.87316 12.9349 9.63126 12.9349 9.45467C12.9349 9.26073 13.0731 9.03556 13.2465 8.94707C13.3884 8.87468 13.4757 8.86839 14.34 8.86839H15.2794V8.51506C15.2794 8.08664 15.358 7.89504 15.5826 7.77642C15.7712 7.67687 15.9475 7.67628 16.14 7.7745ZM14.9277 10.0819C14.9277 10.1764 15.3227 10.9502 15.5266 11.2551C15.869 11.7669 15.8536 11.7513 15.9262 11.6607C16.2347 11.2754 16.8423 10.2266 16.8423 10.0793C16.8423 10.0553 16.4846 10.041 15.885 10.041C15.2439 10.041 14.9277 10.0545 14.9277 10.0819ZM6.86193 17.7897C6.98337 18.6619 7.00217 18.7509 7.11228 18.9756C7.1764 19.1066 7.2996 19.294 7.38599 19.3922C7.55339 19.5824 7.88372 19.822 7.95347 19.8038C7.9766 19.7978 8.27528 19.485 8.61722 19.1088C8.95912 18.7326 9.39546 18.2533 9.58685 18.0437L9.9348 17.6626H8.38954H6.84427L6.86193 17.7897Z"
              fill="#0000FF"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Navigation
