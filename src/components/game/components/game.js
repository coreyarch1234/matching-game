import React, { Component } from 'react';
import Board from './board';
//Hold an array of 52 card objects
export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: this.makeDeck(),
      firstPick: null,
      matchedCards: []
    }
  }

  removeMatched(rank, suitOne, suitTwo) {
    // hide those cards on board
    //add to matched array
    console.log(`remove matched`);
    const newCards = this.state.cards.filter((cardObject, index) => {
      const cardRank = cardObject.rank;
      const cardSuit = cardObject.suit;
      if (cardRank === rank && cardSuit === suitOne){
        cardObject.className = 'hideCard';
        console.log(`we are hiding card, ${rank} ${suitOne}`);
        return cardObject;
      }else if (cardRank === rank && cardSuit === suitTwo){
        cardObject.className = 'hideCard';
        console.log(`we are hiding card, ${rank} ${suitTwo}`);
        return cardObject;
      }
      else{
        return cardObject;
      }
    });
    this.setState({cards: newCards, firstPick: null});
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
      // hide those cards and reset first pick
      console.log(`ranks are equal: ${rank}`);
      this.removeMatched(rank, this.state.firstPick.suit, suit);
    }else{
      // reset first pick
      console.log(`ranks are not equal: ${rank}`);
      this.setState({firstPick: null});
    }
  }
  makeDeck() {
    console.log(`WE ARE MAKING A DECK`);
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
    // this.makeDeck();
    return (
      <div className="App">
        <Board cards={this.state.cards} onClick={(rank, suit) => this.clickCard(rank, suit)}/>
      </div>
    );
  }
}
