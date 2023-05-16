const URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(query) {
  return fetch(`${URL}/${query}`).then(response => response.json());
}

export { fetchCountries };