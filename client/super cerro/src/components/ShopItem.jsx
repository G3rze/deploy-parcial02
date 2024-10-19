import '../style/ShopItem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWallet, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import axios from "axios";

// Return every Item in the ShopList
// eslint-disable-next-line react/prop-types
const ShopItem = ({name, image, quantity, price, id, setTrigger, isBought}) => {
    const [isBoughtState, setIsBoughtState] = useState(isBought);

    // The handle the action when the buy button is pressed
    const handleBuy = async () => {
        try {
            await axios.put(`http://localhost:3000/api/items/${id}`);
            setIsBoughtState(true);
            setTrigger(prev => prev + 1);

        } catch (error) {
            console.log(error)
        }

    }

    // The handle the action when the delete button is pressed
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/items/${id}/${isBoughtState}`);
            setTrigger(prev => prev + 1);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`shop-item ${isBoughtState ? 'bought' : ''}`}>
            <img src={image} alt={name} className="shop-item-image"/>
            <div className="shop-item-details">
                <h3 className="shop-item-title">{name}</h3>
                <p className="shop-item-price">${price}</p>
                <p className="shop-item-quantity">{quantity}</p>
            </div>
            <div className="shop-item-actions">
                <button className="shop-item-buy" onClick={handleBuy}>
                    <FontAwesomeIcon icon={faWallet}/> Buy
                </button>
                <button className="shop-item-delete" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash}/> Delete
                </button>
            </div>
        </div>
    )
}

export default ShopItem;