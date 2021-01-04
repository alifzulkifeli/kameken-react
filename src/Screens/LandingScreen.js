import React from 'react'
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const LandingScreen = () => {
  return (
    <div className="p-4">
      <Message variant="info">Add new data?</Message>
      <Link to="/home" className="btn btn-light my-3">
        Go
    </Link>
    </div>
  )
}

export default LandingScreen
