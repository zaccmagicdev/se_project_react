import React from 'react';
import './ItemCard.css';

//will also include functionality for opening a modal

function ItemCard(props){

    const cardImage = {
        backgroundImage: 'url(' + props.link + ')',
    };

    return(
        <button className='itemcard' style={cardImage} onClick={props.handleCardOpen}>
            <div className='itemcard__name-wrapper'>
                <p className='itemcard__name'>{props.name}</p>
            </div>
        </button>
    );
}

export default ItemCard;