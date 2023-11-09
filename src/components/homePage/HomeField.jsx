import React from 'react'
import LocationPreference from './matchPreferences/LocationPreference'
import NewMatches from './matchPreferences/NewMatches'
import HomePageNotification from './HomePageNotification'

const HomeField = () => {
  return (
    <div>
      <HomePageNotification />
      <LocationPreference />
      <NewMatches />
    </div>

  )
}

export default HomeField