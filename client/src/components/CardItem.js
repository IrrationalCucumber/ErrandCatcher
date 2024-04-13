import React from 'react'
import { Link } from 'react-router-dom'

function CardItem(props) {
  return (
    <>
        <li className='cards_item'>
            <Link className='cards__item__link' to={props.path}>
                <figure className='cards__item__pic-wrap' data-category={props.label}>
                    <img src={props.src} alt='Travel' className='cards__item__img'></img>
                </figure>
                <div className='cards__item__info'>
                    <h1 className='cards__item__text' style={{paddingTop:"10px", paddingBottom:"10px"}}>{props.text}</h1>
                    <p className='cards__item__location' style={{color:'black', fontSize:'12', paddingBottom:"10px"}}>
                    <i className="fas fa-map-marker-alt" style={{ marginRight: '5px' }}></i>
                    {props.location}
                    </p>
                </div>
            </Link>
        </li>
    </>
  )
}

export default CardItem
