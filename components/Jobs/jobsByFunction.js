import { Col, Empty, Row } from 'antd'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import JobCardSingle from './jobCardSingle'

const JobsByFunction = ({ jobs, title }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const handleClick = (id) => {
    let _url = `/jobs`
    if (title === 'industry') {
      _url += `?industry=${id}`
    } else if (title === 'city') {
      _url += `?location=${id}`
    } else if (title === 'company') {
      _url += `?company=${id}`
    }
    router.push(_url)
  }

  return (
    <>
      <Row>
        {jobs?.length > 0 ? (
          jobs.map((single) => {
            return (
              <Col
                key={Math.random()}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 24 }}
                style={{ padding: '0px 30px 0 0' }}
              >
                <JobCardSingle
                  key={Math.random}
                  title={single?.title}
                  company={single?.count}
                  location={single?.cityName}
                  handleClick={() => handleClick(single?.id)}
                  heartIcon={true}
                />
              </Col>
            )
          })
        ) : (
          <Empty description={t('data_not_found')} />
        )}
      </Row>
    </>
  )
}

export default JobsByFunction
