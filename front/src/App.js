import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// routing
import Routes from "./routes/index";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes />
      </Router>
    </Fragment>
  );
}

export default App;
