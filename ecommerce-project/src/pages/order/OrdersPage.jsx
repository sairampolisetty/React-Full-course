import Header from '../../components/Header'
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid'
import { useState, useEffect, Fragment } from 'react';
import './OrdersPage.css'

function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getOrders = async () => {
            const response = await axios.get('https://react-full-course.onrender.com/api/orders?expand=products')
            setOrders(response.data)
            setLoading(false);
        }
        getOrders();
       
    }, []);
    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

            <Header cart={cart} />
            {loading ? (
                <div style={{
                    width: "100%",
                    minHeight: "150px",
                    margin: "30px",
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
            ) : (
                <div className="orders-page">
                    <div className="page-title">Your Orders</div>

                    <OrdersGrid orders={orders} loadCart={loadCart} />
                </div>
            )}

        </>
    )
}

export default OrdersPage;
