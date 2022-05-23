import React from 'react'

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-item-center">
        <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}
