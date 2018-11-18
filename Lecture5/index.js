/*Написать функцию debounce, которая возвращает функцию обертку, передающую оригинальной функции только
 последний вызов функции обертки за переданный интервал (примеры вызовов смотрите на gist)*/
 
 function debounced(func, wait) {
	let timer = null;

	return function (...args) {
		const onComplete = () => {
			func.apply(this, args);
			timer = null;
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, wait);
  };
};

function func (arg){
	alert(arg);
}

let first = debounced(func, 10000);


/*Промисифицировать setTimeout*/

function func(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

func(1000)
    .then(() => alert(1))
    .catch(()=> {alert("error")});


/*Промисифицировать XMLHttpRequest*/
function getJsonAsync(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject("error");
            }
        }

        xhr.send();
    });
}

getJsonAsync(" ")
    .then(()=> { alert("yes") })
    .catch(()=> { alert("no")});

/*Написать функцию, принимающую список url путей и возвращающую промис, который резолвит результаты всех запросов по
указанным url (важно: резолвит массив значений, резолвит не раньше последнего из запросов, функцию запроса взять из
ссылки на gist, не использовать Promise.all)
*/


function request(url) {
    url = [];
    for (let i = 0; i < arguments.length; i++) {
        url[i] = arguments[i];
    }
    return new Promise((res, rej) => {

        const delayTime = Math.floor(Math.random() * 10000) + 1;

        let xhr=[];
        for (let i = 0; i < url.length; i++) {
            xhr[i] = new XMLHttpRequest();
            setTimeout(() => res(url[i]), delayTime);
            xhr[i].open('GET', url[i]);
            xhr[i].onload = () => {
                if (xhr[i].status === 200) {

                    res(xhr[i].response);

                } else {
                    rej("error");
                }
            };

            xhr[i].send();
        }
    });
}























