import axios from 'axios'

import { useState, useEffect } from 'react'
import CheckoutHeader from './CheckoutHeader'
import { PaymentSummary } from './PaymentSummary'
import { OrderSummary } from './OrderSummary'

import './CheckoutPage.css'

function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const getDeliveryData = async () => {
            const response = await axios.get('https://react-full-course.onrender.com/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);
        }
        getDeliveryData();
    }, []);

    useEffect(() => {
        const getPaymentData = async () => {
            const response = await axios.get('https://react-full-course.onrender.com/api/payment-summary')
            setPaymentSummary(response.data);
        }

        getPaymentData();
    }, [cart]);
    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

            <CheckoutHeader cart={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div>
        </>
    )
}

export default CheckoutPage
