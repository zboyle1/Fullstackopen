const CountriesList = ({countriesToShow, handleClick}) =>
  <>
    {countriesToShow.map(country =>
      <p key={country}>{country} 
        <button onClick={handleClick(country)}>Show me</button>
      </p>
    )}
  </>
export default CountriesList