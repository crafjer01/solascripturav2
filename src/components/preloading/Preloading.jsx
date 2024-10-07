import React from 'react'

export const Preloading = () => {
  return (
    <div>
        <video autoPlay muted loop className="preloading">
            <source src="/assets/preloading.mp4" type="video/mp4" />
        </video>
    </div>
  )
}
