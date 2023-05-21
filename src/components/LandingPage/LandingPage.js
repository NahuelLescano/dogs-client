import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="container">
      <div className="presentational">
        <h1>Welcome to my dogs page</h1>
        <Link to="/home">
          <button className="button">Enter</button>
        </Link>
      </div>
    </div>
  );
}
