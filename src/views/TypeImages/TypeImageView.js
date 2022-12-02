import React from 'react'
import {TypeImages} from '../../services/constants';

export default function TypeImageView({typeOne, typeTwo = null, maxHeight = '20px'}) {

    const imageOne = TypeImages.get(typeOne);
    const imageTwo = typeTwo != null ? TypeImages.get(typeTwo) : null;

    // console.log(`(${typeOne}, ${typeTwo}) => [${imageOne}, ${imageTwo}]`);

    const imageStyle = {
        maxHeight: maxHeight
    }

    return (
        <div className='p-0 m-0 d-inline-flex flex-row' style={{minWidth: 35}}>
            <div className='col pe-1'>
                <img className='typeImage img-fluid' src={imageOne} style={imageStyle} />
            </div>
            {imageTwo != null ? 
            <div className='col col-6'>
                <img src={imageTwo} className='typeImage img-fluid' style={imageStyle} />
            </div> 
            : null}
        </div>
    )
}
