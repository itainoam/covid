import React from 'react'

const Counter = ({ name, total, changeWeek, changeDay }) => {
  return (<div className="Counter">
    <div className="Counter__name">{name}</div>
    <div className="Counter__total">{total}</div>
    <div className="Counter__change-day" style={changeDay === undefined ? {visibility:'hidden'} : {}}>{changeDay || 0}+ מאתמול </div>
  </div>)
}


export default Counter