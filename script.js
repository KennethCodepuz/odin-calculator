const btnContainer = document.getElementById('btn-container');

const btnElements = ['C', '%', 'CE', '/', 
                     '9', '8', '7', '*', 
                     '6', '5', '4', '+', 
                     '3', '2', '1', '-', 
                     '0', '.', '='];

btnElements.forEach(item => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.textContent = item;
    if (item === '=') {
        btn.classList.add('equal-button')
    }
    btnContainer.appendChild(btn);
});

const btns = document.querySelectorAll('.btn');
const displayField = document.getElementById('display');
let num = ''
let arr = [];
let operation = '+';


btns.forEach(btn => {
    btn.addEventListener('click',() => {
        let btnValue = btn.innerText;
        let parseNum;
        let calculations = {
            sum: 0,
            difference: 0,
            product: 0,
            quotient: 0,
            remainder: 0,
        }
        if(btnValue === 'C' || btnValue === 'CE') {
            displayField.innerText = '';
        }else {
            displayField.innerText += `${btnValue}`;
        }
        
        parseNum = toNumber(btnValue);
        console.log(parseNum);

        if(['C', 'CE'].includes(btnValue)) arr.splice(0, arr.length);

        if(Number.isInteger(parseNum)) {

            console.log('A number');
            arr.push(parseNum);
        }else if(['+', '-', '*', '/', '%'].includes(parseNum)){
            console.log('Not a number');
            operation = parseNum;
        }

        if(btnValue === '=') {
            let answer = equalButton(operation, arr[0], arr[1]);
            displayField.innerText = answer;
            arr.splice(0, arr.length);
            operation = '';
            arr.push(answer);
        }

        console.log(arr, operation);
    })
})

function toNumber(item) {
    let parseNum = Number(item);
    // console.log(parseNum);
    let aNumber = (isNaN(parseNum)) ? item : parseNum;
    console.log(aNumber);
    return aNumber;
}

function equalButton(operation, num1, num2) {
    let calculate = {
        '+': (num1, num2) => num1 + num2,
        '-': (num1, num2) => num1 - num2,
        '*': (num1, num2) => num1 * num2,
        '/': (num1, num2) => (num2 === 0) ? 'Infinity' : num1 / num2,
        '%': (num1, num2) => num1 % num2,
    };

    return calculate[operation](num1, num2);
}



