import React from 'react';
import './ItemCard.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ItemCard(props) {

    const { currentUser } = React.useContext(CurrentUserContext);

    function handleLike(e) {
        e.stopPropagation();
        props.onCardLike(props)
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
                {currentUser !== null &&
                    <button className={'itemcard__like-button' + (props.likes.includes(currentUser._id) ? '_liked' : '')} onClick={handleLike} />
                }
            </div>
        </div>
    );
}

export default ItemCard;