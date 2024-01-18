import React from 'react';
import './ItemCard.css';

function ItemCard(props){

    const cardImage = {
        backgroundImage: 'url(' + props.link + ')',
    };

    return(
        <>
        <button className='itemcard' style={cardImage} onClick={() => props.handleCardOpen(props)}>
            <div className='itemcard__name-wrapper'>
                <p className='itemcard__name'>{props.name}</p>
            </div>
        </button>
        <button className='itemcard__like-button' />
        </>
    );
}

export default ItemCard;