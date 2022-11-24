import React from 'react'
import {TypeImages} from '../../services/constants';

export default function TypeImageView({typeOne, typeTwo = null}) {

    const imageOne = TypeImages.get(typeOne);
    const imageTwo = typeTwo != null ? TypeImages.get(typeTwo) : null;

    // console.log(`(${typeOne}, ${typeTwo}) => [${imageOne}, ${imageTwo}]`);

    const imageStyle = {
        width: "auto",
        minHeight: "5px",
        maxHeight: "20px"
    }

    return (
        <div className='p-0 m-0 d-inline-flex flex-row' style={{maxWidth: 100, minWidth: 10}}>
            <img className='pe-1 typeImage img-fluid' src={imageOne} style={imageStyle} />
            {imageTwo != null ? <img src={imageTwo} className='typeImage img-fluid' style={imageStyle} /> : null}
        </div>
    )
}
