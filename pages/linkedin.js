import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { useRecoilState } from 'recoil'
import { signInUsre } from '../stores/apis/auth_apis'
import { isLoggedIn, userTypeAtom } from '../stores/atoms/app_config_atom'
const LinkedIn = () => {
  const { addToast } = useToasts()
  const [signin, setSignin] = useRecoilState(isLoggedIn)
  const [userT, setUserT] = useRecoilState(userTypeAtom)
  const { mutateAsync, isLoading, isSuccess } = useMutation(signInUsre)
  const router = useRouter()
  const { distcode } = router.query
  useEffect(() => {
    if (distcode) {
      handleLogin()
    }
  }, [distcode])
  const handleLogin = () => {
    let values = {}
    values.userType = 0
    values.isLinkedIn = true
    values.resetToken = distcode
    mutateAsync(values, {
      onSuccess: async (response) => {
        if (response.userId !== 0) {
          addToast('Logged in Successfully', {
            appearance: 'success',
            autoDismiss: true,
          })
          typeof window !== 'undefined' &&
            sessionStorage.setItem(
              'jobhop_loggedin_user',
              JSON.stringify(response),
            )
          typeof window !== 'undefined' &&
            sessionStorage.setItem(
              'jobhop_loggedin_candidate_id',
              response.candidateID,
            )
          typeof window !== 'undefined' &&
            sessionStorage.setItem(
              'jobhop_loggedin_user_type',
              response.userType,
            )
          typeof window !== 'undefined' &&
            sessionStorage.setItem(
              'jobhop_loggedin_user_type',
              response.userType,
            )
          typeof window !== 'undefined' &&
            sessionStorage.setItem('jobhop_loggedin_user_id', response.userId)
          setUserT(response.userType)
          setTimeout(() => {
            router.push('/dashboard')
          }, 500)
          setSignin(true)
        } else {
          addToast('User not found or Email or password does not match.', {
            appearance: 'error',
            autoDismiss: true,
          })
        }
      },
      onError: async (error) => {
        addToast('Something went wrong.', {
          appearance: 'error',
          autoDismiss: true,
        })
      },
    })
  }
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
          }}
        >
          <Spin size="large" />
        </div>
      ) : null}
    </>
  )
}
export default LinkedIn
