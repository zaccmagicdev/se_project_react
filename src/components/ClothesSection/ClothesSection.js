import * as React from 'react';
import ItemCard from "../ItemCard/ItemCard";
import './ClothesSection.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ClothesSection(props) {

    let filteredCards = [];
    const {currentUser} = React.useContext(CurrentUserContext);

    filteredCards = props.cards.filter((item) => {
        if(item.owner === currentUser.data._id){
            return item;
        }
    })

    return (
        <div className='clothessection'>
            <div className='clothessection__wrapper'>
                <h2 className='clothessection__title'>Your items</h2>
                <button className='clothessection__button' onClick={props.handleOpenFormModal}>+ Add new</button>
            </div>
            <ul className='clothessection__cards'>
                {filteredCards.map((item, i) => (
                    <ItemCard key={i} name={item.name} link={item.imageUrl} weather={item.weather} handleCardOpen={props.handleOpenModal} id={item._id} owner={item.owner}/>
                ))
                }
            </ul>
        </div>
    );
}

export default ClothesSection;