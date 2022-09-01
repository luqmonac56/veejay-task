import axios from 'axios'
import { useEffect, useState } from 'react'
import style from  '../styles/Home.module.css'
import image from  '../assets/Solana_logo.png'
import Image from 'next/image'


export default function Home() {

  const [coin, setCoin] = useState([])

  const getCoins = async () => {
    try {
      const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","USDCUSDT","BNBUSDT","BUSDUSDT","XRPUSDT","ADAUSDT","SOLUSDT","DOGEUSDT","DOTUSDT"]')
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
          <p className={style.first}>Currency</p>
          <p>Last</p>
          <p>24h%</p>
          <p>7d%</p>
          <p>Mrkt Cap</p>
        </div>
        { coin.map((item, index) => (
          <div key={index}  >
              <div className={[style.contents]}>
              
                <div className={style.flex}>
                  <Image src={image} />
                  <p className= {style.symbol}>{item.symbol.replace('USDT', '')}</p>

                </div>                
                
                <p>{ Math.round(item.lastPrice * 100) / 100 }</p>
              
              
                <p style={{ color: item.priceChangePercent.includes('-') ? '#FF492D' : '#61BF1E' }}>{ Math.round(item.priceChangePercent * 100) / 100  }%</p>
                
                
                <p>16%</p>
              
                
                <p>{ Math.round(item.volume * 100) / 100 }</p>
              
              </div>
          </div>
        )) }
      </div>
    </div>
  )
}
