import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import CheckmarkIcon from '../../assets/images/icons/checkmark.png';
import { useSearchParams } from 'react-router'
import { ProductsGrid } from './ProductsGrid'
import './HomePage.css'

function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(() => {
        const getHomeData = async () => {
            setLoading(true);
            try {
                const urlPath = search
                    ? `https://react-full-course.onrender.com/api/products?search=${search}`
                    : 'https://react-full-course.onrender.com/api/products';
                const response = await axios.get(urlPath);
                setProducts(response.data);
            } finally {
                setLoading(false);
            }
        }
        getHomeData();
    }, [search]);

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <Header cart={cart} />
            {loading ? (
                <div style={{
                    width: "100%",
                    minHeight: "150px",
                    margin:"30px",
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
                <div className="home-page">
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductsGrid key={product.id} product={product} loadCart={loadCart}/>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
export default HomePage;
