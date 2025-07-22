import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'


const API_KEY = import.meta.env.VITE_CRYPTO_ACCESS_KEY;

const CoinInfo = ({image, name, symbol}) => 
{
    const [price, updatePrice] = useState(null)

    useEffect( () => {
            const getCoinPrice = async () => {
                const response = await fetch(`https://min-api.cryptocompare.com/data/price?api_key=${API_KEY}&fsym=${symbol}&tsyms=USD`)
                const json = await response.json();
                updatePrice(json)
            }
            getCoinPrice().catch(console.error);
        }, [symbol])

    return (
            <Link
                style={{color: 'black'}}
                to={`/coinDetails/${symbol}`}
                key={symbol}
            >
                    <img className = 'icons' src = {`https://www.cryptocompare.com${image}`} alt={`Small icon for ${name} crypto coin`}/>
                    {name}
                    {
                    price && price.USD ? <span className = 'tab'>${price.USD} USD</span> : null
                    }
            </Link>
    );

}

export default CoinInfo;