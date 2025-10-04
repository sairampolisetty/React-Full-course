import axios from 'axios'
import { useState } from 'react'
import { formatMoney } from '../../utils/money'

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const updatingQuantity = () => {
        if (isUpdatingQuantity) setIsUpdatingQuantity(false);
        else setIsUpdatingQuantity(true);
    }

    const updateQuantity = async(event)=>{
        setQuantity(Number(event.target.value));
        await axios.put(`/api/cart-items/${cartItem.productId}`,{
            quantity:Number(event.target.value)
        })
        await loadCart()
    }

    const handleQuantityKeyDown =(event)=>{
        const keyPressed=event.key;
        console.log(keyPressed)
        if(keyPressed ==='Enter') updatingQuantity();
        else if(keyPressed === 'Escape'){
            setQuantity(cartItem.quantity);
            setIsUpdatingQuantity(false);
        }
    }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {isUpdatingQuantity
                            ? <input type="text" className="quantity-textbox" value={quantity}
                                onChange={updateQuantity} onKeyDown={handleQuantityKeyDown}/>
                            : <span className="quantity-label">{quantity}</span>
                        }
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updatingQuantity}>
                        {isUpdatingQuantity?'Save':'Update'}
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}