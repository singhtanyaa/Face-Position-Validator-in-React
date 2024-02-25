// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FaceValidation from './FaceValidation';

const App = () => {
  const [validated, setValidated] = useState(false);

  const handleValidationSuccess = () => {
    setValidated(true);
  };

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', paddingTop: '50px' }}>
        <h1>Face Position Validator</h1>
        <Route exact path="/">
          {validated ? (
            <div>
              <h2>Welcome Home!</h2>
              <Link to="/validate">Validate Again</Link>
            </div>
          ) : (
            <FaceValidation onValidationSuccess={handleValidationSuccess} />
          )}
        </Route>
        <Route path="/validate">
          <FaceValidation onValidationSuccess={handleValidationSuccess} />
        </Route>
      </div>
    </Router>
  );
};

export default App;
