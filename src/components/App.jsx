import React, { Component } from 'react';
import '../css/App.css';
import { Button } from 'antd';

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flex: 1, }}>

        <img style={{ display: 'flex', flex: 1, height: '100vh' }}
         src={require('../assets/3.jpg')}/>

      </div>


    );
  }
}

export default App;
