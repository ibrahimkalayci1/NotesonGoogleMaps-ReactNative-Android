import React from 'react'
import { NoteTypes } from '../../utils/constants'
import {  Car, DiscountShape, Note1,  Warning2 } from 'iconsax-react-nativejs'


const LocationIcon: React.FC = ({ type }) => {
    

     switch(type){
        case NoteTypes.accident: return <Car size={24}  color="#F47373" variant='Bold'/>
        case NoteTypes.discount: return <DiscountShape size={24}  color="#37D67A" variant='Bold'/>
        case NoteTypes.warning: return <Warning2 size={24}  color="#ff8a65" variant='Bold'/>
        case NoteTypes.note: return <Note1 size={24}  color="#2CCCE4" variant='Bold'/>
        default:
            return null
     }



}



export default LocationIcon
