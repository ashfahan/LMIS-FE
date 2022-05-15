import Style from './applications.module.scss'

const RecentlyApplied = () => {
  return (
    <div className={Style.recentlyApplied}>
      <div className={Style.cardHeader}>
        <h4>Recently Applied</h4>
        <p>This canditate has previously applied for the following jobs</p>
      </div>
      <ul>
        <li>
          <h4>Sales Analyst</h4>
          <p>
            IBM<span></span>Chicago, IL<span></span>Full-Time
          </p>
        </li>
        <li>
          <h4>Sales Engineer</h4>
          <p>
            Google<span></span>Chicago, IL<span></span>Full-Time
          </p>
        </li>
        <li>
          <h4>Junior Sales Analyst</h4>
          <p>
            Apple<span></span>Chicago, IL<span></span>Full-Time
          </p>
        </li>
      </ul>
    </div>
  )
}

export default RecentlyApplied
