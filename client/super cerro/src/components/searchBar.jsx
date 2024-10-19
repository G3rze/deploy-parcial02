import axios from 'axios';
import '../style/SearchBar.css'
import {useEffect, useState} from "react";

// Creation of the searchbar component
// eslint-disable-next-line react/prop-types
const SearchBar = ({setTrigger}) => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [results, setResults] = useState([]);

    // Get the available products from the API
    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/products');
            setProducts(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Every change in the input
    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value !== '') {
            const filteredProducts = products.filter((product) => {
               return product.title.toLowerCase().includes(value.toLowerCase())
            })
            setResults(filteredProducts.slice(0, 5));
        } else {
            setResults([]);
        }
    }

    // Change the input to the selected item
    const handleSelect = (title) => {
        handleSubmit(title);
        setResults([]);

    }

    // Get the id of the product searched
    const handleSubmit = async (title) => {
        const selectedProduct = products.filter((product) => {
            if (product.title === title) {
                return product;
            } else {
                return null;
            }
        });
        if(selectedProduct[0] !== undefined) {
            try {
                await axios.post(`http://localhost:3000/api/items/${selectedProduct[0].id}`);
                console.log(selectedProduct[0].bought)
                setTrigger(prev => prev + 1);
                setSearch('')
            } catch (e){
                console.log(e);
            }
        } else {
            console.log("Product not found")
        }

    }

    //// HighlightText in the results that matches with the search (Scado de ChatGPT)
    const highlightText = (text) => {
        const regex = new RegExp(`(${search})`, 'gi'); // Crea una expresión regular para resaltar
        const parts = text.split(regex); // Divide el texto en partes

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{part}</span> // Aplica negrita y subrayado
            ) : part // Devuelve la parte normal sin estilos
        );
    };

    // Return the Searchbar and the list of posible searchs
    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search products"
                onChange={handleChange}
                onKeyDown={handleSubmit}
                value={search}
                className="search-bar-input"
            />
            {results.length > 0 && (
                <ul className="search-bar-list">
                {results.map((product) => (
                    <li
                        key={product.title}
                        onClick={() => {
                            handleSelect(product.title);
                        }}
                    >{highlightText(product.title)}</li>
                ))}
            </ul>)}

        </div>
    )
};

export default SearchBar;


//OpenAI. (2024). Función para calcular el promedio de una lista. [Código]. ChatGPT. https://www.openai.com/chatgpt
