import * as React from 'react';
import ItemCard from "../ItemCard/ItemCard";
import './ClothesSection.css';

function ClothesSection(props) {
    return (
        <>
            <div className='clothessection__wrapper'>
                <h2 className='clothessection__title'>Your items</h2>
                <button className='clothessection__button'>+ Add new</button>
            </div>
            <ul className='clothessection__cards'>
                {props.cards.map((item, i) => (
                    <ItemCard key={i} name={item.name} link={item.imageUrl} weather={item.weather} handleCardOpen={props.handleOpenModal}/>
                ))}
            </ul>
        </>
    );
}

export default ClothesSection;