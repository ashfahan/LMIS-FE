import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Empty, Popconfirm, Spin } from 'antd'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
// import {GetCurrentCandidateId} from '../../stores/atoms/app_config_atom';
import { useRecoilState } from 'recoil'
import { addEducationApi } from '../../stores/apis/auth_apis'
import {
  deleteCandidateExperience,
  getCandidatesExperience,
} from '../../stores/apis/candidates_api'
import { Experience_to_Edit_atom } from '../../stores/atoms/profile_atom'

const ExperienceAdded = (props) => {
  // const candidates_id = useRecoilValue(GetCurrentCandidateId);
  const queryClient = useQueryClient()
  const [exprienceEdit, setExperienceEdit] = useRecoilState(
    Experience_to_Edit_atom,
  )
  const { addToast } = useToasts()
  const { mutateAsync: updateEducationMutateAsync } =
    useMutation(addEducationApi)

  const { mutateAsync } = useMutation(deleteCandidateExperience)
  const { isLoading, error, data } = useQuery('getCandidatesExperience', () =>
    getCandidatesExperience(
      props.candiID
        ? props.candiID
        : sessionStorage.getItem('jobhop_loggedin_candidate_id'),
    ),
  )

  const updateData = async (record) => {
    record.FK_UserId = parseInt(
      sessionStorage.getItem('jobhop_loggedin_user_id'),
    )
    await updateEducationMutateAsync(record, {
      onSuccess: async () => {},
    })
  }

  const openEditModalInline = (record) => {
    props.openEditModal(record)
    setExperienceEdit(record)
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
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      </div>
    )
  if (error && props.type !== 'inProcessProfile')
    return 'An error has occurred: ' + error.message

  const confirm = async (record) => {
    let _data = record
    if (data.length > 1) {
      _data.isExperienceAdded = true
    } else {
      _data.isExperienceAdded = false
    }
    await updateData(_data)
    sessionStorage.setItem('isExperienceAdded', _data.isExperienceAdded)
    mutateAsync(
      { id: record.candidatesEmplopymentDetailID },
      {
        onSuccess: async () => {
          addToast('Deleted Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          queryClient.invalidateQueries('getCandidatesExperience')
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
      {data && data.length >= 1 && props.type == 'inProcessProfile' && (
        <h3>Expereince</h3>
      )}
      <ul>
        {data && data.length >= 1
          ? data.map((exp) => (
              <li
                key={exp.candidatesEmplopymentDetailID}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div className="fontSm">
                  <p>
                    {exp.designation} - {exp.companyName} - {exp.location}
                  </p>
                  <p>
                    {new Date(exp.startDate).toLocaleDateString(
                      'en-US',
                      date_options,
                    )}{' '}
                    -{' '}
                    {exp.isCurrntlyWorking
                      ? 'Continue'
                      : new Date(exp.endDate).toLocaleDateString(
                          'en-US',
                          date_options,
                        )}
                  </p>
                  <p>{exp.description}</p>
                </div>
                <div>
                  {props.type !== 'inStatusChangeView' && (
                    <span>
                      {props.type !== 'inProcessProfile' && (
                        <EditOutlined
                          onClick={() => openEditModalInline(exp)}
                        />
                      )}
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
          : props.type !== 'inProcessProfile' && (
              <Empty description={`No Experience found`} />
            )}
      </ul>
    </div>
  )
}

export default ExperienceAdded
