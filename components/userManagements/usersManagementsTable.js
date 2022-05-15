import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import objectArraySearch from '../../shared/objectArraySearch'
import { assignRole, getallAssignedRoles } from '../../stores/apis/lookup_api'
import Style from './userManagement.module.scss'

const UsersManagementsTable = (props) => {
  const { isLoading, error, allLookups, data } = useQuery(
    'getAssignRole',
    getallAssignedRoles,
  )
  const [filterData, setFilterData] = useState([])
  const { addToast } = useToasts()
  const { searchKeywords } = props
  const { mutateAsync } = useMutation(assignRole)
  const queryClient = useQueryClient()

  const handleDelete = (record) => {
    record.roleId = 0
    mutateAsync(record, {
      onSuccess: async () => {
        addToast('Deleted Successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        queryClient.invalidateQueries('getAssignRole')
      },
    })
  }
  useEffect(() => {
    updateTableData(data)
  }, [data])

  useEffect(() => {
    let _filterArray = objectArraySearch(searchKeywords, data, 'role')
    updateTableData(_filterArray)
  }, [searchKeywords])

  const updateTableData = (filterData) => {
    setFilterData(filterData)
  }
  const handleEditRecord = (assignRole) => {
    props.handleEditRecord(assignRole)
  }

  const columns = [
    {
      title: 'User Name',
      dataIndex: `userName`,
    },
    {
      title: 'Role Name',
      dataIndex: 'role',
      render: (role, record) => (
        <>
          {!role ? (
            <>
              <span style={{ fontStyle: 'italic', marginRight: '10px' }}>
                No Role{' '}
              </span>
              <Button
                size="default"
                onClick={() => handleEditRecord(record)}
                style={{ marginRight: '5px' }}
                className={Style.btn}
                icon={<PlusOutlined className={Style.icon} />}
              >
                {' '}
                Assign Role
              </Button>
            </>
          ) : (
            <>
              <span style={{ marginRight: '10px' }}>{role} </span>
              <Button
                size="default"
                onClick={() => handleDelete(record)}
                style={{ marginRight: '5px' }}
                className={Style.btn}
                type="danger"
                icon={<DeleteOutlined className={Style.trashIcon} />}
              >
                {' '}
                Revoke Access
              </Button>
            </>
          )}
        </>
      ),
    },
    {
      title: '',
      dataIndex: '',
      width: 60,
      render: (record) => (
        <div className={Style.actionContaienr}>
          <Button
            className={Style.editButton}
            onClick={() => handleEditRecord(record)}
          >
            <EditOutlined />
          </Button>
          {/* <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record)}
          >
            <DeleteOutlined className={Style.trashIcon} />
          </Popconfirm> */}
        </div>
      ),
    },
  ]

  return (
    <div className={Style.companyTable}>
      {!isLoading ? (
        <Table
          className={Style.tableStyles}
          pagination={false}
          columns={columns}
          dataSource={filterData}
          size="middle"
        />
      ) : (
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
      )}
    </div>
  )
}

export default UsersManagementsTable
