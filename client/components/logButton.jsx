import React from 'react'
import { Link } from 'react-router-dom'

const LogButton = () => {
  return (
    <>
      <Link to="/logs">
        <button type="button" className="w-full bg-red-300 fixed bottom-0 h-6">
          Logs
        </button>
      </Link>
    </>
  )
}

export default LogButton
