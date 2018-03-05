import React, { Component } from 'react';
import Card from 'react-playing-card';

//display 52 cards using css grid
export default class Board extends Component {
  constructor(props) {
    super(props);

  }
  mapCards() {
    return this.props.cards.map((cardObject, index) => {
      const key = `${cardObject.rank}${cardObject.suit} `;
      const rank = cardObject.rank;
      const suit = cardObject.suit;
      const className = cardObject.className;

      // className='hideCard'

      // rank and suit are keys here
      return (
        <div className={className} key={key} onClick={(e) => {
          console.log("CLICK WORKED!!!!");
          console.log(rank, suit);
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

// function Card(props) {
//   return (
//     <div onClick={(e) => props.onClick(props.rank, props.suit)}>
//       <h1>{props.rank}{props.suit}</h1>
//     </div>
//   )
// }
