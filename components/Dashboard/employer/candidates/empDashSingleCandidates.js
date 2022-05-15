import { Col } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CandidatesProfileCard from './candidatesProfileCard'

const EmpDashSingleCandidates = (props) => {
  const [language, setLanguage] = useState('en')
  let appLanguage =
    typeof window !== 'undefined' && sessionStorage.getItem('i18nextLng')
  useEffect(() => {
    setLanguage(appLanguage)
  }, [appLanguage])
  return (
    <div>
      {props.data.length > 0 ? (
        <div>
          {props.data.map((candidate) => {
            return (
              <Link
                key={Math.random()}
                href={`/applicant/${candidate.candidateID}`}
              >
                <Col>
                  <CandidatesProfileCard
                    // profilePic={candidate.Image}
                    candiid={candidate.candidateID}
                    id={candidate.fK_UserID}
                    pictureExtention={candidate.picture}
                    name={candidate.userName}
                    islinkedInUser={candidate?.islinkedInUser}
                    resumePath={candidate.resumePath}
                    // designation={candidate.Designation}
                    // college={candidate.College}
                    salary={`${candidate.expectedSalary}-${candidate.expectedSalaryMax}`}
                    experience={`${candidate?.experience || 0} years`}
                    location={
                      language === 'en'
                        ? candidate.cityName
                        : candidate.cityName_Ar
                    }
                  />
                </Col>
              </Link>
            )
          })}
        </div>
      ) : (
        <h5>Applicant not found</h5>
      )}
    </div>
  )
}

export default EmpDashSingleCandidates
