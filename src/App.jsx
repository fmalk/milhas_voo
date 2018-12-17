import React, { Component } from 'react'
import Left from './components/Left';
import Right from './components/Right';
import { style } from './css/App.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <img style={style.image} src={require('./assets/home.jpg')} />

        <div style={style.content}>
          <div style={style.left}>
            <Left />
          </div>

          <div style={style.right}>
            <Right />
          </div>
        </div>
      </div>

    )

  }
}