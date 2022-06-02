import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "http://deckofcardsapi.com/api/deck/";

const Deck = () => {
  const [ deck, setDeck ] = useState(null);
  const [ drawn, setDrawn ] = useState([]);

  // On mount: Get request to API to retrieve deck and store in state
  useEffect(
    () => {
      async function getDeck() {
        const deckRes = await axios.get(`${BASE_URL}/new/shuffle`);
        setDeck(deckRes.data);
      }
      getDeck();
    },
    [ setDeck ]
  );

  async function drawCard() {
    const { deck_id } = deck;
    const drawRes = await axios.get(`${BASE_URL}/${deck_id}/draw/`);
    const card = drawRes.data.cards[0];
    setDrawn(c => [
      ...c,
      {
        id: card.code,
        name: `${card.suit} ${card.value}`,
        image: card.image,
      },
    ]);
  }
  let cards = drawn.map(card => (
    <Card key={card.id} src={card.image} alt={card.name} />
  ));

  return (
    <div>
      <button onClick={drawCard}>Get Card</button>
      <div>{cards}</div>
    </div>
  );
};

export default Deck;
