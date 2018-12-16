import React, { Component } from 'react'
import Left from './Left';
import Right from './Right';
import { style } from '../css/App.jsx';
import '../css/App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <img style={style.image} src={require('./3.jpg')} />

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