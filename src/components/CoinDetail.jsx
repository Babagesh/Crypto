import {Component, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_CRYPTO_ACCESS_KEY;


const CoinDetail = () => {
    const {symbol} = useParams();

    const[fullDetails, setFullDetails] = useState(null);

    useEffect(() =>
    {
        const coinDetails = async () => {
            const details = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?api_key=${API_KEY}&fsyms=${symbol}&tsyms=USD`)
            const description = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}&fsym=${symbol}`)

            const detailsJson = await(details.json());
            const descripJson = await(description.json());

            console.log(detailsJson)
            console.log(descripJson)
            
            setFullDetails({
                numbers: detailsJson['DISPLAY'],
                textData: descripJson['Data']
            })
        }
        coinDetails().catch(console.error)
    }, [symbol])

    return fullDetails ? (
        <div>
            <h1> {fullDetails['textData'][symbol]['FullName']} </h1>
            <img 
                className = 'images'
                src = {fullDetails['numbers'][symbol]['USD']['IMAGEURL']}
                alt = {`Small icon for ${symbol} crypto coin`}
            />
            <div> {fullDetails['textData'][symbol]['Description']}</div>
            <br></br>
            <div>
                This coin was built with the algorithm {" "}
                {fullDetails['textData'][symbol]['Algorithm']}
            </div>
            <table>
                <tbody>
                    <tr>
                        <th> Launch Date</th>
                        <td>{fullDetails['textData'][symbol]['AssetLaunchDate'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Website </th>
                        <td>{fullDetails['textData'][symbol]['Website'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Whitepaper </th>
                        <td>{fullDetails['textData'][symbol]['WhitePaper'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Monetary Symbol </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['FROMSYMBOL'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Market </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['MARKET'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Last Transaction </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['LASTUPDATE'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Last Transaction Value</th>
                        <td>{fullDetails['numbers'][symbol]['USD']['PRICE'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Volume </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['VOLUME24HOUR'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Today's Open Price </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['OPEN24HOUR'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Highest Price during the Day </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['HIGH24HOUR'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Lowest Price during the Day </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['LOW24HOUR'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Change from Previous Day </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['CHANGEPCT24HOUR'] || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Market Cap </th>
                        <td>{fullDetails['numbers'][symbol]['USD']['MKTCAP'] || 'N/A'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) : null;
}

export default CoinDetail;