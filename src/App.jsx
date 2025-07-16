import './App.css'
import { useEffect, useState} from 'react'
import CoinInfo from './components/CoinInfo';

const API_KEY = import.meta.env.VITE_CRYPTO_ACCESS_KEY;

export default function App()
{
    const [list, setList] = useState(null);

    const [filteredResults, setFilteredResults] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect( () => {
        async function fetchAllCoinData() {
            const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`);
            const json = await response.json();
            console.log(json)
            setList(json);
        } 
        fetchAllCoinData().catch(console.error);
    }
    ,[])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if(searchValue !== "")
        {
            const filteredData = Object.keys(list.Data).filter(
                (item) => (
                    Object.values(item).join("").toLowerCase().includes(searchValue.toLowerCase())
                ))
                setFilteredResults(filteredData);
        }
        else
        {
            setFilteredResults(Object.keys(list.Data))
        }
    }

  return (
    <div className = "whole-page">
        <h1>My Crypto List</h1>
        <input 
            type = "text"
            placeholder = "Search..."
            onChange = {(e) => searchItems(e.target.value)}
        />
        <ul>
            {
                searchInput.length > 0 ? 
                (
                    filteredResults.map((coin) => 
                    {
                        const coinData = list.Data[coin]
                        if(coinData['IsTrading'] && coinData['Algorithm'] !== 'N/A' && coinData['ProofType'] !== 'N/A')
                        {
                            return (
                            <CoinInfo 
                                key = {coin}
                                name = {coinData['FullName']}
                                image = {coinData['ImageUrl']}
                                symbol = {coinData['Symbol']}
                           />)
                        }
                        return null;
                    }
                    )   
                ) : 
                (
                        (list && Object.entries(list.Data).filter(
                            ([coin, coinData]) => 
                            (
                                coinData['IsTrading'] && coinData['Algorithm'] !== 'N/A' && coinData['ProofType'] !== 'N/A'
                            )
                        )
                        .slice(0,20)
                        .map(([coin, coinData]) => 
                            <CoinInfo
                                key = {coin}
                                name = {coinData['FullName']}
                                image = {coinData['ImageUrl']}
                                symbol = {coinData['Symbol']}
                            />
                        )
                    )
                )
            }
        </ul>
    </div>
  );
}