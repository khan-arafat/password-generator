const resultElem = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('uppercase');
const lowerEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generatePass = document.getElementById('generate');

const randomFunc = {
    upper: getUpperCase,
    lower: getLowerCase,
    number: getNumber,
    symbols: getSymbol
}

generatePass.addEventListener('click', ()=>{
    let length = lengthEl.value;
    const hasLower = lowerEl.checked;
    const hasUpper = upperEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
    resultElem.innerText = "";
    resultElem.innerText = generatePassWord(
        hasUpper,
        hasLower,
        hasNumber,
        hasSymbol,
        length
    )
})
function generatePassWord(lower, upper, number, symbols, length){
    let generatedPass = '';
    let typeCount = parseInt(lower + upper + number + symbols);
    const typeArr = [{lower}, {upper}, {number}, {symbols}].filter(
        item => Object.values(item)[0]
    );
    if(typeCount===0){
        return '';
    }
    for(let i=0;i<length;i+=typeCount){
        typeArr.forEach(elem => {
            const nameFunc = Object.keys(elem)[0];
            generatedPass += randomFunc[nameFunc]();
        })
    }
    return generatedPass.slice(0, length);
}

function getUpperCase(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

function getLowerCase(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}

function getNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}

function getSymbol(){
    const symbols = `!@#$%^&*()_+{}|:"<>?-=[];,./'`;
    return symbols[Math.floor(Math.random() * symbols.length)];
}

document.getElementById('copyClipboard').addEventListener('click', ()=>{
    const textarea = document.createElement('textarea');
    const passwordCopy = resultElem.innerText;
    if(!passwordCopy){
        return;
    }
    textarea.value = passwordCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    const copyText = document.getElementById('copied');
    copyText.style.display='block'
    setTimeout(()=>{
        copyText.style.display = "none"
    }, 2000)
})