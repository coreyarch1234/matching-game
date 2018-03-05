import React, { Component } from 'react';
import Board from './board';
//Hold an array of 52 card objects
export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: this.makeDeck()
    }
  }
  clickCard(rank, suit) {
    console.log(`rank is: ${rank}, suit is: ${suit}`);
  }
  makeDeck() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    const suits = ['S', 'H', 'C', 'D'];
    const cards = []
    for (var rank of ranks) {
      for (var suit of suits) {
        cards.push({
          rank: rank,
          suit: suit,
          isMatched: false
        });
      }
    }
    return cards;

  }
  render() {
    this.makeDeck();
    return (
      <div className="App">
        <Board cards={this.state.cards} onClick={(rank, suit) => this.clickCard(rank, suit)}/>
      </div>
    );
  }
}
