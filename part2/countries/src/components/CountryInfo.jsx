const CountryInfo = ({country}) => {
  const capital = country.capital ? country.capital[0] : 'none'

  return(
    <div>
      <h1>{country.name.common}</h1>
      Capital: {capital}
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map(i =>
          <li key={country.languages[i]}>{country.languages[i]}</li>
        )}
      </ul>
      <img src={country.flags.png} />
    </div>
  )
}

export default CountryInfo