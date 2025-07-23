import {useEffect, useState} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip} from 'recharts';

const API_KEY = import.meta.env.VITE_CRYPTO_ACCESS_KEY;


const CoinChart = ({symbol, market}) => {
    const [histData, setHistData] = useState(null);

    useEffect(
        () => {
            const getCoinHist = async () => {
                const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histoday?api_key=${API_KEY}&fsym=${symbol}&tsym=USD&limit=30`)
                const json = await response.json();
                console.log(json);
                setHistData(json['Data']['Data'])
            }
            getCoinHist().catch(console.error)
        }, [symbol, market]);
    
    const cleanData = (data) => {
        let filteredData = [];
        let countDays = 0;

        for(const item of data)
        {
            let accurateDay = new Date();
            accurateDay.setDate(accurateDay.getDate() - countDays)
            filteredData.push(
                {
                    time:accurateDay.toLocaleDateString("en-US"),
                    'open price':  item.open
                })
            countDays++;
        }
        return filteredData.reverse();
    }

    const filteredData = histData ? cleanData(histData) : [];
    console.log(filteredData);

    return (   
        <div>
            <br></br>
            <h2> 30-day Price Data for {symbol}</h2>

            {histData ? (
                <div>
                    <LineChart 
                    width={1300}
                    height={400} 
                    data = {filteredData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 30,
                    }}
                    >
                    <Line
                        type='monotone'
                        dataKey= 'open price'
                        stroke="#8884d8"
                        activeDot={{ r: 5 }}
                    
                    />
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="time" interval={2} angle={20} dy={5}>
                        <Label value="Date and Time" offset={0} position="insideBottom" dy={50}/>
                    </XAxis>

                    <YAxis
                        label={{
                        value: "Price",
                        angle: -90,
                        position: "insideLeft",
                        textAnchor: "middle",
                        dx: -18
                        }}
                    />
                    <Tooltip />
                    </LineChart>
                </div>
            ): null}
        </div>
    );
}

export default CoinChart; 