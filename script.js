const MET_NO_API_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';

const homepageFeatured = document.getElementById('homepage-featured');
const featuredCitiesDiv = document.getElementById('featured-cities');
const cityInput = document.getElementById('city-input');
const suggestionsList = document.getElementById('suggestions-list');
const weatherInfoDiv = document.getElementById('weather-info');
const weatherMessageDiv = document.getElementById('weather-message');
const currentWeatherDetailsDiv = document.getElementById('current-weather-details');
const hourlyForecastDetailsDiv = document.getElementById('hourly-forecast-details');
const dailyForecastDetailsDiv = document.getElementById('daily-forecast-details');
const errorMessageDiv = document.getElementById('error-message');
const initialPrompt = weatherMessageDiv ? weatherMessageDiv.querySelector('.initial-prompt') : null;
const backToFeaturedBtn = document.getElementById('back-to-featured-btn');

const showAllCitiesBtn = document.getElementById('show-all-cities-btn');
const allCitiesListContainer = document.getElementById('all-cities-list-container');
const mainHeader = document.getElementById('main-header');

const slideshowLinkSection = document.querySelector('.slideshow-link-section');
const feedbackLinkSection = document.querySelector('.feedback-link-section');
const attributionSection = document.getElementById('attribution-section');


let searchTimeout = null;
let activeSuggestionIndex = -1;


const turkishProvinces = [
    { name: "Adana", lat: 37.00, lon: 35.32 },
    { name: "Adıyaman", lat: 37.76, lon: 38.27 },
    { name: "Afyonkarahisar", lat: 38.78, lon: 30.54 },
    { name: "Ağrı", lat: 39.72, lon: 42.30 },
    { name: "Amasya", lat: 40.66, lon: 35.04 },
    { name: "Ankara", lat: 39.93, lon: 32.86 },
    { name: "Antalya", lat: 36.89, lon: 30.71 },
    { name: "Artvin", lat: 41.18, lon: 41.82 },
    { name: "Aydın", lat: 37.84, lon: 27.45 },
    { name: "Balıkesir", lat: 39.65, lon: 27.89 },
    { name: "Bilecik", lat: 40.06, lon: 29.97 },
    { name: "Bingöl", lat: 39.03, lon: 40.50 },
    { name: "Bitlis", lat: 38.40, lon: 42.10 },
    { name: "Bolu", lat: 40.74, lon: 31.57 },
    { name: "Burdur", lat: 37.20, lon: 30.29 },
    { name: "Bursa", lat: 40.19, lon: 29.06 },
    { name: "Çanakkale", lat: 40.15, lon: 26.40 },
    { name: "Çankırı", lat: 40.60, lon: 33.61 },
    { name: "Çorum", lat: 40.55, lon: 34.95 },
    { name: "Denizli", lat: 37.78, lon: 29.09 },
    { name: "Diyarbakır", lat: 37.90, lon: 40.23 },
    { name: "Edirne", lat: 41.67, lon: 26.56 },
    { name: "Elazığ", lat: 38.68, lon: 39.22 },
    { name: "Erzincan", lat: 39.74, lon: 39.50 },
    { name: "Erzurum", lat: 39.90, lon: 41.27 },
    { name: "Eskişehir", lat: 39.77, lon: 30.52 },
    { name: "Gaziantep", lat: 37.06, lon: 37.38 },
    { name: "Giresun", lat: 40.91, lon: 38.39 },
    { name: "Gümüşhane", lat: 40.47, lon: 39.49 },
    { name: "Hakkari", lat: 37.58, lon: 43.72 },
    { name: "Hatay", lat: 36.20, lon: 36.17 },
    { name: "Isparta", lat: 37.76, lon: 30.55 },
    { name: "Mersin", lat: 36.80, lon: 34.63 },
    { name: "İstanbul", lat: 41.01, lon: 28.98 },
    { name: "İzmir", lat: 38.42, lon: 27.14 },
    { name: "Kars", lat: 40.60, lon: 43.09 },
    { name: "Kastamonu", lat: 41.38, lon: 33.79 },
    { name: "Kayseri", lat: 38.73, lon: 35.49 },
    { name: "Kırklareli", lat: 41.73, lon: 27.22 },
    { name: "Kırşehir", lat: 39.14, lon: 34.17 },
    { name: "Kocaeli", lat: 40.77, lon: 29.94 },
    { name: "Konya", lat: 37.87, lon: 32.48 },
    { name: "Kütahya", lat: 39.42, lon: 29.98 },
    { name: "Malatya", lat: 38.35, lon: 38.32 },
    { name: "Manisa", lat: 38.62, lon: 27.43 },
    { name: "Kahramanmaraş", lat: 37.58, lon: 36.94 },
    { name: "Mardin", lat: 37.32, lon: 40.74 },
    { name: "Muğla", lat: 37.22, lon: 28.36 },
    { name: "Muş", lat: 38.94, lon: 41.49 },
    { name: "Nevşehir", lat: 38.63, lon: 34.68 },
    { name: "Niğde", lat: 37.98, lon: 34.68 },
    { name: "Ordu", lat: 41.00, lon: 37.88 },
    { name: "Rize", lat: 41.03, lon: 40.52 },
    { name: "Sakarya", lat: 40.76, lon: 30.41 },
    { name: "Samsun", lat: 41.29, lon: 36.33 },
    { name: "Siirt", lat: 37.93, lon: 41.93 },
    { name: "Sinop", lat: 42.03, lon: 35.15 },
    { name: "Sivas", lat: 39.75, lon: 37.02 },
    { name: "Tekirdağ", lat: 40.98, lon: 27.51 },
    { name: "Tokat", lat: 40.32, lon: 36.55 },
    { name: "Trabzon", lat: 41.00, lon: 39.72 },
    { name: "Tunceli", lat: 39.10, lon: 39.25 },
    { name: "Şanlıurfa", lat: 37.15, lon: 38.80 },
    { name: "Uşak", lat: 38.68, lon: 29.40 },
    { name: "Van", lat: 38.50, lon: 43.38 },
    { name: "Yozgat", lat: 39.82, lon: 34.80 },
    { name: "Zonguldak", lat: 41.44, lon: 31.79 },
    { name: "Aksaray", lat: 38.36, lon: 34.03 },
    { name: "Bayburt", lat: 40.25, lon: 40.22 },
    { name: "Karaman", lat: 37.18, lon: 33.22 },
    { name: "Kırıkkale", lat: 39.84, lon: 33.50 },
    { name: "Batman", lat: 37.88, lon: 41.14 },
    { name: "Şırnak", lat: 37.51, lon: 42.46 },
    { name: "Bartın", lat: 41.76, lon: 32.34 },
    { name: "Ardahan", lat: 41.11, lon: 42.82 },
    { name: "Iğdır", lat: 39.92, lon: 44.04 },
    { name: "Yalova", lat: 40.66, lon: 29.28 },
    { name: "Karabük", lat: 41.19, lon: 32.62 },
    { name: "Kilis", lat: 36.71, lon: 37.12 },
    { name: "Osmaniye", lat: 37.07, lon: 36.24 },
    { name: "Düzce", lat: 40.84, lon: 31.16 }
];

const prominentCities = [
    turkishProvinces.find(p => p.name === "İstanbul"),
    turkishProvinces.find(p => p.name === "Ankara"),
    turkishProvinces.find(p => p.name === "İzmir"),
    turkishProvinces.find(p => p.name === "Antalya"),
    turkishProvinces.find(p => p.name === "Bursa"),
    turkishProvinces.find(p => p.name === "Adana"),
    turkishProvinces.find(p => p.name === "Gaziantep"),
    turkishProvinces.find(p => p.name === "Diyarbakır"),
    turkishProvinces.find(p => p.name === "Kayseri"),
    turkishProvinces.find(p => p.name === "Mersin"),
].filter(city => city !== undefined);


function normalizeTurkish(str) {
    if (!str) return '';
    str = str.toLowerCase();
    str = str.replace(/ı/g, 'i');
    str = str.replace(/ğ/g, 'g');
    str = str.replace(/ş/g, 's');
    str = str.replace(/ç/g, 'c');
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return str;
}

function getWeatherDescription(symbolCode) {
    if (!symbolCode) return 'Unknown';

    const descriptions = {
        'clearsky_day': 'Clear sky', 'clearsky_night': 'Clear sky', 'clearsky_polartwilight': 'Clear sky',
        'cloudy': 'Cloudy',
        'fair_day': 'Fair', 'fair_night': 'Fair', 'fair_polartwilight': 'Fair',
        'fog': 'Foggy',
        'heavyrain': 'Heavy rain', 'heavyrainandthunder': 'Heavy rain and thunder',
        'heavyrainshowers_day': 'Heavy rain showers', 'heavyrainshowers_night': 'Heavy rain showers', 'heavyrainshowers_polartwilight': 'Heavy rain showers', 'heavyrainshowersandthunder_day': 'Heavy rain showers and thunder', 'heavyrainshowersandthunder_night': 'Heavy rain showers and thunder', 'heavyrainshowersandthunder_polartwilight': 'Heavy rain showers and thunder',
        'heavysleet': 'Heavy sleet', 'heavysleetandthunder': 'Heavy sleet and thunder',
        'heavysleetshowers_day': 'Heavy sleet showers', 'heavysleetshowers_night': 'Heavy sleet showers', 'heavysleetshowers_polartwilight': 'Heavy sleet showers',
        'heavysnow': 'Heavy snow', 'heavysnowandthunder': 'Heavy snow and thunder',
        'heavysnowshowers_day': 'Heavy snow showers', 'heavysnowshowers_night': 'Heavy snow showers', 'heavysnowshowers_polartwilight': 'Heavy snow showers',
        'lightrain': 'Light rain', 'lightrainandthunder': 'Light rain and thunder',
        'lightrainshowers_day': 'Light rain showers', 'lightrainshowers_night': 'Light rain showers', 'lightrainshowers_polartwilight': 'Light rain showers', 'lightrainshowersandthunder_day': 'Light rain showers and thunder', 'lightrainshowersandthunder_night': 'Light rain showers and thunder', 'lightrainshowersandthunder_polartwilight': 'Light rain showers and thunder',
        'lightsleet': 'Light sleet', 'lightsleetandthunder': 'Light sleet and thunder',
        'lightsleetshowers_day': 'Light sleet showers', 'lightsleetshowers_night': 'Light sleet showers', 'lightsleetshowers_polartwilight': 'Light sleet showers',
        'lightsnow': 'Light snow', 'lightsnowandthunder': 'Light snow and thunder',
        'lightsnowshowers_day': 'Light snow showers', 'lightsnowshowers_night': 'Light snow showers', 'lightsnowshowers_polartwilight': 'Light snow showers',
        'partlycloudy_day': 'Partly cloudy', 'partlycloudy_night': 'Partly cloudy', 'partlycloudy_polartwilight': 'Partly cloudy',
        'rain': 'Rain', 'rainandthunder': 'Rain and thunder',
        'rainshowers_day': 'Rain showers', 'rainshowers_night': 'Rain showers', 'rainshowers_polartwilight': 'Rain showers', 'rainshowersandthunder_day': 'Rain showers and thunder', 'rainshowersandthunder_night': 'Rain showers and thunder', 'rainshowersandthunder_polartwilight': 'Rain showers and thunder',
        'sleet': 'Sleet', 'sleetandthunder': 'Sleet and thunder',
        'sleetshowers_day': 'Sleet showers', 'sleetshowers_night': 'Sleet showers', 'sleetshowers_polartwilight': 'Sleet showers',
        'snow': 'Snow', 'snowandthunder': 'Snow and thunder',
        'snowshowers_day': 'Snow showers', 'snowshowers_night': 'Snow showers', 'snowshowers_polartwilight': 'Snow showers',
         'partlycloudy': 'Partly cloudy',
         'fair': 'Fair',
         'clearsky': 'Clear sky',
         'rainshowers': 'Rain showers',
         'sleetshowers': 'Sleet showers',
         'snowshowers': 'Snow showers',
         'lightrainshowers': 'Light rain showers',
         'heavysnowshowers': 'Heavy snow showers',
         'heavyrainshowers': 'Heavy rain showers',
         'lightsleetshowers': 'Light sleet showers',
         'lightsnowshowers': 'Light snow showers',
         'heavysleetshowers': 'Heavy sleet showers',
          'thunder': 'Thunderstorm',

    };

    let description = descriptions[symbolCode];
    if (description) {
        return description;
    }

    const cleanSymbolCode = symbolCode ? symbolCode.replace(/_(day|night|polartwilight)$/, '') : 'unknown';
     description = descriptions[cleanSymbolCode];
    if (description) {
        return description;
    }

    return cleanSymbolCode.replace(/_/g, ' ').trim();
}

function formatVisibility(visibilityInMeters) {
    if (visibilityInMeters === undefined) return 'Unknown';
    if (visibilityInMeters === 99999) return '> 100 km';
    if (visibilityInMeters >= 1000) {
        return (visibilityInMeters / 1000).toFixed(1) + ' km';
    } else {
        return visibilityInMeters + ' m';
    }
}

let backButtonAction = showFeaturedCitiesView;


function showFeaturedCitiesView() {
    if (homepageFeatured) homepageFeatured.style.display = 'block';
    if (weatherInfoDiv) weatherInfoDiv.style.display = 'none';
    if (weatherMessageDiv) {
         weatherMessageDiv.innerHTML = '<p class="initial-prompt">Search for a city above or select one of the featured cities.</p>';
         weatherMessageDiv.style.display = 'flex';
    }
    if (currentWeatherDetailsDiv) currentWeatherDetailsDiv.style.display = 'none';
    if (hourlyForecastDetailsDiv) hourlyForecastDetailsDiv.style.display = 'none';
    if (dailyForecastDetailsDiv) dailyForecastDetailsDiv.style.display = 'none';
    if (allCitiesListContainer) allCitiesListContainer.style.display = 'none';

    if (slideshowLinkSection) slideshowLinkSection.style.display = 'block';
    if (feedbackLinkSection) feedbackLinkSection.style.display = 'block';
    if (attributionSection) attributionSection.style.display = 'block';


    if (errorMessageDiv) errorMessageDiv.textContent = '';
    if (cityInput) cityInput.value = '';
    if (suggestionsList) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
    }
    activeSuggestionIndex = -1;
    if (backToFeaturedBtn) {
        backToFeaturedBtn.style.display = 'none';
        backButtonAction = showFeaturedCitiesView;
        backToFeaturedBtn.textContent = '← Homepage';
    }
}

function showWeatherDetailsView() {
    if (homepageFeatured) homepageFeatured.style.display = 'none';
    if (weatherInfoDiv) weatherInfoDiv.style.display = 'block';
    if (weatherMessageDiv) {
        weatherMessageDiv.innerHTML = '<div class="loading-message">Loading...</div>';
        weatherMessageDiv.style.display = 'flex';
    }
    if (currentWeatherDetailsDiv) currentWeatherDetailsDiv.style.display = 'none';
    if (hourlyForecastDetailsDiv) hourlyForecastDetailsDiv.style.display = 'none';
    if (dailyForecastDetailsDiv) dailyForecastDetailsDiv.style.display = 'none';
    if (allCitiesListContainer) allCitiesListContainer.style.display = 'none';

    if (slideshowLinkSection) slideshowLinkSection.style.display = 'none';
    if (feedbackLinkSection) feedbackLinkSection.style.display = 'none';
    if (attributionSection) attributionSection.style.display = 'none';


    if (suggestionsList) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
    }
    activeSuggestionIndex = -1;

    if (backToFeaturedBtn) backToFeaturedBtn.style.display = 'inline-block';
}

function showAllCitiesList() {
    if (homepageFeatured) homepageFeatured.style.display = 'none';
    if (weatherInfoDiv) weatherInfoDiv.style.display = 'none';
    if (weatherMessageDiv) weatherMessageDiv.style.display = 'none';
    if (currentWeatherDetailsDiv) currentWeatherDetailsDiv.style.display = 'none';
    if (hourlyForecastDetailsDiv) hourlyForecastDetailsDiv.style.display = 'none';
    if (dailyForecastDetailsDiv) dailyForecastDetailsDiv.style.display = 'none';
    if (suggestionsList) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
    }
     if (errorMessageDiv) errorMessageDiv.textContent = '';
     if (cityInput) cityInput.value = '';

     if (slideshowLinkSection) slideshowLinkSection.style.display = 'none';
     if (feedbackLinkSection) feedbackLinkSection.style.display = 'none';
     if (attributionSection) attributionSection.style.display = 'none';


    activeSuggestionIndex = -1;


    if (allCitiesListContainer) {
        allCitiesListContainer.style.display = 'block';
        displayAllCities(turkishProvinces);
    }

    if (backToFeaturedBtn) {
        backToFeaturedBtn.style.display = 'inline-block';
        backButtonAction = showFeaturedCitiesView;
        backToFeaturedBtn.textContent = '← Homepage';
    }
}


async function loadFeaturedCitiesWeather() {
    if (featuredCitiesDiv) featuredCitiesDiv.innerHTML = '<div class="loading-message">Loading...</div>';

    const fetchPromises = prominentCities.map(city =>
        fetch(`${MET_NO_API_URL}?lat=${city.lat}&lon=${city.lon}`, {
             headers: { 'User-Agent': 'WeatherAppProject/1.0 (your-contact-email@example.com)' }
        })
        .then(response => {
             if (!response.ok) {
                 return response.text().then(text => { throw new Error(`HTTP ${response.status}: ${text}`); });
             }
             return response.json();
         })
        .then(data => ({ city, data }))
        .catch(error => {
            console.error(`Error fetching weather for ${city.name}:`, error);
            return { city, error };
        })
    );

    const results = await Promise.all(fetchPromises);

    if (featuredCitiesDiv) featuredCitiesDiv.innerHTML = '';

    results.forEach(result => {
        const city = result.city;
        const data = result.data;
        const error = result.error;

        const cityItem = document.createElement('div');
        cityItem.classList.add('featured-city-item');

        cityItem.innerHTML = `<h5>${city.name}</h5>`;

        if (error) {
             cityItem.innerHTML += `<p class="error">Info not available</p>`;
             cityItem.style.backgroundColor = '#f8d7da';
        } else if (data && data.properties && data.properties.timeseries && data.properties.timeseries.length > 0) {
            const currentForecast = data.properties.timeseries[0];
            const instantDetails = currentForecast && currentForecast.data && currentForecast.data.instant ? currentForecast.data.instant.details : undefined;


            const currentSummary = currentForecast && currentForecast.data ? (currentForecast.data.next_1_hours || currentForecast.data.next_6_hours || currentForecast.data.next_12_hours) : undefined;

            const weatherSymbolCode = currentSummary ? currentSummary.summary.symbol_code : 'unknown';
            const weatherDescription = getWeatherDescription(weatherSymbolCode);

             let temperature = 'Unknown';
             if(instantDetails && instantDetails.air_temperature !== undefined) {
                  temperature = instantDetails.air_temperature.toFixed(0) + '°C';
             }


             cityItem.innerHTML += `
                 <img src="./icons/${weatherSymbolCode}.svg" alt="${weatherDescription}" class="weather-icon">
                 <p>${temperature}</p>
             `;

             cityItem.addEventListener('click', () => {
                 const selectedCityName = city.name;
                 if (cityInput) cityInput.value = selectedCityName;
                 if (suggestionsList) {
                    suggestionsList.innerHTML = '';
                    suggestionsList.style.display = 'none';
                 }
                 activeSuggestionIndex = -1;
                 getWeatherData(city.lat, city.lon, selectedCityName, showFeaturedCitiesView, '← Homepage');
             });

        } else {
             cityItem.innerHTML += `<p class="error">No data</p>`;
             cityItem.style.backgroundColor = '#fff3cd';
        }

        if (featuredCitiesDiv) featuredCitiesDiv.appendChild(cityItem);
    });
}


if (cityInput) {
    cityInput.addEventListener('focus', function() {
        this.select();
    });

    cityInput.addEventListener('keydown', function(e) {
        const items = suggestionsList ? suggestionsList.querySelectorAll('li') : [];
        if (items.length === 0) {
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (activeSuggestionIndex !== -1) {
                items[activeSuggestionIndex].classList.remove('selected-suggestion');
            }
            activeSuggestionIndex = (activeSuggestionIndex < items.length - 1) ? activeSuggestionIndex + 1 : items.length - 1;

            items[activeSuggestionIndex].classList.add('selected-suggestion');
            items[activeSuggestionIndex].scrollIntoView({ block: 'nearest' });

        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeSuggestionIndex !== -1) {
                items[activeSuggestionIndex].classList.remove('selected-suggestion');
            }
            activeSuggestionIndex = (activeSuggestionIndex > 0) ? activeSuggestionIndex - 1 : -1;

            if (activeSuggestionIndex !== -1) {
                 items[activeSuggestionIndex].classList.add('selected-suggestion');
                 items[activeSuggestionIndex].scrollIntoView({ block: 'nearest' });
             }


        } else if (e.key === 'Enter') {
            if (activeSuggestionIndex !== -1 && activeSuggestionIndex < items.length) {
                e.preventDefault();
                items[activeSuggestionIndex].click();
            }
        }
    });

    cityInput.addEventListener('input', function() {
        const query = this.value.trim();
        clearTimeout(searchTimeout);
        activeSuggestionIndex = -1;
        if (errorMessageDiv) errorMessageDiv.textContent = '';

        const normalizedQuery = normalizeTurkish(query);

        if (normalizedQuery.length > 1) {
            if (suggestionsList) suggestionsList.style.display = 'block';

            searchTimeout = setTimeout(() => {
                filterProvinces(normalizedQuery);
            }, 200);
        } else {
            if (suggestionsList) {
                suggestionsList.innerHTML = '';
                suggestionsList.style.display = 'none';
            }
            if (query.length === 0) {
                 showFeaturedCitiesView();
            }
        }
    });

} else {
    console.error("Error: cityInput element not found!");
}


document.addEventListener('click', function(event) {
    if (cityInput && suggestionsList && !cityInput.contains(event.target) && !suggestionsList.contains(event.target)) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
        activeSuggestionIndex = -1;
    }
});

function filterProvinces(normalizedQuery) {
    const filteredProvinces = turkishProvinces.filter(province =>
        normalizeTurkish(province.name).includes(normalizedQuery)
    );
    displaySuggestions(filteredProvinces);
}

function displaySuggestions(suggestions) {
    if (suggestionsList) suggestionsList.innerHTML = '';
    activeSuggestionIndex = -1;

    if (suggestions && suggestions.length > 0 && suggestionsList) {
        const limitedSuggestions = suggestions.slice(0, 15);
        limitedSuggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion.name;
            li.dataset.lat = suggestion.lat;
            li.dataset.lon = suggestion.lon;
            li.dataset.cityName = suggestion.name;
            li.addEventListener('click', function() {
                const lat = this.dataset.lat;
                const lon = this.dataset.lon;
                const cityName = this.dataset.cityName;
                if (cityInput) cityInput.value = cityName;
                 if (suggestionsList) {
                     suggestionsList.innerHTML = '';
                     suggestionsList.style.display = 'none';
                 }
                 activeSuggestionIndex = -1;
                getWeatherData(lat, lon, cityName, showFeaturedCitiesView, '← Homepage');
            });
             if(suggestionsList) suggestionsList.appendChild(li);
        });
        if (suggestionsList) suggestionsList.style.display = 'block';
    } else if (suggestionsList) {
         suggestionsList.style.display = 'none';
    }
}


function updateScrollArrows(listElement, leftArrow, rightArrow) {
    if (!listElement || !leftArrow || !rightArrow) return;

    const { scrollLeft, scrollWidth, clientWidth } = listElement;

    leftArrow.style.display = scrollLeft > 0 ? 'flex' : 'none';

    rightArrow.style.display = scrollLeft + clientWidth + 1 < scrollWidth ? 'flex' : 'none';
}

function setupScrollArrows(listElement, leftArrow, rightArrow) {
    if (!listElement || !leftArrow || !rightArrow) return;

    const scrollAmount = listElement.clientWidth * 0.8;

    leftArrow.addEventListener('click', () => {
        listElement.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        listElement.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    listElement.addEventListener('scroll', () => {
        updateScrollArrows(listElement, leftArrow, rightArrow);
    });

    setTimeout(() => {
         updateScrollArrows(listElement, leftArrow, rightArrow);
     }, 150);
}


async function getWeatherData(lat, lon, cityName, backAction = showFeaturedCitiesView, backText = '← Homepage') {
     showWeatherDetailsView();


    if (errorMessageDiv) errorMessageDiv.textContent = '';

    const requestUrl = `${MET_NO_API_URL}?lat=${lat}&lon=${lon}`;
    try {
        const response = await fetch(requestUrl, {
            headers: { 'User-Agent': 'WeatherAppProject/1.0 (your-contact-email@example.com)' }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error Status: ${response.status}, Text: ${errorText}`);
            throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayWeatherData(data, cityName);

        backButtonAction = backAction;
        if (backToFeaturedBtn) backToFeaturedBtn.textContent = backText;


    } catch (error) {
        console.error("Error fetching weather data:", error);
        if (weatherMessageDiv) {
            weatherMessageDiv.innerHTML = `<p>Could not retrieve weather information: ${error.message}</p>`;
            weatherMessageDiv.style.display = 'flex';
        }
        if (currentWeatherDetailsDiv) currentWeatherDetailsDiv.style.display = 'none';
        if (hourlyForecastDetailsDiv) hourlyForecastDetailsDiv.style.display = 'none';
        if (dailyForecastDetailsDiv) dailyForecastDetailsDiv.style.display = 'none';


        if (backToFeaturedBtn) backToFeaturedBtn.style.display = 'inline-block';
         backButtonAction = showFeaturedCitiesView;
         if (backToFeaturedBtn) backToFeaturedBtn.textContent = '← Homepage';
    }
}

function displayWeatherData(data, cityName) {
    if (weatherMessageDiv) weatherMessageDiv.style.display = 'none';
    if (currentWeatherDetailsDiv) currentWeatherDetailsDiv.style.display = 'block';

    if (!data || !data.properties || !data.properties.timeseries || data.properties.timeseries.length === 0) {
        if (weatherMessageDiv) {
            weatherMessageDiv.innerHTML = `<p>Weather information not found for ${cityName} or format is unexpected.</p>`;
            weatherMessageDiv.style.display = 'flex';
        }
        if (currentWeatherDetailsDiv) currentWeatherDetailsDiv.style.display = 'none';
        if (hourlyForecastDetailsDiv) hourlyForecastDetailsDiv.style.display = 'none';
        if (dailyForecastDetailsDiv) dailyForecastDetailsDiv.style.display = 'none';


        return;
    }

    if (currentWeatherDetailsDiv) {
         let currentHtmlContent = `<h4>${cityName}</h4>`;
         const currentForecast = data.properties.timeseries[0];
         const instantDetails = currentForecast && currentForecast.data && currentForecast.data.instant ? currentForecast.data.instant.details : undefined;


         const currentSummary = currentForecast && currentForecast.data ? (currentForecast.data.next_1_hours || currentForecast.data.next_6_hours || currentForecast.data.next_12_hours) : undefined;

         const weatherSymbolCodeCurrent = currentSummary ? currentSummary.summary.symbol_code : 'unknown';
         const weatherDescriptionCurrent = getWeatherDescription(weatherSymbolCodeCurrent);

         let temperature = 'Unknown';
         let humidity = undefined;
         let visibility = undefined;

         if (instantDetails) {
             temperature = instantDetails.air_temperature !== undefined ? instantDetails.air_temperature.toFixed(0) + '°C' : 'Unknown';
             humidity = instantDetails.relative_humidity;
             visibility = instantDetails.horizontal_visibility;
         }


         currentHtmlContent += `
             <div class="current-weather-summary">
                  <div class="weather-condition">
                     <img src="./icons/${weatherSymbolCodeCurrent}.svg" alt="${weatherDescriptionCurrent}" class="weather-icon current-icon">
                     <span>${weatherDescriptionCurrent}</span>
                  </div>
                 <p class="current-temp">${temperature}</p>
             </div>
             ${humidity !== undefined ? `<p class="humidity-info">Humidity: ${humidity.toFixed(0)}%</p>` : ''}
             ${visibility !== undefined ? `<p>Visibility: ${formatVisibility(visibility)}</p>` : ''}
         `;
        currentWeatherDetailsDiv.innerHTML = currentHtmlContent;
    }


    const hourlyListElement = hourlyForecastDetailsDiv ? hourlyForecastDetailsDiv.querySelector('.hourly-forecast-list') : null;
    if (hourlyForecastDetailsDiv && hourlyListElement) {
        hourlyListElement.innerHTML = '';
        const hourlyForecasts = data.properties.timeseries.slice(1, 9);

        if (hourlyForecasts.length > 0) {
            hourlyForecastDetailsDiv.style.display = 'block';
            hourlyListElement.scrollLeft = 0;
            const hourlySectionTitle = hourlyForecastDetailsDiv.querySelector('h4');
            if(hourlySectionTitle) hourlySectionTitle.textContent = 'Hourly Forecast';
            hourlyForecasts.forEach(forecast => {
                const forecastInstantDetails = forecast && forecast.data && forecast.data.instant ? forecast.data.instant.details : undefined;
                const forecastTemperature = forecastInstantDetails && forecastInstantDetails.air_temperature !== undefined ? forecastInstantDetails.air_temperature : undefined;

                const forecastTime = new Date(forecast.time);
                const forecastSummary = forecast && forecast.data ? (forecast.data.next_1_hours || forecast.data.next_6_hours || forecast.data.next_12_hours) : undefined;

                const forecastSymbolCode = forecastSummary ? forecastSummary.summary.symbol_code : 'unknown';
                const weatherDescription = getWeatherDescription(forecastSymbolCode);

                const options = { hour: '2-digit', minute: '2-digit', hour12: false };
                const formattedTime = forecastTime.toLocaleTimeString('en-US', options);

                const li = document.createElement('li');
                li.classList.add('hourly-forecast-item');
                li.innerHTML = `
                    <p>${formattedTime}</p>
                    <p>${forecastTemperature !== undefined ? forecastTemperature.toFixed(0) + '°C' : 'Unknown'}</p>
                    <img src="./icons/${forecastSymbolCode}.svg" alt="${weatherDescription}" class="weather-icon hourly-icon">
                `;
                hourlyListElement.appendChild(li);
            });
            const hourlyLeftArrow = hourlyForecastDetailsDiv.querySelector('.left-arrow');
            const hourlyRightArrow = hourlyForecastDetailsDiv.querySelector('.right-arrow');
            setupScrollArrows(hourlyListElement, hourlyLeftArrow, hourlyRightArrow);

        } else {
            hourlyForecastDetailsDiv.style.display = 'none';
        }
    } else if (hourlyForecastDetailsDiv) {
         hourlyForecastDetailsDiv.style.display = 'none';
    }


    const dailyListElement = dailyForecastDetailsDiv ? dailyForecastDetailsDiv.querySelector('.daily-forecast-list') : null;
    if (dailyForecastDetailsDiv && dailyListElement) {
        dailyListElement.innerHTML = '';
        const dailyData = new Map();
        const todayUTCString = new Date().toISOString().split('T')[0];
        let dayCount = 0;

        for (let i = 1; i < data.properties.timeseries.length; i++) {
            const forecast = data.properties.timeseries[i];
            const forecastTime = new Date(forecast.time);
            const forecastUTCString = forecastTime.toISOString().split('T')[0];

            if (forecastUTCString > todayUTCString) {
                if (!dailyData.has(forecastUTCString)) {
                    if (dayCount >= 9) {
                        break;
                    }
                    dailyData.set(forecastUTCString, []);
                    dayCount++;
                }
                dailyData.get(forecastUTCString).push(forecast);
            }
        }

        if (dailyData.size > 0) {
             dailyForecastDetailsDiv.style.display = 'block';
             dailyListElement.scrollLeft = 0;
             const dailySectionTitle = dailyForecastDetailsDiv.querySelector('h4');
             if(dailySectionTitle) dailySectionTitle.textContent = 'Daily Forecast';
            dailyData.forEach((forecastsForDay, dateString) => {
                let minTemp = Infinity;
                let maxTemp = -Infinity;
                let representativeForecast = null;
                let minTimeDiffToNoon = Infinity;

                forecastsForDay.forEach(forecast => {
                    const temp = forecast.data && forecast.data.instant && forecast.data.instant.details ? forecast.data.instant.details.air_temperature : undefined;


                    if (temp !== undefined) {
                        if (temp < minTemp) minTemp = temp;
                        if (temp > maxTemp) maxTemp = temp;
                    }

                    const forecastTime = new Date(forecast.time);
                    const noonToday = new Date(forecastTime.getFullYear(), forecastTime.getMonth(), forecastTime.getDate(), 12, 0, 0);
                    const timeDiff = Math.abs(forecastTime.getTime() - noonToday.getTime());

                    if (timeDiff < minTimeDiffToNoon) {
                        minTimeDiffToNoon = timeDiff;
                        representativeForecast = forecast;
                    }
                });

                let dailyMinTemp = (minTemp === Infinity) ? undefined : minTemp;
                let dailyMaxTemp = (maxTemp === -Infinity) ? undefined : maxTemp;
                let dailyWeatherDescription = 'Unknown';
                let dailyWeatherSymbolCode = 'unknown';

                if (representativeForecast) {
                    const forecastSummary = representativeForecast.data && representativeForecast.data.next_12_hours ? representativeForecast.data.next_12_hours :
                                             (representativeForecast.data && representativeForecast.data.next_6_hours ? representativeForecast.data.next_6_hours :
                                             (representativeForecast.data && representativeForecast.data.next_1_hours ? representativeForecast.data.next_1_hours : undefined));

                     dailyWeatherSymbolCode = forecastSummary ? forecastSummary.summary.symbol_code : 'unknown';
                     dailyWeatherDescription = getWeatherDescription(dailyWeatherSymbolCode);
                }


                const dailyDate = new Date(dateString + 'T00:00:00Z');
                const dateOptions = { weekday: 'short' };
                const formattedDay = dailyDate.toLocaleDateString('en-US', dateOptions);

                const li = document.createElement('li');
                li.classList.add('daily-forecast-item');
                li.innerHTML = `
                    <p>${formattedDay}</p>
                    <p>Min: ${dailyMinTemp !== undefined ? dailyMinTemp.toFixed(0) + '°C' : 'Unknown'}</p>
                    <p>Max: ${dailyMaxTemp !== undefined ? dailyMaxTemp.toFixed(0) + '°C' : 'Unknown'}</p>
                    <img src="./icons/${dailyWeatherSymbolCode}.svg" alt="${dailyWeatherDescription}" class="weather-icon daily-icon">
                `;
                 dailyListElement.appendChild(li);
            });
            const dailyLeftArrow = dailyForecastDetailsDiv.querySelector('.left-arrow');
            const dailyRightArrow = dailyForecastDetailsDiv.querySelector('.right-arrow');
            setupScrollArrows(dailyListElement, dailyLeftArrow, dailyRightArrow);

        } else {
            dailyForecastDetailsDiv.style.display = 'none';
        }
    } else if (dailyForecastDetailsDiv) {
        dailyForecastDetailsDiv.style.display = 'none';
    }

}

function displayAllCities(cities) {
     if (!allCitiesListContainer) return;

     allCitiesListContainer.innerHTML = '';
     allCitiesListContainer.innerHTML += '<h4>All Cities</h4>';

     const ul = document.createElement('ul');
     ul.classList.add('all-cities-list');

     const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' }));


     sortedCities.forEach(city => {
         const li = document.createElement('li');
         li.textContent = city.name;
         li.dataset.lat = city.lat;
         li.dataset.lon = city.lon;
         li.dataset.cityName = city.name;

         li.addEventListener('click', function() {
             const lat = this.dataset.lat;
             const lon = this.dataset.lon;
             const cityName = this.dataset.cityName;
             if (cityInput) cityInput.value = cityName;
              if (allCitiesListContainer) allCitiesListContainer.style.display = 'none';
              if (suggestionsList) {
                suggestionsList.innerHTML = '';
                suggestionsList.style.display = 'none';
              }
              activeSuggestionIndex = -1;
             getWeatherData(lat, lon, cityName, showAllCitiesList, '← All Cities');
         });

         ul.appendChild(li);
     });

     allCitiesListContainer.appendChild(ul);
}


document.addEventListener('DOMContentLoaded', () => {
    showFeaturedCitiesView();
    loadFeaturedCitiesWeather();

    if (mainHeader) {
        mainHeader.addEventListener('click', () => {
            showFeaturedCitiesView();
        });
    } else {
        console.error("Error: mainHeader element not found!");
    }

    if (showAllCitiesBtn) {
        showAllCitiesBtn.addEventListener('click', () => {
            showAllCitiesList();
        });
    } else {
        console.error("Error: showAllCitiesBtn element not found!");
    }

    const goToSlideshowBtn = document.getElementById('go-to-slideshow-btn');
    if (goToSlideshowBtn) {
        goToSlideshowBtn.addEventListener('click', () => {
            window.location.href = 'slideshow.html';
        });
    }

     const feedbackLinkElement = feedbackLinkSection ? feedbackLinkSection.querySelector('a') : null;
     if (feedbackLinkSection) {
         feedbackLinkSection.addEventListener('click', (e) => {

         });
     } else {
         console.warn("Feedback link section not found.");
     }

});

if (backToFeaturedBtn) {
    backToFeaturedBtn.addEventListener('click', () => {
        backButtonAction();
    });
} else {
     console.error("Error: backToFeaturedBtn element not found!");
}