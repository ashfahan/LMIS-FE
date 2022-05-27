import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Empty, Popconfirm, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilState } from 'recoil'
import { addEducationApi } from '../../stores/apis/auth_apis'
import { deleteCandidateEducation, getCandidatesEducation } from '../../stores/apis/candidates_api'
// import {GetCurrentCandidateId} from '../../stores/atoms/app_config_atom';
import { Education_to_Edit_atom } from '../../stores/atoms/profile_atom'

const Educationadded = (props) => {
  // const candidates_id = useRecoilValue(GetCurrentCandidateId);
  const queryClient = useQueryClient()
  const [educationEdit, setEducationEdit] = useRecoilState(Education_to_Edit_atom)
  const { addToast } = useToasts()
  const { mutateAsync: updateEducationMutateAsync } = useMutation(addEducationApi)
  const { mutateAsync } = useMutation(deleteCandidateEducation)
  const { isLoading, error, data } = useQuery(
    'getCandidatesEducation',
    () =>
      getCandidatesEducation(props.candiID ? props.candiID : sessionStorage.getItem('jobhop_loggedin_candidate_id')),
    {},
  )

  const [language, setLanguage] = useState('en')
  let appLanguage = typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  const openEditModal = (record) => {
    props.openEditModal(record)
    setEducationEdit(record)
  }
  const updateData = async (record) => {
    record.FK_UserId = parseInt(sessionStorage.getItem('jobhop_loggedin_user_id'))
    await updateEducationMutateAsync(record, {
      onSuccess: async () => {},
    })
  }

  if (isLoading && props.type !== 'inProcessProfile')
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    )
  if (error && props.type !== 'inProcessProfile') return 'An error has occurred: ' + error.message

  const confirm = async (record) => {
    let _data = record
    if (data.length > 1) {
      _data.isEducationAdded = true
    } else {
      _data.isEducationAdded = false
    }
    await updateData(_data)
    sessionStorage.setItem('isEducationAdded', _data.isEducationAdded)

    mutateAsync(
      { id: record.educationalRecordsID },
      {
        onSuccess: async () => {
          addToast('Deleted Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          queryClient.invalidateQueries('getCandidatesEducation')
          if (data.length === 1) {
            if (props.isIncomplete) props.isIncomplete()
          }
        },
      },
    )
  }

  const cancel = () => {
    console.log('canceled')
  }

  const date_options = { year: 'numeric', month: 'short' }

  return (
    <div className="recordAddition">
      {data && data.length >= 1 && props.type == 'inProcessProfile' && <h3>Education</h3>}
      <ul>
        {data && data.length >= 1
          ? data.map((exp) => (
              <li key={exp.educationalRecordsID} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p className="fontSm">
                    {language === 'en' ? exp.instituteName : exp.instituteName_Ar} -{' '}
                    {language === 'en' ? exp.degreeName : exp.degreeName_Ar}
                  </p>
                  <p className="fontSm">
                    {new Date(exp.startDate).toLocaleDateString('en-US', date_options)} -{' '}
                    {new Date(exp.endDate).toLocaleDateString('en-US', date_options)}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gridGap: '5px',
                  }}
                >
                  {props.type !== 'inStatusChangeView' && (
                    <span>
                      {props.type !== 'inProcessProfile' && <EditOutlined onClick={() => openEditModal(exp)} />}
                      <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => confirm(exp)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </span>
                  )}
                </div>
              </li>
            ))
          : props.type !== 'inProcessProfile' && <Empty description={`No Education found`} />}
      </ul>
    </div>
  )
}

export default Educationadded
