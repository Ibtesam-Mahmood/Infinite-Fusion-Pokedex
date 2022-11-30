import React from 'react'
import PokemonSpinner from '../PokemonSpinner';
import EncounterLocations from '../../services/encounterLocation';

import '../../styles/PokemonStats.scss';

export default function PokemonLocation({pokemon, evolution}) {
  
  const locations = EncounterLocations.getLocationsByID(pokemon?.id ?? 0);

  const loading = pokemon == null

  return (
    <div className='statsContainer container py-1'>
      <h5>Location</h5>
      {
        loading ? <PokemonSpinner scale={0.5} /> : (
          <table className='locationsTable'>
            <thead>
              <tr>
                <th>Location</th>
                <th>Method</th>
                <th>Chance</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {
                locations.length <= 0 ? <tr><td>No locations found...</td></tr> : (
                  locations.map((location, index) => (
                    <tr key={index}>
                      <td className='locationName'>{location.location}</td>
                      <td className='locationMethod'>{location.method}</td>
                      <td>{location.chance}%</td>
                      <td>Lvls: [{location.minLevel}-{location.maxLevel}]</td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}
