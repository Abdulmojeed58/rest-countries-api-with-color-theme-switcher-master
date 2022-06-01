const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const body = $("body")
const filterBtn = $(".region .button")
const list = $(".region .list")
const input = $('[data-input]')
const element = $('.countries')
const regionList = $$('ul li')
const main = $('main')
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
async function fetchCountryData(e){
    const res = await fetch("https://restcountries.com/v2/all?fields=name,capital,currencies,population,region,subregion,topleveldomain,nativename,flag")
    const data = await res.json()
    mapData(data, this.value, this.textContent);
    displayAll(e, data)

}

let regex = new RegExp(" ", "g")

function mapData(result, wordToMatch, region){
    let m = filt(result, wordToMatch, region)
    let rest = m.map(res=>{
        return `
        <div class="card country ${res.name.replace(regex, '-').replace('(', '').replace(')', '')}">
        <div class="country-img" style="background-image: url(${res.flag});
        background-repeat: no-repeat;
        background-size: cover; 
        background-position: center;">
        </div>
        <div class="country-content">

            <h3 class="country-name">${res.name}</h3>
            <p class="country-population">Population: <span>${res.population.toLocaleString()}</span></p>
            <p class="country-region">Region: <span>${res.region}</span></p>
            <p class="country-capital">Capital: <span>${res.capital ?? ""}</span></p>
        </div>
    </div>
        `
    }).join('')
    element.innerHTML = rest
    
}
function filt(result, wordToMatch, region){
    return result.filter(res=>{
        let regex = new RegExp(`${wordToMatch}`, 'gi')
        return res.name.match(regex) || res.region === region
    })
}




function displayAll(e, datas){
    let a = Array.from(e.children)[0]
    
    // console.log(e.classList)
    return datas.forEach(data=>{
        if(a.textContent === data.name || e.classList.contains(data.name.replace(regex, '-').replace('(', '').replace(')', ''))) {
            let countryDetails = document.createElement('div')
            countryDetails.classList.add("country-details")
            body.appendChild(countryDetails)
            main.classList.add('active')

countryDetails.innerHTML = `
      <button class="back-btn">
      
      <i class="fa-solid fa-arrow-left back-img"></i>
      Back
  </button>
  <div class="country-flex">

              <div class="country-img" style="background-image: url(${data.flag});
          background-repeat: no-repeat;
          background-size: contain; 
          background-position: center;">
      </div>

      <div class="flex2">

          <div class="country-content1">
              <h3 class="country-name">${data.name}</h3>
              <p class="country-population">Population: <span>${data.population.toLocaleString()}</span></p>
              <p class="country-region">Region: <span>${data.region}</span></p>
              <p class="country-sub-region">Sub Region: <span>${data.subregion}</span></p>
              <p class="country-capital">Capital: <span>${data.capital ?? ""}</span></p>
          </div>

          <div class="country-content2">
              <p class="country-domain">
                  top level domain: <span>.be</span>
              </p>
              <p class="country-currencies">
                  currencies: 
                  <span>${data.currencies[0].name}</span>
              </p>
              <p class="country-languages">
                  languages: <span>dutch, french, german</span>
              </p>
          </div>

          <div class="border-countries">
              <p>Border countries: </p>
              <button>france</button>
              <button>germany</button>
              <button>netherlands</button>
          </div>


      </div>
  </div>
        `



        }

    })
}




body.addEventListener("click", e=>{
    if(e.target.classList.contains('back-btn')) {
        let child = e.target
        body.removeChild(child.parentElement)
        main.classList.remove('active')
    }
})




regionList.forEach(list => list.addEventListener('click', fetchCountryData));

input.addEventListener('keyup', fetchCountryData);

element.addEventListener('click', (e)=> fetchCountryData(e.target))





    // console.log(data.reduce((total, current)=>{
    //     if(!total.includes(current.region)){
    //         total.push(current.region)
    //     }
    //     return total
    // }, []).sort()).catch(console.log('err'))

