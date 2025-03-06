import CountryInfo from "./CountryInfo"
import CountriesList from "./CountriesList"

const CountriesData= ({countriesToShow, handleClick, currCountry, weather}) => {
  if(countriesToShow.length === 1 && currCountry.name) {
    return (
      <>
        <CountryInfo country={currCountry} />
      </>
    )
  } else if(countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify further
      </div>
    )
  }
  else {
    return (
      <>
        <CountriesList 
          countriesToShow={countriesToShow} 
          handleClick={handleClick} 
        />
      </>
    )
  }
}

export default CountriesData