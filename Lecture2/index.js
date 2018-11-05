/*Напишите функцию, которая принимает 2 параметра - 2 числа и возвращает true, если первое число больше второго, и false,
 если это не так.
*/

//так лучше
function task1(a, b) {
    return a > b;
}

let answer = task1(3, 1);
console.log(answer);
document.write("<p>Task 1: Напишите функцию, которая принимает 2 параметра - 2 числа и возвращает true, если первое число " +
    "больше второго, и false, если это не так. <br> " + answer + "</p>");


/*Напишите функцию, которая принимает 1 параметр - строку и возвращает новую строку вида, “Вы ввели * полученная строка *”.*/
function task2(str) {
    return "Вы ввели " + str;
}

answer = task2("foo");
console.log(answer);
document.write("<p>Task2: Напишите функцию, которая принимает 1 параметр - строку и возвращает новую строку вида, “Вы ввели " +
    "* полученная строка *”. <br> " + answer + "</p>");


/*Напишите функцию, которая принимает 1 параметр любого типа и проверяет, является ли полученное значение null или undefined.
*/
function task3(arg) {
    return (arg === null || arg === undefined);
}

answer = task3(' ');
console.log(answer);
document.write("<p>Task3: Напишите функцию, которая принимает 1 параметр любого типа и проверяет, является ли " +
    "полученное значение null или undefined. <br> " + answer + "</p>");


/*Напишите функцию, которая принимает 1 параметр - объект и добавляет этому объекту поле checked со значением true.
*/
function task4(obj) {
    obj.checked = true;
}

answer = task4({});
console.log(answer);
document.write("<p>Task4: Напишите функцию, которая принимает 1 параметр - объект и добавляет этому объекту поле " +
    "checked со значением true. <br> " + answer + "</p>");


/*Напишите функцию, которая принимает 1 параметр - число и выводит в консоль все числа от нуля до введенного числа (в обе стороны).
*/

/*function task5(number) {
    var str1 = ' ';
    if (number < 0) {
        for (var i = 0; i >= number; i--) {
            console.log(i);
            str1 += i + " ";
        }
        for (var i = number; i <= 0; i++) {
            console.log(i);
            str1 += i + " ";
        }
    }
    else {
        for (var i = 0; i <= number; i++) {
            console.log(i);
            str1 += i + " ";
        }
        for (var i = number; i >= 0; i--) {
            console.log(i);
            str1 += i + " ";
        }
    }

    return str1;
}

*/
function func(num) {
    let sign = num < 0 ? 1 : -1;
    let i;
    for (i = num; i !== 0; i += sign) {
        console.log(i);
    }
    sign *= -1;
    for (i = 0; i !== num; i += sign) {
        console.log(i);
    }
    console.log(num);
}

//с богом/
//не помнишь спроси---или так
//я понял так:
////смотри нам нужно от нуля до числа в обе стороны! где
//убери все крому функци++
..да
func(5);
/*
answer = task5(5);
console.log(answer);
document.write("<p>Task5: Напишите функцию, которая принимает 1 параметр - число и выводит в консоль все числа от" +
    " нуля до введенного числа (в обе стороны).<br> " + answer + "</p>");
*/