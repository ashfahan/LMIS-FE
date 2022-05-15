import React from 'react'
import Style from './candidatesComponents.module.scss'

const TopFiveCandidatesCard = (props) => {
  return (
    <div className={Style.topFiveCandidatesCard}>
      <h4>{props.cardTitle}</h4>
      <p>{props.cardText}</p>
      <ul>
        <li>
          <img src="https://picsum.photos/id/10/40" />
          <a href="">{props.nameOne}</a>
        </li>
        <li>
          <img src="https://picsum.photos/id/1003/40" />
          <a href="">{props.nameTwo}</a>
        </li>
        <li>
          <img src="https://picsum.photos/id/1006/40" />
          <a href="">{props.nameThree}</a>
        </li>
        <li>
          <img src="https://picsum.photos/id/1049/40" />
          <a href="">{props.nameFour}</a>
        </li>
        <li>
          <img src="https://picsum.photos/id/1074/40" />
          <a href="">{props.nameFive}</a>
        </li>
      </ul>
    </div>
  )
}

export default TopFiveCandidatesCard
