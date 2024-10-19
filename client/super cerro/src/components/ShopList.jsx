import axios from 'axios';
import {useEffect, useState} from "react";
import ShopItem from './ShopItem';
import '../style/ShopList.css'

// Return the Shoplist
// eslint-disable-next-line react/prop-types
const ShopList = ({trigger, setTrigger}) => {
    const [items, setItems] = useState([]);

    // Get the Shoplist from the API
    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/items');
            setItems(res.data);
        } catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [trigger])

    //Group the items by id and the bought status
    const groupedItems = items.reduce((acc, item) => {
        const key = `${item.id}-${item.bought}`;
        if (!acc[key]) {
            acc[key] = { ...item, count: 0};
        }
        acc[key].count += 1;
        return acc;
    }, {});

    // return all the product grouped in cards
    return (
        <div className="shop-list-container">
            <div className="shop-list">
                {Object.values(groupedItems).map((item) => (
                    <ShopItem
                        key={`${item.id}-${item.bought}`}
                        id={item.id}
                        name={item.title}
                        image={item.image}
                        quantity={item.count}
                        price={item.price}
                        isBought={item.bought}
                        setTrigger={setTrigger}
                    />
                ))}
            </div>
        </div>
    )
}

export default ShopList;