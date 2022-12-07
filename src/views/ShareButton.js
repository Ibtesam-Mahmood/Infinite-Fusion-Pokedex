import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

export default function ShareButton({url, disabled}) {
  
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [url])
  

  function copyURL() {
    navigator.clipboard.writeText(url);
    setCopied(true);
  }

  return (
    <button 
      disabled={disabled} 
      onClick={copyURL}
      type="button" className={`btn btn${copied ? '-outline' : ''}-primary btn-sm my-auto mx-3`}
    >
      <div>
        { copied ? 
          <p className='m-0 p-0'>Copied!</p>
          : <FontAwesomeIcon icon={faShare} />
        }
      </div>
    </button>
  )
}
