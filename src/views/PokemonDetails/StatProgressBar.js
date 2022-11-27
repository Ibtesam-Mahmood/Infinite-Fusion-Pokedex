import React from 'react'

export default function StatProgressBar({title, value = 0, max = 255, color}) {
  
  const percent = (value / max) * 100;

  return (
    <div>{value} {title}</div>
  )
}
