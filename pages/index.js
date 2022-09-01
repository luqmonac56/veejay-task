import axios from 'axios'
import { useEffect, useState } from 'react'
import style from  '../styles/Home.module.css'

export default function Home() {

  const [coin, setCoin] = useState([])

  const getCoins = async () => {
    try {
      const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","BNBUSDT"]')
      setCoin(res.data)
      
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getCoins()
    console.log(coin);
  } ,[])

  return (
    <div className= {style.main}>
      <div className={style.container}>
        <h2 className= {style.heading2}>Watchlist</h2>
      
        <div className={style.cover}>
          <p>Currency</p>
          <p>Last</p>
          <p>24h%</p>
          <p>7d%</p>
          <p>Mrkt Cap</p>
        </div>
        { coin.map((item, index) => (
          <div key={index}  >
              <div className={[style.contents]}>
              
                <div className= {style.symbol}>{item.symbol.replace('USDT', '')}</div>
                
                
                <div>{ Math.round(item.lastPrice * 100) / 100 }</div>
              
              
                <div>{ Math.round(item.priceChangePercent * 100) / 100  }%</div>
                
                
                <div>{item.price}</div>
              
                
                <div>{ Math.round(item.volume * 100) / 100 }</div>
              
              </div>
          </div>
        )) }
      </div>
    </div>
  )
}
