import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin, Upload } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { createCandidate } from '../../stores/apis/auth_apis'
import { UpdateUserInterface } from '../../stores/interfaces/auth'
import Profile from '../../styles/profile.module.scss'

const UploadCV = (props) => {
  const { Dragger } = Upload

  // useEffect(() => {

  // } , [file]);

  const [file, setFile] = useState(false)
  const [fileName, setFileName] = useState(null)
  const { t } = useTranslation()
  const { addToast } = useToasts()
  const { mutateAsync, isLoading, isSuccess } = useMutation(createCandidate)
  // const router = useRouter();
  const createUserValues = UpdateUserInterface()

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result.substr(reader.result.indexOf(',') + 1))
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      </div>
    )

  const inner_props = {
    name: 'file',
    multiple: false,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      if (info.file.name.split('.').pop() !== 'pdf') {
        addToast('Only PDF files are allowed', {
          appearance: 'error',
          autoDismiss: true,
        })
        return false
      }

      fileToBase64(info.file.originFileObj, (err, result) => {
        if (result) {
          setFile(result)
          setFileName(info.file.name)
        }
      })

      // const { status } = info.file;

      console.log(info.file.originFileObj)

      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    // onDrop(e) {
    //   // if (e.dataTransfer.files < 1 ) {
    //   //   return
    //   // }
    //   // fileToBase64(e.dataTransfer.files[0], (err, result) => {
    //   //   if (result) {
    //   //     setFile(result)
    //   //     setFileName(e.dataTransfer.files[0])
    //   //   }
    //   // })
    // },
  }

  const resumeUpload = () => {
    console.log(createUserValues)
    if (file) {
      let resumepath = {
        resumePath: file,
      }

      let uplaodObj = {
        ...createUserValues,
        ...props.candiSavedInfo,
        ...resumepath,
      }
      let data = {
        ...createUserValues,
        ...props.candiSavedInfo,
        ...resumepath,
      }
      data.isCvAdded = true
      console.log(uplaodObj, props)
      mutateAsync(data, {
        onSuccess: async (response) => {
          if (props.hideModal) props.hideModal()
          addToast('Resume Uploaded Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          if (props.isSuccessUpdated) {
            props.isSuccessUpdated(0, 'finish')
          }
          sessionStorage.setItem('isCVAdded', true)
          // typeof window !== "undefined" && sessionStorage.setItem("jobhop_loggedin_candidate_id", response);
          props.type !== 'inDashboard'
            ? props?.onSuccessAction()
            : props.hideModal()
        },
        onError: async (error) => {
          addToast('An Error Occured', {
            appearance: 'error',
            autoDismiss: true,
          })
        },
      })
    } else {
      props.isSuccessUpdated(0, 'error')
      props?.onSuccessAction()
    }
  }

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => onSuccess('ok'))
  }

  return (
    <div className={Profile.authWrapper}>
      {props.type != 'inDashboard' && (
        <p className="title_size_text mt-3">{t('upload_cv_heading')}</p>
      )}
      <Dragger
        accept=".docx,.pdf,.doc"
        customRequest={dummyRequest}
        {...inner_props}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="19" stroke="#D9D9D9" strokeWidth="2" />
          <path
            d="M21.9053 10H13.9053C13.3748 10 12.8661 10.2107 12.4911 10.5858C12.116 10.9609 11.9053 11.4696 11.9053 12V28C11.9053 28.5304 12.116 29.0391 12.4911 29.4142C12.8661 29.7893 13.3748 30 13.9053 30H25.9053C26.4357 30 26.9444 29.7893 27.3195 29.4142C27.6946 29.0391 27.9053 28.5304 27.9053 28V16L21.9053 10Z"
            stroke="#D9D9D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.9053 10V16H27.9053"
            stroke="#D9D9D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.9053 21H15.9053"
            stroke="#D9D9D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.9053 25H15.9053"
            stroke="#D9D9D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.9053 17H16.9053H15.9053"
            stroke="#D9D9D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="ant-upload-text">{t('upload_cv_box_text')}</p>
      </Dragger>
      <div style={{ clear: 'both', overflow: 'hidden' }}>
        <Button
          type="primary"
          onClick={resumeUpload}
          loading={isLoading}
          style={{
            justifyContent: 'flex-end',
            float: 'right',
            marginTop: '30px',
          }}
          htmlType="submit"
        >
          {props.type === 'inDashboard' ? 'Upload' : t('upload_cv_button_text')}
        </Button>
      </div>
    </div>
  )
}

export default UploadCV
