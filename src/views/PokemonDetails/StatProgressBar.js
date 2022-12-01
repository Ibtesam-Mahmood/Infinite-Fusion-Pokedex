import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function StatProgressBar({title, value = 0, max = 255, color}) {
  
  const percent = (value / max) * 100;

  return (
    <div className='statProgressBar row mb-1'>
      {/* <div className='statTitle col col-3 text-end'>
        <h6 className='m-0 p-0'></h6>
      </div> */}
      <div className='col'>
        <small className='m-0 p-0 py-1 d-flex'><strong>{title}</strong> . {value}</small>
        <ProgressBar striped variant={color ?? "success"} now={percent} />
        {/* <div className='statValue col col-1 text-end'> */}
        {/* </div> */}
      </div>
    </div>
  )
}
