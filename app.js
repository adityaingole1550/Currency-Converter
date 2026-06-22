import countryList from "./currencycode.js";

let URL = "https://open.er-api.com/v6/latest/USD";
let Selects = document.querySelectorAll(".selectbtn");
let fromSelect = document.querySelector("#fromselect");
let toSelect = document.querySelector("#toselect");
let fromImg = document.querySelector("#fromimg");
let toImg = document.querySelector("#toimg");
let input = document.querySelector("#amountinput");
let button = document.querySelector("#btn");
let result = document.querySelector("#rate");
let swap = document.querySelector("#arrowsdiv");
let fromCurrency = "USD";
let toCurrency = "INR";
let fromFlag;
let toFlag;
let Rates;
let amount;
let finalRate;
let final;


for(let select of Selects){
    for(let currency in countryList){
        let opt = document.createElement("option");
        opt.innerText = currency;
        select.appendChild(opt);
    }
}

function changeFlag(from,to){
    if(from){
        fromImg.setAttribute("src",`https://flagsapi.com/${from}/flat/64.png`);
    }
    if(to){
        toImg.setAttribute("src",`https://flagsapi.com/${to}/flat/64.png`);
    }
}

fromSelect.addEventListener("change",()=>{
    fromCurrency = fromSelect.value;
    fromFlag = countryList[fromCurrency];
    changeFlag(fromFlag,toFlag);
    getRates(fromCurrency).then((res)=>{
    Rates = res;
    });
});

toSelect.addEventListener("change",()=>{
    toCurrency = toSelect.value;
    toFlag = countryList[toCurrency];
    changeFlag(fromFlag,toFlag);
    finalRate = Rates[toCurrency];
});

async function getRates(from){
    URL = `https://open.er-api.com/v6/latest/${from}`;
    let response =  await fetch(URL);
    let data = await response.json();
    return data.rates;
}

getRates("USD").then((res)=>{
    finalRate = res.INR;
    result.innerText = `1 USD = ${finalRate.toFixed(2)} INR`;
});

function output(am , fro, fin,to){
    result.innerText=`${am} ${fro} = ${fin.toFixed(2)} ${to}`;
}

button.addEventListener("click",()=>{
    if(input.value){
        getRates(fromSelect.value).then((res)=>{
        final = res[toSelect.value];
        amount = input.value;
        finalRate = amount*final;
        console.log(finalRate);
        output(amount, fromSelect.value, finalRate, toSelect.value)
        });
    }
});

swap.addEventListener("click",()=>{
    let temp;
    temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    fromFlag = countryList[fromSelect.value];
    toFlag = countryList[toSelect.value];
    changeFlag(fromFlag,toFlag);

    getRates(fromSelect.value).then((res)=>{
    finalRate = res[toSelect.value];
    final = amount*finalRate;
    if(input.value){
        output(amount, fromSelect.value, final,toSelect.value);
    }
    });
    
    
    
});

