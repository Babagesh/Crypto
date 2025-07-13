import './App.css'
import { useEffect, useState} from 'react'


const API_KEY = import.meta.env.VITE_CRYPTO_ACCESS_KEY;

export default function App()
{
    const [list, setList] = useState(null);

    useEffect( () => {
        async function fetchAllCoinData() {
            const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`);
            const json = await response.json();
            setList(json);
        } 
        fetchAllCoinData().catch(console.error);
    }
    ,[])

  return (
    <div className = "whole-page">
        <h1>My Crypto List</h1>
        <ul>
            {
                (list && Object.entries(list.Data).filter(
                    ([number, coin]) => 
                    (
                        coin['IsTrading'] && coin['Algorithm'] !== 'N/A' && coin['ProofType'] !== 'N/A'
                    )
                    
                ).map(([number, coinData]) => 
                    <li key = {coinData['FullName']}>{coinData['FullName']} </li>
                )
            )
            }
        </ul>
    </div>
  );
}