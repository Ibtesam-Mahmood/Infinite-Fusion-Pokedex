import React, {useEffect, useState, useRef} from 'react';
import { Toast } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'

import '../styles/Toasty.scss';

export default function ToastyWrapper({children}) {

  const navigate = useNavigate();

  const pokemonIDs = useSelector(state => state.pokemonInfo.map(p => p.getID()));

  const loaded = pokemonIDs.length > 400;

  var [toast, setToast] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    console.log('runninggggggg');
      var myToast = toastRef.current
      var bsToast = Toast.getInstance(myToast)
      
      if (!bsToast) {
          // initialize Toast
          bsToast = new Toast(myToast, {autohide: false})
          // hide after init
          bsToast.hide()
          // setToast(false)
      }
      else {
          // toggle
          toast ? bsToast.show() : bsToast.hide()
      }
  })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setToast(true);
    }, 10000);
    
    return () => clearTimeout(delayDebounceFn);
  }, [loaded])

  function randomFusionUrl() {
    const randomID1 = pokemonIDs[Math.floor(Math.random() * pokemonIDs.length)];
    const randomID2 = pokemonIDs[Math.floor(Math.random() * pokemonIDs.length)];
    navigate(`/poke-fusion-dex/fuse?idOne=${randomID1}&idTwo=${randomID2}&fuse=true`);
  }

  return (
    <div>
        {children}
        <div className='toastyWrapper px-5'>
          <div className="toast" role="alert" ref={toastRef}>
            <div className="toast-header d-flex justify-content-between">
                <strong className="mr-auto">Hey! Live a little.</strong>
                <button type="button" className="btn btn-sm btn-outline-danger close" onClick={() => setToast(false)} aria-label="Close">
                  <span>&times;</span>
                </button>
            </div>
            <div className="toast-body d-flex">
              <button type="button" className="btn btn-primary" onClick={randomFusionUrl}>
                <FontAwesomeIcon icon={faShuffle} />
              </button>
              <p className='p-0 m-0 ms-2'>
                Let's be honest, you're here to see the cool sprites, lets see if we can find any.
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}
