import React from 'react'

export default function CatTopsPicksSingle(props) {
  return (
    <>
      <li>
        {props.catItemName}
        {/* {props.itemProgress == true ? 
                <CaretUpFilled className={Style.iconUp}/> : 
                <CaretDownFilled className={Style.iconDown}/>} */}
        <i>{props.info}</i>
      </li>
    </>
  )
}
