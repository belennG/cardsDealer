import React from "react";
import "./Card.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let x = Math.random() * 40 - 20;
    let y = Math.random() * 40 - 20;
    this._transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
  }

  render() {
    return (
      <img
        style={{ transform: this._transform }}
        className="Card"
        src={this.props.cardImage}
        alt={this.props.cardAlt}
      />
    );
  }
}

export default Card;
