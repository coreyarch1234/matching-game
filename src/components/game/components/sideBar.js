import React, { Component } from 'react';
import Card from 'react-playing-card';

// Sidebar component lists the matched pairs along with the count
export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  mapCards() {
    console.log(this.props.pairs);
    return this.props.pairs.map((cardObject, index) => {
      const rank = cardObject.cardOne.rank;
      const suitOne = cardObject.cardOne.suit;
      const suitTwo = cardObject.cardTwo.suit;
      const keyOne = `${rank} ${suitOne} `;
      const keyTwo = `${rank} ${suitTwo} `;

      // rank and suit are keys here
      return (
        <div style={{marginBottom: '100px'}} key={keyOne + keyTwo}>
          <Card rank={rank} suit={suitOne}/>
          <Card rank={rank} suit={suitTwo}/>
        </div>
      )
    });
  }
  render() {
    return (
      <div className='sideBar'>
        <h3 style={{textAlign: 'center'}}>{this.props.pairs.length} Matched Pairs</h3>
        {this.mapCards()}
      </div>
    )
  }
}
