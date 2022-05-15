import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Button, Popconfirm, Spin, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import objectArraySearch from '../../shared/objectArraySearch'
import {
  deleteRole,
  getAllPermission,
  getAllRoles,
} from '../../stores/apis/lookup_api'
import Style from './roleTables.module.scss'

const RoleTable = (props) => {
  const {
    isLoading,
    error,
    allLookups,
    data,
    isSuccess: rolesIsSuccess,
  } = useQuery('getAllRoles', getAllRoles)
  const {
    isLoading: loadingPermissions,
    error: permissionError,
    data: permissions,
    isSuccess: permissionSuccess,
  } = useQuery('getAllPermission', () => getAllPermission())
  const [filterData, setFilterData] = useState([])
  const { addToast } = useToasts()
  const { searchKeywords } = props
  const { mutateAsync } = useMutation(deleteRole)
  const queryClient = useQueryClient()

  const handleDelete = (id) => {
    mutateAsync(id, {
      onSuccess: async () => {
        addToast('Deleted Successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        queryClient.invalidateQueries('getAllRoles')
      },
    })
  }

  const handleEditRecord = (role) => {
    props.handleEditRecord(role)
  }
  useEffect(() => {
    if (permissionSuccess && rolesIsSuccess) updateTableData(data)
  }, [permissionSuccess, rolesIsSuccess, data])

  useEffect(() => {
    let _filterArray = objectArraySearch(searchKeywords, data, 'name')
    updateTableData(_filterArray)
  }, [searchKeywords])

  const updateTableData = (filterData) => {
    let _mappedData = filterData?.length > 0 ? [...filterData] : []
    if (_mappedData?.length > 0) {
      _mappedData?.map((role) => {
        role.permissionsList = role.permissions?.map((item) => {
          return permissions?.find((permission) => permission.id === item)?.name
        })
        return role
      })
      setFilterData(_mappedData)
    }
  }

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
    },
    {
      title: 'Permissions',
      dataIndex: 'permissionsList',
      render: (permissions) => (
        <>
          {permissions?.map((permission) => {
            return (
              <>
                {permission && (
                  <Tag
                    color={'grey'}
                    key={Math.random()}
                    style={{ marginBottom: '3px' }}
                  >
                    {permission}
                  </Tag>
                )}
              </>
            )
          })}
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
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined className={Style.trashIcon} />
          </Popconfirm>
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

export default RoleTable
