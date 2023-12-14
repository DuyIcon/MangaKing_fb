import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProduct = ({name}) => {
  const Navigate = useNavigate()
  const handleNavigatetype = (type) => {
    Navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
  }

  return (
    <div style={{fontSize: '20px', fontFamily:'Pixelify Sans', padding:'0px 10px', cursor: 'pointer'}} onClick={() => handleNavigatetype(name)}>{name}</div>
  )
}

export default TypeProduct
