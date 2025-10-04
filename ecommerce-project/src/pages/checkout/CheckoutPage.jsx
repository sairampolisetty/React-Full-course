import axios from 'axios'
import { useState, useEffect } from 'react'
import CheckoutHeader from './CheckoutHeader'
import { PaymentSummary } from './PaymentSummary'
import { OrderSummary } from './OrderSummary'
import './CheckoutPage.css'

function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDeliveryData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://react-full-course.onrender.com/api/delivery-options?expand=estimatedDeliveryTime');
                setDeliveryOptions(response.data);
            } finally {
                setLoading(false);
            }
        }
        getDeliveryData();
    }, []);

    useEffect(() => {
        const getPaymentData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://react-full-course.onrender.com/api/payment-summary');
                setPaymentSummary(response.data);
            } finally {
                setLoading(false);
            }
        }
        getPaymentData();
    }, [cart]);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

            <CheckoutHeader cart={cart} />

            {loading ? (
                <div style={{
                    width: "100%",
                    minHeight: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        border: "5px solid #eee",
                        borderTop: "5px solid #3b82f6",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        animation: "spin 1s linear infinite"
                    }} />
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg);}
                            100% { transform: rotate(360deg);}
                        }
                        @media (max-width: 600px) {
                          .responsive-loader {
                            width: 22px !important;
                            height: 22px !important;
                            border-width: 3px !important;
                          }
                        }
                    `}</style>
                </div>
            ) : cart.length === 0 ? (
                <div style={{
                    width: "100%",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "40px",
                    color: "#555",
                    fontSize: "1.1rem"
                }}>
                    <img src="/cart-favicon.png" alt="Empty Cart" style={{width: "48px", marginBottom: "10px"}} />
                    <div>Your cart is empty!</div>
                    <div>Looks like you haven't added anything yet.</div>
                    <a
                        href="/"
                        style={{
                            color: "#3b82f6",
                            marginTop: "10px",
                            textDecoration: "underline"
                        }}>
                        Keep shopping
                    </a>
                </div>
            ) : (
                <div className="checkout-page">
                    <div className="page-title">Review your order</div>
                    <div className="checkout-grid">
                        <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />
                        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                    </div>
                </div>
            )}
        </>
    )
}

export default CheckoutPage
