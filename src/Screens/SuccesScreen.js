import React from 'react'
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const SuccesScreen = () => {
  return (
    <div className="p-4">
      <Message variant="info">Your Data Has Been Registered</Message>
      <Link to="/landing" className="btn btn-light my-3">
        Go Back
			</Link>
    </div>
  )
}

export default SuccesScreen
