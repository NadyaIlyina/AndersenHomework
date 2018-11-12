window.onload = function () {
    const dom_display = document.getElementById("display");
    const dom_equal = document.getElementById("equals_key");
    const dom_keys = document.getElementsByClassName("key");
    const note_display  = document.getElementById("display_note");
    var equal_press = false;

    const keys = Array.from(dom_keys);

//если есть точка в последнем введенном числе
    function dot_in_last_num() {
        const space_index = dom_display.value.lastIndexOf(' ');
        const dot_index = dom_display.value.lastIndexOf('.');
        return space_index < dot_index;
    };
//удаляет последний символ(<-)
    function back_display() {
        if (get_from_value_by_index(dom_display.value.length - 1) !== ' ')
            set_display(dom_display.value.substring(0, dom_display.value.length - 1));
        if (dom_display.value === '' || dom_display.value === ' ')
            set_display(0);
        if (get_from_value_by_index(dom_display.value.length - 1) === '-')
            back_display();

        if (get_from_value_by_index(dom_display.value.length - 1) === '0')
            if (get_from_value_by_index(dom_display.value.length - 2) === '-')
                set_display(dom_display.value.substring(0, dom_display.value.length - 2) + "0");
    };
//проверка на последний символ(CE)
    function rollback_display() {
        if (get_from_value_by_index(dom_display.value.length - 1) === ' ') {
            set_display(dom_display.value.substring(0, dom_display.value.length - 1));
            const index = dom_display.value.lastIndexOf(' ');
            set_display(dom_display.value.substr(0,index));
        } else {
            const index = dom_display.value.lastIndexOf(' ');
            set_display(dom_display.value.substr(0,index + 1));
        }

        if (dom_display.value === '')
            set_display(0);
    }
//очистка дисплэя
    function clear_display() {
        dom_display.value = 0;
    };
//проверка результата
    function set_display(value) {
        const v = value.toString();
        //проверка на none и infinity
        if (v[0] === 'N' || v[0] === 'I' ) {
            dom_display.value = 'Error';
            set_all_disable();
            return;
        }
        //проверка на -infinity
        if (v[0] === '-' && v[1] === 'I') {
            dom_display.value = 'Error';
            set_all_disable();
            return;
        }
        dom_display.value = v;
    };
    function set_display_note(value) {
        const v = value.toString();
        note_display.value = v;
    };
//блокировка кнопок
    function set_all_disable() {
        const keys = Array.from(document.getElementsByClassName("calculator_key"));
        keys.forEach(function(elem) {
            elem.disabled = true;
        });
        const c = document.getElementById("c_key");
        const ce = document.getElementById("ce_key");
        c.disabled = false;
        ce.disabled = false;
    };
//разблокировка кнопок
    function set_all_enable() {
        const keys = Array.from(document.getElementsByClassName("calculator_key"));
        keys.forEach(function(elem) {
            elem.disabled = false;
        });
    };
//получение всех чисел
    function get_nums_from(value) {
        return value.match(/[-+]?\d+.?\d+|[-+]?\d/g);
    };
//получение оператора
    function get_operators_from(value) {
        return value.match(/ [-+×÷%^] +?/g);
    };
//вычисление выражения
    function calculate(a, b, operator) {
        switch (operator){
            case " - ":
                return parseFloat(a) - parseFloat(b);
            case " + ":
                return parseFloat(a) + parseFloat(b);
            case " × ":
                return parseFloat(a) * parseFloat(b);
            case " ÷ ":
                return parseFloat(a) / parseFloat(b);
            case " % ":
                return parseFloat(b) * parseFloat(a) / 100;
            case " ^ ":
            {
              if(parseFloat(a)===0 && parseFloat(b)===0 )
              {
                dom_display.value = 'Error';
                set_all_disable();
                return;
              }
              return Math.pow(parseFloat(a),parseFloat(b)) ;
            }

        };
        return 0;
    };
//ввод данных
    function input_data(input_value) {
        return function() {
            set_display(value_to_display(input_value));
            set_display_note(value_to_display_note(input_value));
        };
    };
//получение значения по индексу
    function get_from_value_by_index(index) {
        if (index < 0 || index >= dom_display.value.length)
            return '';
        else
            return dom_display.value[index];
    }
//проверка значения в поле
    function value_to_display(input_value) {
      //очищение после нажатия кнопки =
        if (equal_press && input_value.length === 1) {
            equal_press = false;
            if (input_value === '.')
                return '0.';
            else return input_value;
        }
        equal_press = false;

        if (input_value.length > 1 && dom_display.value === "Error")
            dom_display.value = '0';
        /* Если был введен второй опреатор */
        if (dom_display.value.indexOf(' ') !== -1 && input_value.length > 1) {
            return calculate_result() + input_value;
        }
        //проверка на введение оператора 2 раза подряд, то меняем оператор
        if (input_value.length > 1 && dom_display.value[dom_display.value.length - 1] === ' ') {
            rollback_display();
            return dom_display.value + input_value;
        }

        //проверка на ведущие нули во вводимом числе
        if (input_value === '0') {
            const index = dom_display.value.lastIndexOf(' ');
            if (get_from_value_by_index(index + 1) !== '0')
                return dom_display.value + input_value;
            else if (get_from_value_by_index(index + 1) === '0' && get_from_value_by_index(index + 2) === '.')
                return dom_display.value + input_value;
            else
                return dom_display.value;
        };

        //проверка на ввод двух точек во вводимом числе
        if (input_value === '.') {
            if (!dot_in_last_num())
                return dom_display.value + input_value;
            else
                return dom_display.value;
        };

        //проверка на ввод оператора перед тем, как было введено число
        if (input_value.length > 1 && dom_display.value.length === 1 && get_from_value_by_index(0) === '0')
            return dom_display.value + input_value;

        //проверка на ввод цифры после нуля
        const index = dom_display.value.lastIndexOf(' ');
        if (get_from_value_by_index(index + 1) === '0' && get_from_value_by_index(index + 2) !== '.')
            set_display(dom_display.value.substring(0, dom_display.value.length - 1));
        return dom_display.value + input_value;
    };
    function value_to_display_note(input_value) {
        equal_press = false;
        return note_display.value + input_value;
    };
//вычисление выражения
    function calculate_result() {
        const nums = get_nums_from(dom_display.value) === null ? [0] : get_nums_from(dom_display.value);
        const operators = get_operators_from(dom_display.value);
        if (operators == null)
            return nums[0];
        if (nums.length === 1 ){
            nums.push(nums[0]);
        }
        const result = nums.reduce(function(previousValue, currentItem, index){
            if (index % 2 !== 0 ){
                return calculate(previousValue, currentItem, operators[(index - 1) / 2]);
            }
            else
                return previousValue;
        },nums[0]);

        return result;
    }

    keys.map(function(element){
        element.onclick = input_data(element.value);
    });

    dom_equal.onclick = function() {
        equal_press = true;
        set_display(calculate_result());
        const index = note_display.value.lastIndexOf(' ');
        const num = note_display.value.substr(index + 1);
        const prefix = note_display.value.substr(0,index);

        set_display_note(prefix +  num +"="+calculate_result()+"\n");

    };

    document.getElementById("inv_key").onclick = function() {
        const index = dom_display.value.lastIndexOf(' ');
        const num = dom_display.value.substr(index + 1);
        const prefix = dom_display.value.substr(0,index);

        if (num.length === 0)
            return;

        if (num === '0')
            return;

        if (num.length > 0 && num[0] === '-'){
            set_display(prefix + ' ' + num.substr(1));
        } else {
            set_display(prefix + ' -' + num);
        };
    };

    document.getElementById("c_key").onclick = function() {
        set_all_enable();
        clear_display();
    };

    document.getElementById("ce_key").onclick = function() {
        set_all_enable();
        rollback_display();
    };

    document.getElementById("back_key").onclick = function() {
        back_display();
    };

    document.getElementById("sym_key").onclick = function() {
        const result = calculate_result();
        set_display(1 / parseFloat(result));
        equal_press = true;
    };

    document.getElementById("sqrt_key").onclick = function() {
        const result = calculate_result();
        set_display(Math.sqrt(parseFloat(result)));
        equal_press = true;
    };



};
