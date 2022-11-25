import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function SiteLogo() {
  return (
    <Link to='/poke-fusion-dex'>
        <img src={logo} alt='Site Logo' loading='lazy' height="50"/>
    </Link>
  )
}
