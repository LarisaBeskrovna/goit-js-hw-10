
function fetchCountries(query) {
  const queryList = 'name,capital,population,flags,languages';
  return fetch(`https://restcountries.com/v3.1/name/${query}??fullText=false&fields=${queryList}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}  export { fetchCountries };

  