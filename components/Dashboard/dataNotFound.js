import Link from 'next/link'
import React from 'react'

const DataNotFound = (props) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexBasis: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flexBasis: '100%',
            textAlign: 'center',
            padding: '40px 0px 60px',
          }}
        >
          <h3 style={{ fontSize: '14px', fontWeight: '500' }}>{props.title}</h3>
          {props.linktext && (
            <Link href="/candidate/profile">{props.linktext}</Link>
          )}
        </div>
      </div>
    </>
  )
}

export default DataNotFound
