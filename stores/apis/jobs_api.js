export const getJobs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Job/GetAllJobVacancy`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const getJobsByFilter = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Dashboard/GetJobsByFilters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}
export const getLookupTableValue = async (typeID) => {
  let _language = sessionStorage.getItem('i18nextLng')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/LKP/GetAllLookUpValues_ByFK_LookUpId?FK_LookUpId=${typeID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(JSON.parse(localStorage.getItem('auth'))?.token && {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
        }),
      },
      body: JSON.stringify(data),
    },
  )

  if (!response.ok) {
    throw 'Error'
  }
  return response.json()
}

export const getDraftJobs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Job/GetAllJobVacancy_Draft`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const getSingleJobs = async (jobid) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Job/GetJobVacancy_byID?JobVacancyId=${jobid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const getSingleJobsDraft = async (jobid) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Job/GetJobVacancyDraft_byID?JobVacancyId=${jobid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const getOverView = async (url) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const PostJob_api = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Job/SaveJobVacancy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const SavePreferences = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Job/SaveJobPrefrances`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}

export const GetPreferences = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Job/GetJobPrefrances_byID?JobPrefrancesID=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const applyToAJob = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Job/SaveJobApplications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const getApplicantsByJobID = async (jobid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Job/getAllApplicationByFk_JobVacancyID?Fk_JobVacancyID=${jobid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(JSON.parse(localStorage.getItem('auth'))?.token && {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
        }),
      },
    },
  )

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const getAllFilters = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Dashboard/GetFilters`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(JSON.parse(localStorage.getItem('auth'))?.token && {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token}`,
      }),
    },
  })

  if (!response.ok) {
    throw 'Error'
  }

  return response.json()
}
