import React from 'react'
import {TypeImages} from '../../services/constants';

export default function TypeImageView({typeOne, typeTwo = null}) {

    const imageOne = TypeImages.get(typeOne);
    const imageTwo = typeTwo != null ? TypeImages.get(typeTwo) : null;

    // console.log(`(${typeOne}, ${typeTwo}) => [${imageOne}, ${imageTwo}]`);

    return (
        <>
            <img src={imageOne} height="20" />
            {imageTwo != null ? <img src={imageTwo} height="20" /> : null}
        </>
    )
}
