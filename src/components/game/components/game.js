import React, { Component } from 'react';
import Board from './board';
//Hold an array of 52 card objects
export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: this.makeDeck(),
      firstPick: null
    }
  }
  clickCard(rank, suit) {
    console.log(`first pick is now: ${this.state.firstPick === null ? this.state.firstPick : this.state.firstPick.rank}`);

    if (this.state.firstPick === null) {
      console.log(`this is the first card clicked`);
      this.setState({firstPick:{
        rank: rank,
        suit: suit
      }});
    }else if (this.state.firstPick.rank === rank) {
      console.log(`ranks are equal: ${rank}`);
    }else{
      console.log(`ranks are not equal: ${rank}`);
    }
  }
  makeDeck() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    const suits = ['S', 'H', 'C', 'D'];
    const cards = []
    const className = '';
    for (var rank of ranks) {
      for (var suit of suits) {
        cards.push({
          rank: rank,
          suit: suit,
          isMatched: false,
          className: className
        });
      }
    }
    return cards;

  }
  render() {
    console.log(`first pick is now: ${this.state.firstPick === null ? this.state.firstPick : this.state.firstPick.rank}`);
    this.makeDeck();
    return (
      <div className="App">
        <Board cards={this.state.cards} onClick={(rank, suit) => this.clickCard(rank, suit)}/>
      </div>
    );
  }
}
