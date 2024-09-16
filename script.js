
// define elements
const searchInput = document.getElementById('search');
const nothingFound = document.querySelector('.nothing-found');
const resultSection = document.querySelector('.result-section');
const searchBtn = document.querySelector('.search-btn-wrapper');
const searchSuggestions = document.querySelector('.search-suggestions');
const ul = document.querySelector('.search-suggestions ul');

// store the API
let countriesData = [];

fetch("https://restcountries.com/v3.1/all")
.then(obj => obj.json())
.then(processAPI)
.catch(error => console.log(error))

function processAPI(obj) {
   
    console.log(obj[0])
    
    countriesData = obj.map( o => {
        return {
            flag1: o.flags.png,
            flag2: o.flags.svg,
            commonName: o.name.common,
            officialName: o.name.official,
            capital: o.capital,
            language: o.languages,
            population: o.population,
            currency: o.currencies,
            landArea: o.area,
            continent: o.continents
        }
    });
    searchResults();
}
function searchResults() {
    
    // store the suggestion list
    let match = 0; // if there's a match in the data.
    console.log(countriesData)
    searchInput.addEventListener('input', function(e) {
        
        match = 0;
        countriesData.sort((a, b) => a.commonName.localeCompare(b.commonName));
        console.log(countriesData[0])
        countriesData.forEach(function(country){
            console.log(e.target.value)
            if (match < 7 && country.commonName.toString().toLowerCase().startsWith(e.target.value.toString().toLowerCase())) {
                match++;
                searchSuggestions.style.opacity = 1;
                
                const li = document.createElement('li');
                li.textContent = country.commonName;
                ul.appendChild(li);
                searchBtn.addEventListener('click', function() {
                    searchCountry();
                    ul.innerHTML = '';
                    searchSuggestions.style.opacity = 0;
                })
                
                li.addEventListener('click', function(e) {
                    ul.innerHTML = '';
                    searchSuggestions.style.opacity = 0;
                    searchInput.value = e.target.textContent;
                })
            } else if (match <= 0) {
                ul.innerHTML = '';
                searchSuggestions.style.opacity = 0;
            }
            
        })
        console.log(typeof searchInput.value);
        if (e.target.value === '') {
            ul.innerHTML = '';
            searchSuggestions.style.opacity = 0;
        } 
        
      
    })
}

// choose country
function searchCountry() {
    
    // define elemnts
    let countryName = searchInput.value;
    const flagImg = document.querySelector('.img-container img');
    const commonName = document.querySelector('.common-name p');
    const officialName = document.querySelector('.official-name p');
    const capital = document.querySelector('.capital p');
    const language = document.querySelector('.language p');
    const population = document.querySelector('.population p');
    const currency = document.querySelector('.currency p');
    const landArea = document.querySelector('.land-area p');
    const continent = document.querySelector('.continent p');
        
    let match = 0;
    // set the data to the html file.
    countriesData.forEach(function(country) {
        if (countryName.toLowerCase() === country.commonName.toLowerCase()) {
            console.log(country);
            match++;

            // setting value from spcific country
            flagImg.src = country.flag1;
            flagImg.src = country.flag2;
            commonName.textContent = country.commonName;
            officialName.textContent = country.officialName;
            capital.textContent = country.capital;
            language.textContent = dept1(country.language);
            population.textContent = Number(country.population).toLocaleString("en-US");
            currency.textContent = dept2(country.currency);
            landArea.textContent = Number(country.landArea).toLocaleString("en-US") + 'km²';
            continent.textContent = country.continent;

        }
    })
    if (match > 0) {
        nothingFound.style.display = 'none';
        resultSection.style.display = 'block';
    } else {
        nothingFound.style.display = 'block';
        resultSection.style.display = 'none';
        document.querySelector('.nothing-found img').src = './images/Match-not-found.png';
        document.querySelector('.nothing-found p').style.opacity = '1';
    }
}
// get the value of language
function dept1(object) {
    let all = [];
    for (let item in object) {
        all.push(object[item]);
    }
    return [...all];
}
// get the value of currencies
function dept2(object) {
    let all = [];
    for (let item in object) {
        all.push(object[item].name);
        all.push(object[item].symbol);
    }
    return [...all];
}

