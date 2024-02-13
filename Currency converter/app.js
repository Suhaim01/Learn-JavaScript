const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
    for(countryCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = countryCode;
        newOption.value = countryCode;
        if(select.name==="from" && countryCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && countryCode==="INR"){
            newOption.selected="selected";
        };
        select.append(newOption);
    }

    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (event)=>{
    let currCode = event.value;
    let country = countryList[currCode];
    let imgSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img = event.parentElement.querySelector("img");
    img.src = imgSrc;
}

const updateRate = async ()=>{
    let amount = document.querySelector(".amount input").value;

    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalVal = amount*rate;
    msg.innerText = `${amount} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;
}



btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateRate();
})


window.addEventListener("load",()=>{
    updateRate();
})
