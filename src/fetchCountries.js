function fetchCountries(query) {
  return fetch(`${URL}/${query}`).then(response => response.json())
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}
  
  export { fetchCountries };