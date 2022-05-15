import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm } from 'antd'
import React from 'react'
import { useMutation } from 'react-query'
import { deleteCandidateEducation } from '../../stores/apis/candidates_api'

const SingleRecordViewProfile = (props) => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    deleteCandidateEducation,
  )
  const confirm = (id) => {
    mutateAsync(
      { id },
      {
        onSuccess: async () => {
          addToast('Deleted Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          props.onSuccessAction()
        },
      },
    )
  }

  const cancel = () => {
    console.log('canceled')
  }

  const date_options = { year: 'numeric', month: 'short' }

  return (
    <li>
      <p>
        {props.topValue1} - {props.topValue2}
      </p>
      <p>
        {new Date(props.startDate).toLocaleDateString('en-US', date_options)} -{' '}
        {new Date(props.endDate).toLocaleDateString('en-US', date_options)}
      </p>
      <span style={{ position: 'absolute', right: '0', top: '48px' }}>
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => confirm(props.id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      </span>
    </li>
  )
}

export default SingleRecordViewProfile
