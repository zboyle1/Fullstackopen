const SearchForm = ({searchFilter, handleChange}) =>
  <div>
    find countries: 
    <input
      value={searchFilter}
      onChange={handleChange}
    />
  </div>

export default SearchForm