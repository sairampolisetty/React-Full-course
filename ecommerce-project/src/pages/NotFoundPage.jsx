import Header from '../components/Header'
import './NotFoundPage.css'

function NotFoundPage({cart}){
    return(
        <>
            <title> Page Not Found</title>
            <Header cart={cart}/>
            <h1 className="not-found-message">404 Error</h1>
            <h2 className="not-found-error">Sorry, the page you are looking for does not exist.</h2>
        </>
    )
}

export default NotFoundPage;