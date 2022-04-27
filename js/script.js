// объявляем переменные (кнопки калькулятора)
let input = document.querySelector('.input'),
    number = document.querySelectorAll('.numbers div'),
    operator = document.querySelectorAll(['.operators div','.specific']),
    result = document.querySelector('.equal'),
    clear = document.querySelector('.clear'),
    resultDisplayed = false; //смотрим, что отображается

// добавляем обработчик кликов к цифровым кнопкам
for(let i = 0; i < number.length; i++){
    number[i].addEventListener("click", function (e){
        // сохраненим текущую входящую строку и её последний символ в переменных (используем позже)
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
        // если результат не отображается, просто продолжаем добавлять
        if (resultDisplayed === false){
            input.innerHTML += e.target.innerHTML;
        }
        else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷" || lastChar === "√" || lastChar === "^"){
            // если в данный момент отображается результат и пользователь нажал оператор,
            // то нам нужно продолжать добавлять в строку для следующей операции
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        }
        else {
            // если в данный момент отображается результат и пользователь нажал число
            // нам нужно очистить входную строку и добавить новый ввод, чтобы начать новую операцию
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}
// добавляем обработчик кликов к операторным кнопкам
for (let i = 0; i < operator.length; i++){
    operator[i].addEventListener("click", function (e){
        // сохраненим текущую входящую строку и её последний символ в переменных (используем позже)
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
        // если последний введенный символ является оператором, заменим его текущим нажатием
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷" || lastChar === "√" || lastChar === "^"){
            input.innerHTML = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        }
        else if (currentString.length === 0){
            // если первая нажатая клавиша является оператором - ничего не делаем
            console.log("Enter a number first!");
        }
        else {
            // иначе просто добавим оператор нажатия
            input.innerHTML += e.target.innerHTML;
        }
    });
}
// добавляем обработчик клика по нажатию на кнопку "равно"
result.addEventListener("click", function (){
    // это строка, которую мы будем обрабатывать, например: -40+26+33-56*34/22
    let inputString = input.innerHTML;
    // создаём массив чисел; например, для приведенной выше строки это будет: numbers = ["40", "26", "33", "56", "34", "22"]
    let numbers = inputString.split(/[√÷×^\-+]/g);
    // создаём массив операторов; для вышеуказанной строки это будет: operator = ["√" "÷", "*", "^", "-", "+"]
    // сначала мы заменяем все числа и точки пустой строкой, а затем разделяем
    let operators = inputString.replace(/\d|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("---------------------------");

    // теперь мы перебираем массив и выполняем одну операцию за раз
    // сначала делим, потом умножаем, потом вычитаем и потом складываем
    // по мере движения мы меняем исходный массив чисел и операторов
    // последний элемент, оставшийся в массиве, будет выводом

    let square = operators.indexOf("√");
    while (square !== -1){
        numbers.splice(square, 2, numbers[square] ** (1/2));
        operators.splice(square, 1);
        square = operators.indexOf("√");
    }
    let divide = operators.indexOf("÷");
    while (divide !== -1){
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }
    let caret = operators.indexOf("^");
    while (caret !== -1){
        numbers.splice(caret, 2, numbers[caret] * numbers[caret]);
        operators.splice(caret, 1);
        caret = operators.indexOf("^");
    }
    let multiply = operators.indexOf("×");
    while (multiply !== -1){
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }
    let subtract = operators.indexOf("-");
    while (subtract !== -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }
    let add = operators.indexOf("+");
    while (add !== -1){
        // используем parseFloat, иначе это приведет к конкатенации строк
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add +1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }
    input.innerHTML = numbers[0]; // отображение вывода
    resultDisplayed = true; // меняем значение на true, если отображается результат
});

// очищаем поле ввода, при нажатии на кнопку очистки
clear.addEventListener("click", function (){
    input.innerHTML = "";
});