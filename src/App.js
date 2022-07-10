import './App.css';
import * as Graphics from './Three/graphics';

function App() {
  return (
    <div className="App">
      <head>
        <title>Portfolio: Ian Afflerbach</title>
      </head>
      <body>
        <header className="App-header">
          <h1>Ian's Portfolio</h1>
        </header>
        <div className="Three-graphics">
          <Graphics.Test/>
        </div>
      </body>
    </div>
  );
}

export default App;
