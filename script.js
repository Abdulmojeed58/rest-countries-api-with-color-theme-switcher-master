const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const body = $("body")
const filterBtn = $(".region .button")
const list = $(".region .list")
const input = $('[data-input]')
const element = $('.countries')
const regionList = $$('ul li')
// console.log(regionList)


// //////TOGGLE LIGHT AND DARK MODE ///////
$('.dark-light').addEventListener("click", ()=>{
    body.classList.toggle('light-mode')
})
filterBtn.addEventListener("click", ()=>{
    list.classList.toggle("active")
})







// https://restcountries.com/v2/all?fields=name,capital,currencies,population,region,subregion,topleveldomain,nativename,flag




//////FETCH DATA FROM COUNTRY API ///////////
async function fetchCountryData(){
    const res = await fetch("https://restcountries.com/v2/all?fields=name,capital,currencies,population,region,subregion,topleveldomain,nativename,flag")
    const data = await res.json()
    doSomething(data, this.value, this.textContent)
}

function doSomething(result, wordToMatch, region){
    let m = filt(result, wordToMatch, region)
    let rest = m.map(res=>{
        return `
        <div class="card country">
        <div class="country-img" style="background-image: url(${res.flag});
        background-repeat: no-repeat;
        background-size: cover;">
        </div>
        <div class="country-content">

            <h3 class="country-name">${res.name}</h3>
            <p class="country-population">Population: <span>${res.population}</span></p>
            <p class="country-region">Region: <span>${res.region}</span></p>
            <p class="country-capital">Capital: <span>${res.capital}</span></p>
        </div>
    </div>
        `
    }).join('')
    element.innerHTML = rest
}

function filt(result, wordToMatch, region){
    return result.filter(res=>{
        let regex = new RegExp(wordToMatch, 'gi')
        return res.name.match(regex) || res.region == region
    })
}





regionList.forEach(list => list.addEventListener('click', fetchCountryData));
input.addEventListener('keyup', fetchCountryData)
