export const getAllCompanies = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Common/GetAllCompany`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}
export const getallAssignedRoles = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Users/GetAssignedRoles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const getAllRoles = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/RoleManagement/GetRoles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })

  if (!response.ok) {
    throw response.json().message
  }

  return response.json()
}
export const getLookups = async (lkpid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/LKP/GetAllLookUpValues_ByFK_LookUpId?FK_LookUpId=${lkpid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}
export const getAllPermission = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/RoleManagement/GetPermissions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}
export const getJobByCity = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Dashboard/GetAllActiveJobsByCity`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })


  
  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const getJobByIndustry = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Dashboard/GetAllActiveJobsByIndustry`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const getJobByCompany = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Dashboard/GetAllActiveJobsByCompany`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const PostLookupValue = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/LKP/SaveLKPValues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const PostCompanyValue = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Common/AddUpdateCompany`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}
export const addUpdateUserRoles = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/RoleManagement/AddUpdateUserRoles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const deleteRole = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/RoleManagement/DeleteRole?Id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const assignRole = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Users/AssignRole?userId=${data.userId}&roleId=${data.roleId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}
export const DeleteCompany = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Common/DeleteCompany?CompanyId=${data.CompanyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const DeleteLookup = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/LKP/DeleteLKPValues?LookUpValueId=${data.lookUpValueId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}
