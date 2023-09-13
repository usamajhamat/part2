import React, { useState, useEffect } from 'react'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [countryInfo, setCountryInfo] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (searchInput.trim() === '') {
      setError('')
      setCountryInfo([])
      return
    }

    fetch(`https://restcountries.com/v3/name/${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 404) {
          setError('Country not found. Please check the spelling.')
          setCountryInfo([])
          return
        }

        setError('')
        setCountryInfo(data)
        setSelectedCountry(null)
      })
      .catch((error) => console.error('Error:', error))
  }, [searchInput])

  const renderCountryDetails = (country) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Area:</strong> {country.area.toLocaleString()} sq km</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Subregion:</strong> {country.subregion}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} Flag`} />
      </div>
    );
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country)
  };

  return (
    <div>
      Country Information
      <input
        type="text"
        placeholder="Search for a country"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {error && <p>{error}</p>}
      {countryInfo.length === 1 && renderCountryDetails(countryInfo[0])}
      {countryInfo.length > 1 && (
        <div>
          {countryInfo.map((country) => (
            <div key={country.cca2}>
              {country.name.common}
              <button onClick={() => handleShowDetails(country)}>Show Details</button>
            </div>
          ))}
        </div>
      )}
      {selectedCountry && (
        <div>
          <button onClick={() => setSelectedCountry(null)}>Back to List</button>
          {renderCountryDetails(selectedCountry)}
        </div>
      )}
    </div>
  );
}

export default App;
