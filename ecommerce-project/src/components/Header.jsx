import { NavLink, useNavigate, useSearchParams } from 'react-router'
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import { useState } from 'react';
import './Header.css'

function Header({ cart }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');

    const [search, setSearch] = useState(searchText|| '');
    const updateSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleKeyDown = (event)=>{
        if(event.key === 'Enter'){
            searchProducts();
        }
    }

    const searchProducts = () => {
        navigate(`/?search=${search}`)
    }

    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });
    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={LogoWhite} />
                    <img className="mobile-logo"
                        src={MobileLogoWhite} />
                </NavLink >
            </div>

            <div className="middle-section">
                <input
                    className="search-bar" 
                    value={search} 
                    type="search"
                    onKeyDown={handleKeyDown} 
                    placeholder="Search" 
                    onChange={updateSearch} 
                />

                <button className="search-button" onClick={searchProducts}>
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    )
}

export default Header