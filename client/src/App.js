import React from 'react';
import RouterView from './router.jsx';
import Nav from './Nav/Nav.jsx';

class App extends React.Component {
  constructor(arg) {
    super(arg)
  };
  render() {
    return (
      <RouterView>
        <Nav history={this.props.history}></Nav>
      </RouterView>
    );
  }
}

export default App;
