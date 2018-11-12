function isUndefined(arg){
    return arg === undefined;
}


function isNull(arg){
    return arg === null;
}


function checkNaN(arg){

    return isNaN(arg);
}


function isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
}
function isEmptyObj(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}


Object.prototype.myMap = function(o, f, ctx) {
    ctx = ctx || this;
    let result = {};
    Object.keys(o).forEach(function(k) {
        result[k] = f.call(ctx, o[k], k, o);
    });
    return result;
};

o = { a: 1, b: 2, c: 3 };
 r = o.myMap(o, function(v, k, o) {
    return v * v;
});
str = JSON.stringify(o, null, 4);
str1 = JSON.stringify(r, null, 4);


document.write("<p> <br> " +str +"<br> "+str1+ "</p>");


function getRandom(min, max) {
    let number =Math.random() * (max - min) + min;
    return number.toFixed();
}


function countProps(obj) {
    let count = 0;
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            count++;
        }
    }
    return count;
}

Object.prototype.equals = function(b) {
    let a = this;

    if(typeof a !== typeof b) {
        return false;
    }
    if (countProps(a) !== countProps(b)) {
        return false;
    }


    for(let i in a) {

        if(typeof b[i] === 'undefined') {
            return false;
        }
        if(typeof b[i] === 'object') {
            if(!b[i].equals(a[i])) {
                return false;
            }
        }
        if(b[i] !== a[i]) {
            return false;
        }
    }

    return true;

}


Object.prototype.removeEvenNumbers = function(obj, func, ctx) {
        ctx = ctx || this;
        let result = {};
        Object.keys(obj).forEach(function(ind) {
             if(func.call(ctx, obj[ind], ind, obj))
                 result[ind]= obj[ind];
         });
         return result;
    };

    obj1 = { a: 1, b: 2, c: 3 };
    obj2 = obj1.removeEvenNumbers(o,function(v, k, o) {
        return v % 2 !== 0;
    });


    str = JSON.stringify(obj1, null, 4);
    str1 = JSON.stringify(obj2, null, 4);























