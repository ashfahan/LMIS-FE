import React from 'react'
import AuthLayout from '../components/Auth/authLayout'
import ShowSuccess from '../components/Auth/steps/showSuccess'

const Success = () => {
  return (
    <div>
      <AuthLayout step={1}>
        <ShowSuccess
          title="Email Varified!"
          desc="Let's continue to setting up your profile."
          btnText="Set up profile"
          btnLink="/profile"
        />
      </AuthLayout>
    </div>
  )
}

export default Success
