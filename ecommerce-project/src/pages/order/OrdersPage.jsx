import Header from '../../components/Header'
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid'
import { useState, useEffect, Fragment } from 'react';
import './OrdersPage.css'

function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const response = await axios.get('/api/orders?expand=products')
            setOrders(response.data)
        }
        getOrders();
    }, []);
    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    )
}

export default OrdersPage;
