import React from 'react';
import './ItemCard.css';

function ItemCard(props) {

    function handleLike(e){
        e.stopPropagation();
        props.onCardLike(props)
    }

    function testFunction(e){
        e.stopPropagation();
        console.log('hi');
    }

    const cardImage = {
        backgroundImage: 'url(' + props.link + ')',
    };

    return (
        <div className='itemcard' style={cardImage} onClick={() => props.handleCardOpen(props)}>
            <div className='itemcard__name-wrapper'>
                <p className='itemcard__name'>{props.name}</p>
            </div>
            <div className='itemcard__like-button-wrapper'>
            <button className='itemcard__like-button' onClick={handleLike}/>
            </div>
        </div>
    );
}

export default ItemCard;