import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { linkedInLogin } from '../../../stores/apis/auth_apis'
import styles from '../../../styles/auth.module.scss'
import SignupFields from './signupFields'

const SignupSplash = ({ signupMethod }) => {
  const { t } = useTranslation()
  const { addToast } = useToasts()

  const { mutateAsync: linkedInMutateAsync, isLoading: linkedInLoading } =
    useMutation(linkedInLogin)
  const handleLinkedInLogin = () => {
    linkedInMutateAsync('', {
      onSuccess: async (response) => {
        window.location.href = response.reidrecturl
      },
      onError: async (error) => {
        addToast('Something went wrong.', {
          appearance: 'error',
          autoDismiss: true,
        })
      },
    })
  }
  return (
    <div
      className={[styles.auth_fields_wrapper, styles.signup_splash].join(' ')}
    >
      <SignupFields formTitle={t('signup_top_heading')} />

      <span className={styles.spacer_or}>Or</span>

      <a onClick={handleLinkedInLogin}>
        <>
          <a className="btn_auth_signup">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.829 0H2.17099C0.972 0 0 0.972 0 2.17099V21.8289C0 23.028 0.972 24 2.17099 24H21.8289C23.028 24 24 23.028 24 21.8289V2.17099C24 0.972 23.028 0 21.829 0ZM7.42662 20.7232C7.42662 21.0721 7.14377 21.355 6.79483 21.355H4.10544C3.7565 21.355 3.47365 21.0721 3.47365 20.7232V9.4494C3.47365 9.10046 3.7565 8.81761 4.10544 8.81761H6.79483C7.14377 8.81761 7.42662 9.10046 7.42662 9.4494V20.7232ZM5.45014 7.75489C4.0391 7.75489 2.8952 6.61099 2.8952 5.19996C2.8952 3.78892 4.0391 2.64503 5.45014 2.64503C6.86117 2.64503 8.00507 3.78892 8.00507 5.19996C8.00507 6.61099 6.86124 7.75489 5.45014 7.75489ZM21.4813 20.7741C21.4813 21.0949 21.2212 21.355 20.9004 21.355H18.0145C17.6937 21.355 17.4335 21.0949 17.4335 20.7741V15.486C17.4335 14.6972 17.6649 12.0292 15.372 12.0292C13.5934 12.0292 13.2327 13.8553 13.1602 14.6749V20.7741C13.1602 21.0949 12.9002 21.355 12.5793 21.355H9.78817C9.46737 21.355 9.20727 21.0949 9.20727 20.7741V9.39851C9.20727 9.07772 9.46737 8.81761 9.78817 8.81761H12.5793C12.9001 8.81761 13.1602 9.07772 13.1602 9.39851V10.3821C13.8197 9.39236 14.7998 8.62844 16.8866 8.62844C21.5077 8.62844 21.4813 12.9457 21.4813 15.3178V20.7741Z"
                fill="#0077B7"
              />
            </svg>
            <p>
              {linkedInLoading ? (
                <Spin
                  size="small"
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                t('signup_with_linkedin')
              )}
            </p>
          </a>
        </>
      </a>
      {/* <a href="#" className="btn_auth_signup">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              d="M5.31891 14.5035L4.4835 17.6222L1.43011 17.6868C0.517594 15.9943 0 14.0578 0 12C0 10.0101 0.483938 8.13362 1.34175 6.48132H1.34241L4.06078 6.9797L5.25159 9.68176C5.00236 10.4084 4.86652 11.1884 4.86652 12C4.86661 12.8809 5.02617 13.7249 5.31891 14.5035Z"
              fill="#FBBB00"
            />
            <path
              d="M23.7902 9.75824C23.928 10.4841 23.9999 11.2338 23.9999 12C23.9999 12.8591 23.9095 13.6971 23.7375 14.5055C23.1533 17.2563 21.6269 19.6582 19.5124 21.358L19.5118 21.3574L16.0878 21.1827L15.6032 18.1576C17.0063 17.3347 18.1028 16.047 18.6804 14.5055H12.2637V9.75824H18.774H23.7902Z"
              fill="#518EF8"
            />
            <path
              d="M19.5124 21.3574L19.5131 21.358C17.4566 23.011 14.8443 24 12.0006 24C7.43066 24 3.45749 21.4457 1.43066 17.6868L5.31946 14.5035C6.33285 17.2081 8.94187 19.1334 12.0006 19.1334C13.3153 19.1334 14.5469 18.778 15.6038 18.1576L19.5124 21.3574Z"
              fill="#28B446"
            />
            <path
              d="M19.6596 2.76263L15.7721 5.94525C14.6783 5.26153 13.3853 4.86656 12 4.86656C8.87213 4.86656 6.21431 6.88017 5.25169 9.68175L1.34245 6.48131H1.3418C3.33895 2.63077 7.36223 0 12 0C14.9117 0 17.5814 1.03716 19.6596 2.76263Z"
              fill="#F14336"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p>{t("signup_with_google")}</p>
      </a> */}

      {/* 
            <a href="#" className="btn_auth_signup" onClick={() => signupMethod('email')}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{top: '6px'}}>
                    <path d="M4.33366 4.33331H21.667C22.8587 4.33331 23.8337 5.30831 23.8337 6.49998V19.5C23.8337 20.6916 22.8587 21.6666 21.667 21.6666H4.33366C3.14199 21.6666 2.16699 20.6916 2.16699 19.5V6.49998C2.16699 5.30831 3.14199 4.33331 4.33366 4.33331Z" stroke="#FFAD3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.8337 6.5L13.0003 14.0833L2.16699 6.5" stroke="#FFAD3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <p>Sign up with Email</p>
            </a> */}
    </div>
  )
}

export default SignupSplash
