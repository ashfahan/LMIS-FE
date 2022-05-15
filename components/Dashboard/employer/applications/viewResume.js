import Educationadded from '../../../Profile/EducationAdded'
import ExperienceAdded from '../../../Profile/ExperienceAdded'
import Style from './applications.module.scss'

const ViewResume = ({ candiID }) => {
  // const {isLoading, error, data} = useQuery("getCandidatesEducation", () => getCandidatesEducation(candiID));

  return (
    <div className={Style.viewResume}>
      <h3>Profile</h3>
      {/* <div className={Style.dummyText}>
                <p>Graphic designer with +8 years of experience in branding and print design. Skilled at Adobe Creative Suite (Photoshop, Illustrator, InDesign) as well as sketching and hand drawing. Supervised 23 print design projects that resulted in an increase of 32% in savings.</p>
            </div> */}
      <h3>Employment</h3>
      <ExperienceAdded type="inStatusChangeView" candiID={candiID} />
      <h3>Education</h3>
      <Educationadded type="inStatusChangeView" candiID={candiID} />
      {/* {data && data.map((item) => {
                return <div key={Math.random()} className={Style.dummyText}>
                <h4>item.</h4>
                <p>Successfully translated subject matter into concrete design for newsletters, promotional materials and sales collateral. Created design theme and graphics for marketing and sales presentations, training videos and corporate websites.</p>
            </div>
            })} */}
    </div>
  )
}

export default ViewResume
