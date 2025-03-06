import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchForm from './components/SearchForm'
import Content from './components/Content'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [currCountry, setCurrCountry] = useState([])

// variable api_key now has the value set in startup
// get inital list of all countries
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => 
        setAllCountries(
          Object.keys(response.data).map(i => response.data[i].name.common)
        )
      )
  }, [])

  // when search updates, update the countries to show
  useEffect(() => {
    // make list empty when search is empty
    if(search === '') {
      setCountriesToShow([])
    } else {
      //filter list based on search
      setCountriesToShow(allCountries.filter(
        country => country.toLowerCase().includes(search.toLowerCase())
      ))
    }
  },[search])

  // get individual country info
  useEffect(() => {
    // if a single item is in the array, set the current country
    if(countriesToShow.length === 1) {
      const name = countriesToShow[0].toLowerCase()
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => setCurrCountry(response.data))
    }
  },[countriesToShow])

  // update search state after each key
  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
  }

  // change list to feature single country
  const handleClick = (name) => {
    const click = () => {
      setCountriesToShow([name])
    }
    return click
  }

  return (
    <>
      <SearchForm
        searchFilter={search}
        handleChange={handleChange}
      />

      <Content
        countriesToShow={countriesToShow}
        handleClick={handleClick}
        currCountry={currCountry}
      />
    </>
  )
}

export default App
