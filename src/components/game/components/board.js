import React, { Component } from 'react';
import Card from 'react-playing-card';

//display 52 cards using css grid
export default class Board extends Component {
  mapCards() {
    return this.props.cards.map((cardObject, index) => {
      const key = `${cardObject.rank} ${cardObject.suit} `;
      const rank = cardObject.rank;
      const suit = cardObject.suit;
      const className = cardObject.className;

      // rank and suit are keys here
      return (
        <div className={className} key={key} onClick={(e) => {
          this.props.onClick(rank, suit);
        }}>
          <Card {...cardObject} />
        </div>)
    });
  }
  render() {
    return (
      <div className="board">
        {this.mapCards()}
      </div>
    );
  }
}
