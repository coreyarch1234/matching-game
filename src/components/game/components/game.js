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
      // add selected class to this firstpick
      const newCards = this.addClassToCard(rank, suit, 'selected', false);
      this.setState({cards: newCards, firstPick:{ rank: rank, suit: suit }});
    }
    // a second card was clicked and it has the same rank as the previous
    else if (this.state.firstPick.rank === rank && this.state.firstPick.suit !== suit) {
      // hide those cards, add to matchedCards and reset first pick
      this.hideAndAddMatched(rank, this.state.firstPick.suit, suit);
    }
    // a second card was clicked, but no match
    else{
      // remove selected from firstPick
      // show and then hide second card if they do not match
      const newCards = this.addClassToCard(rank, suit, 'notMatched ', true);
      this.setState({cards: newCards, firstPick: null}); // reset firstPick object
    }
  }

  addClassToCard(rank, suit, className, resetFirstPick) {
    const newCards = this.state.cards.filter((cardObject, index) => {
      const cardRank = cardObject.rank;
      const cardSuit = cardObject.suit;
      // get rid of notMatched class
      if (cardObject.className.includes('notMatched ')) {
        cardObject.className = `cardOverlay`;
      }
      // if cards match, add that className
      if (cardRank === rank && cardSuit === suit){
        cardObject.className = `cardOverlay ${className}`;
        return cardObject;
      }
      // if cards do not match, resetFirstPick will be true and this will remove selected class from firstPick
      if (resetFirstPick === true && cardRank === this.state.firstPick.rank && cardSuit === this.state.firstPick.suit) {
        cardObject.className = `cardOverlay`;
        return cardObject;
      }
      return cardObject;
    });
    return newCards;
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
          className: 'cardOverlay'
        });
      }
    }
    // randomize placement of cards on board
    return this.shuffleArray(cards);

  }
  render() {
    return (
      <div className='gameContainer'>
        <SideBar pairs={this.state.matchedCards}/>
        <Board cards={this.state.cards} onClick={(rank, suit) => this.clickCard(rank, suit)}/>
      </div>
    );
  }
}
