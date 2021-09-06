import React from "react";
import Card from "./Card";
import "./DeckOfCards.css";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class DeckOfCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = { deckId: null, drawnCards: [] };
    this.drawCard = this.drawCard.bind(this);
  }

  async drawCard() {
    const url = `${API_BASE_URL}${this.state.deckId}/draw/`;
    try {
      let response = await axios.get(url);
      if (!response.data.success) {
        throw new Error("No more cards!");
      }
      const drawnCard = response.data.cards[0];
      this.setState((st) => ({
        drawnCards: [
          ...st.drawnCards,
          {
            cardId: drawnCard.code,
            cardImage: drawnCard.image,
            cardAlt: drawnCard.value + " of " + drawnCard.suit,
          },
        ],
      }));
    } catch (error) {
      alert(error);
    }
  }

  async componentDidMount() {
    const url = `${API_BASE_URL}new/shuffle/`;
    let response = await axios.get(url);
    let deckId = response.data.deck_id;
    this.setState({ deckId: deckId });
  }
  render() {
    const cards = this.state.drawnCards.map((card) => (
      <Card
        key={card.cardId}
        cardImage={card.cardImage}
        cardAlt={card.cardAlt}
      />
    ));
    return (
      <div>
        <h1 className="Draw-title text">Deck of cards</h1>
        <button onClick={this.drawCard} className="Draw-button text">
          Draw a card!
        </button>
        <div className="Deck-area"> {cards}</div>
      </div>
    );
  }
}

export default DeckOfCards;
