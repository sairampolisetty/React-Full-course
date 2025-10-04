import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import CheckmarkIcon from '../../assets/images/icons/checkmark.png';
import {useSearchParams} from 'react-router'
import { ProductsGrid } from './ProductsGrid'
import './HomePage.css'

function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [searchParams]=useSearchParams();
    const search = searchParams.get('search');
    useEffect(() => {
        const getHomeData = async () => {
            const urlPath = search ? `https://react-full-course.onrender.com/api/products?search=${search}` : 'https://react-full-course.onrender.com/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        }
        getHomeData();
    }, [search]);

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

            <Header cart={cart} />

            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <ProductsGrid key={product.id} product={product} loadCart={loadCart}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default HomePage;