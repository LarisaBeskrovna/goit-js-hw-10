import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };
  
  refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
  

  function onInput(event) {
    const inputValue = event.target.value.trim();
     
    function clearAll() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

    fetchCountries(inputValue)
      .then(countries =>{
        renderByConditions(countries);
      })
      
          .catch(error => {
            clearAll();
          if(error.message==="404"){
            Notiflix.Notify.failure('Oops, there is no country with that name');
            
          }
          else{
           Notiflix.Notify.failure('Error'.message); 
          }
          });
    
    if (inputValue === '') {
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = '';
    }
  }
  function renderByConditions(countries) {
    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = '';
    } else if (countries.length >= 2 && countries.length <= 10) {
      refs.countryInfo.innerHTML = '';
      renderNameCountries(countries);
    } else if (countries.length === 1) {
      renderNameCountries(countries);
      renderInfoAboutCountry(countries);
    }
  }

  
  function renderNameCountries(countries) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<li class="list-country"><img class="flag-img" src = "${flags.svg}";/><h2 class="country-title">${name.official}</h2></li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
  }
  
  function renderInfoAboutCountry(countries) {
    const markup = countries
      .map(({ capital, population, languages }) => {
        const countryLanguage = Object.values(languages)
        .join(', ');
        return `<p><span class="span">Capital: </span>${capital}</p><p><span class="span">Population:</span> ${population}</p><p><span class="span">Languages:</span> ${countryLanguage}</p>`;
      })
      .join('');
  
    refs.countryInfo.innerHTML = markup;
  }