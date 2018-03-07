import React, { Component } from 'react';
import Board from './board';
import SideBar from './sideBar';

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

  // hide cards from board and add them to matchedCards
  hideAndAddMatched(rank, suitOne, suitTwo) {

    const newCards = this.state.cards.filter((cardObject, index) => {
      const cardRank = cardObject.rank;
      const cardSuit = cardObject.suit;
      //first card of matched pair found
      if (cardRank === rank && cardSuit === suitOne){
        // hide card with css
        cardObject.className = 'hideCard';
        return cardObject;
      }
      if (cardRank === rank && cardSuit === suitTwo){
        // hide card with css
        cardObject.className = 'hideCard';
        return cardObject;
      }
      return cardObject;
    });

    const matchedPair = {
      cardOne: { rank: rank, suit: suitOne },
      cardTwo: { rank: rank, suit: suitTwo }
    };
    // set new state with new cards, reset firstPick and added matchedCards
    this.setState({cards: newCards, firstPick: null, matchedCards: [...this.state.matchedCards, matchedPair]});
  }

  clickCard(rank, suit) {

    // this is the first card clicked
    if (this.state.firstPick === null) {
      this.setState({firstPick:{ rank: rank, suit: suit }});
    }
    // a second card was clicked and it has the same rank as the previous
    else if (this.state.firstPick.rank === rank) {
      // hide those cards, add to matchedCards and reset first pick
      this.hideAndAddMatched(rank, this.state.firstPick.suit, suit);
    }
    // a second card was clicked, but no match
    else{
      // reset first pick
      this.setState({firstPick: null});
    }
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  makeDeck() {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    const suits = ['S', 'H', 'C', 'D'];
    const cards = [];
    for (var rank of ranks) {
      for (var suit of suits) {
        cards.push({
          rank: rank,
          suit: suit,
          isMatched: false,
          className: ''
        });
      }
    }
    // randomize placement of cards on board
    // return this.shuffleArray(cards);
    return cards;

  }
  render() {
    console.log(`first pick is now: ${this.state.firstPick === null ? this.state.firstPick : this.state.firstPick.rank}`);
    console.log(`matched pairs is: ${this.state.matchedCards}`);
    console.log(`matched pairs count is: ${this.state.matchedCards.length}`);
    console.log('**************');
    return (
      <div className="App" style={styles.gameContainer}>
        <SideBar pairs={this.state.matchedCards}/>
        <Board cards={this.state.cards} onClick={(rank, suit) => this.clickCard(rank, suit)}/>
      </div>
    );
  }
}

const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
}
