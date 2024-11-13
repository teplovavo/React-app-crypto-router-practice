import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Price(props) {
  const apiKey = "997d59a6-5911-4c0a-a138-de152314e786";
  const { symbol } = useParams();
  const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  const [coin, setCoin] = useState(null);

  const getCoin = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoin(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCoin();
  }, []);

  const loaded = () => (
    <div>
      <h1>
        {coin.asset_id_base}/{coin.asset_id_quote}
      </h1>
      <h2>{coin.rate}</h2>
    </div>
  );

  const loading = () => <h1>Loading...</h1>;

  return coin && coin.rate ? loaded() : loading();
}
