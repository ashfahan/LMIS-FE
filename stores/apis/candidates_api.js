export const getCandidates = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Candidates/GetAllCandidates`, {
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

export const getSingleCandidate = async (candidateId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Candidates/GetCandidate_byID?CandidateID=${candidateId}`,
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

export const getSingleUser = async (candidateId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Users/GetApplicationUser?UserId=${candidateId}`, {
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

export const getSingleJobPreferences = async (candidateId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Job/GetJobPrefrances_byCandidateID?CandidateID=${candidateId}`,
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

export const getCandidatesEducation = async (cadndiid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Candidates/GetEducationalRecords_byCandidateID?FK_CandidateID=${cadndiid}`,
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

export const getCandidatesExperience = async (cadndiid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Candidates/GetCandidatesEmplopymentDetail_byCandidateID?FK_CandidateID=${cadndiid}`,
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

export const deleteCandidateEducation = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Candidates/DeleteEducationalRecords?EducationalRecordsID=${data.id}`,
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

export const deleteCandidateExperience = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Candidates/DeleteCandidatesEmployementDetatil?CandidatesEmplopymentDetailID=${data.id}`,
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

export const getCandidateShortlistedJobs = async (candidateID) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Job/getAllShortlisted_JobApplications_ByCandidateID?Fk_CandidateID=${candidateID}`,
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

export const getCandidateApprovedJobs = async (candidateID) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Job/getAllFinalize_JobApplicationsbyFk_CandidateID?Fk_CandidateID=${candidateID}`,
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

export const getCandidateRejectedJobs = async (candidateID) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Job/getAllRejected_JobApplicationsbyFk_CandidateID?Fk_CandidateID=${candidateID}`,
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

export const getApplicationsApplied = async (candidateID) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Job/getAllJobsByCandidateID?Fk_CandidateID=${candidateID}`,
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
