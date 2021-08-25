import React, { useState, useEffect, Component } from 'react'
import './PokeFetch.css';



class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      count: 10,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { count } = this.state
    console.log(count)
    if (count === 0) {
      //Reveal Pokemon
      return (
        <div className={'wrapper'}>
          <button className={'start'} onClick={() => {
            this.fetchPokemon();
            this.countTimer();
          }}>Start!</button>

          <h1 className={'timer'} >Countdown {count}</h1>
          <div className={'pokeWrap'}>
            <img className={'pokeImg'} id={'revealPoke'} src={this.state.pokeSprite} />
            <h1 className={'pokeName'}>{this.state.pokeName}</h1>
          </div>
        </div>
      )
    } else {
      //Hide Pokemon
      return (
        <div className={'wrapper'}>
          <button className={'start'} onClick={() => {
            this.fetchPokemon();
            this.countTimer();
          }}>Start!</button>

          <h1 className={'timer'} >Countdown {count}</h1>
          <div className={'pokeWrap'}>
            <img className={'pokeImg'} id={'hidePoke'} src={this.state.pokeSprite} />
          </div>
        </div>
      )
    }
  }

  countTimer() {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count - 1
      }))
      if (this.state.count === 0) {
        clearInterval(this.myInterval) //this stops at 0, but doesn't reset to 10
      } if (this.state.count < 0) {
        this.setState({ count: 10 }, () => {
          console.log("updated count" + this.state.count)
        })
      }

    }, 1000)
  }

}

export default PokeFetch;


