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
import { DeleteCompany, getAllCompanies } from '../../stores/apis/lookup_api'
import Style from './lookupTables.module.scss'

const CompanyTable = (props) => {
  const { isLoading, error, allLookups, data } = useQuery(
    'getAllCompanies',
    getAllCompanies,
  )
  const [filterData, setFilterData] = useState([])
  const [isDeleteCategory, setIsDeleteCategory] = useState(true)
  const [isEditCategory, setIsEditCategory] = useState(true)
  const { addToast } = useToasts()
  const { searchKeywords } = props
  const { mutateAsync } = useMutation(DeleteCompany)
  const queryClient = useQueryClient()
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])

  const handleDelete = (key) => {
    mutateAsync(
      { CompanyId: key },
      {
        onSuccess: async () => {
          addToast('Deleted Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          queryClient.invalidateQueries('getAllCompanies')
        },
      },
    )
  }

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
    updateTableData(data)
  }, [data])

  useEffect(() => {
    let _filterArray = objectArraySearch(searchKeywords, data, 'companyName')
    updateTableData(_filterArray)
  }, [searchKeywords])

  const updateTableData = (filterData) => {
    setFilterData(filterData)
  }
  const handleEditRecord = (company) => {
    props.handleEditRecord(company)
  }

  const columns = [
    {
      title: 'Company',
      dataIndex: `${language === 'en' ? 'companyName' : 'companyName_Ar'}`,
    },
    {
      title: 'Company Size',
      dataIndex: 'companySize',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Phone No',
      dataIndex: 'phoneNo',
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
                onConfirm={() => handleDelete(record.companyId)}
              >
                <DeleteOutlined className={Style.trashIcon} />
              </Popconfirm>
            )}
          </div>
        </>
      ),
    },
  ]

  // const handleAdd = () => {
  //   // const { count, dataSource } = this.state;

  //   const newData = {
  //     key: '4',
  //     company: 'Jumpshare',
  //     companySize: '1K-10K',
  //     industry: 'Technology',
  //     type: 'Privately Held',
  //     phoneNo: '+1 012 345 6789',
  //   };

  //   setData([...data, newData]);

  // };
  return (
    <div className={Style.companyTable}>
      {/* 
<Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button> */}
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

export default CompanyTable
