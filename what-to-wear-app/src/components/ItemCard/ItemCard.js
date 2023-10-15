import React from 'react';
import './ItemCard.css';

//will also include functionality for opening a modal

function ItemCard(){
    return(
        <button className='itemcard'>
            <div className='itemcard__name-wrapper'>
                <p className='itemcard__name'>Hat</p>
            </div>
        </button>
    );
}

export default ItemCard;