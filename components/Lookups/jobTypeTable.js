import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Button, Popconfirm, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import objectArraySearch from '../../shared/objectArraySearch'
import { permissionsEnum } from '../../shared/permissionsEnum'
import { DeleteLookup, getLookups } from '../../stores/apis/lookup_api'
import Style from './lookupTables.module.scss'

const JobTypeTable = (props) => {
  const { searchKeywords } = props
  const { isLoading, error, data } = useQuery('getLookups', () =>
    getLookups(19),
  )
  const [filterData, setFilterData] = useState([])
  const [isDeleteCategory, setIsDeleteCategory] = useState(true)
  const [isEditCategory, setIsEditCategory] = useState(true)
  const { addToast } = useToasts()
  const { mutateAsync } = useMutation(DeleteLookup)
  const queryClient = useQueryClient()
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  useEffect(() => {
    updateTableData(data)
  }, [data])

  useEffect(() => {
    let _permissions = JSON.parse(sessionStorage.getItem('permissions')) || []
    setIsDeleteCategory(
      _permissions.some((item) => item === permissionsEnum.deleteCategory),
    )
    setIsEditCategory(
      _permissions.some((item) => item === permissionsEnum.editCategory),
    )
  }, [])

  useEffect(() => {
    let _filterArray = objectArraySearch(searchKeywords, data, 'lookUpValue')
    updateTableData(_filterArray)
  }, [searchKeywords])

  const updateTableData = (filterData) => {
    setFilterData(filterData)
  }

  const handleDelete = (key) => {
    mutateAsync(
      { lookUpValueId: key },
      {
        onSuccess: async () => {
          addToast('Deleted Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          queryClient.invalidateQueries('getLookups')
        },
      },
    )
  }
  const handleEditRecord = (lookupData) => {
    props.handleEditRecord(lookupData)
  }

  const columns = [
    {
      title: 'Job Types',
      dataIndex: `${language === 'en' ? 'lookUpValue' : 'lookUpValue_Ar'}`,
    },
    {
      title: '',
      dataIndex: '',
      width: 60,
      render: (record) => (
        <>
          <div className={Style.actionContaienr}>
            {isEditCategory && (
              <Button
                className={Style.editButton}
                onClick={() => handleEditRecord(record)}
              >
                <EditOutlined />
              </Button>
            )}
            {isDeleteCategory && (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.lookUpValueId)}
              >
                <DeleteOutlined className={Style.trashIcon} />
              </Popconfirm>
            )}
          </div>
        </>
      ),
    },
  ]

  return (
    <div className={Style.jobTypeTable}>
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

export default JobTypeTable
