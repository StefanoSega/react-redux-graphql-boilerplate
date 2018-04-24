import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Test</div>;

export default App;

if (document) {
  ReactDOM.render(<App />, document.getElementById('react-main-mount'));
}