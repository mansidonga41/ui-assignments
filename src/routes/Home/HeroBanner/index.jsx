import React from 'react'
import './HeroBanner.scss';
import HeroImage from '../../../assets/imges/hero-banner.jpeg';
export default function HeroBanner() {
  return (
    <div className='hero-banner'>
        <div className='container'>
            <img src={HeroImage} alt="HeroImage"/>
        </div>
    </div>
  )
}
