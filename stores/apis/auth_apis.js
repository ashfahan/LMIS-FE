export const createUser = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/security/CreateApplicationUser`, {
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
    let _result = await response.json().catch((e) => {
      throw 'Error'
    })
    throw _result?.message
  }

  return response.json()
}

export const createCandidate = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Candidates/AddUpdateCandidate`, {
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
    throw 'Something went wrong'
  }

  return response.json()
}

export const signInUsre = async (data) => {
  console.log('here stsart')
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Security/LoginUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    console.log('here', user, resp)

    if (!response.ok) {
      throw 'Error'
    }
    console.log('here', user, resp)

    const resp = await response.json()

    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Users/GetUserByToken`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resp.token}`,
      },
    })

    localStorage.setItem('auth', JSON.stringify(resp))
    return user
  } catch (err) {
    throw 'Error'
  }
}
export const linkedInLogin = async (data) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Security/SocialLogin`, {
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
  } catch (err) {
    throw 'Error'
  }
}
export const forgotPassword = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Users/ForgotPassword`, {
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

export const newPassword = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Security/ChangePassword`, {
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

export const addEducationApi = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Candidates/AddUpdateEducationalRecords`, {
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

export const addExperienceApi = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Candidates/AddUpdateCandidatesEmplopymentDetail`, {
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
