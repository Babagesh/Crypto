import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <h1> Wrong page!</h1>
            <h2> Follow a valid url</h2>
            <Link style={{ color: "black" }} to="/">
                Back to Home
            </Link>
        </div>
       
    );
}

export default NotFound;