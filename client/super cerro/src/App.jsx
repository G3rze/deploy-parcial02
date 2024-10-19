import SearchBar from "./components/searchBar.jsx";
import ShopList from "./components/ShopList.jsx";
import Header from "./components/Header.jsx";
import "./style/App.css";
import {useState} from "react";
function App() {

    const [trigger, setTrigger] = useState(0);

    return (
        <div className="App">
            {<Header />}
            {<SearchBar setTrigger={setTrigger} />}
            {<ShopList trigger={trigger} setTrigger={setTrigger} />}
        </div>
    );
}
export default App;