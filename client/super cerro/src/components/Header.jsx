import '../style/Header.css'
import logo from '../assets/rb_2151257065.webp'


// Return the header component
const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="logo" className="mountain-icon"/>
            <h1 className="header-title">SUPER CERRO</h1>
        </header>
    )
}

export default Header