var display = document.getElementById("display");
var hidden_display = display.value;
var calculator = document.getElementById("calc");
let differenceX = undefined;
let differenceY = undefined;
var focused_display = false;
var topbar_down = false;

document.getElementById("squared").innerHTML = "x" + '\u00B2';

function round(num, decimal_places) {
    const factor = Math.pow(10, decimal_places);
    return Math.round(num * factor) / factor;
}

function backspace() {
    display.value = display.value.slice(0, -1);
    hidden_display = hidden_display.slice(0, -1);
}

function square_display() {
    display.value += '\u00B2';
    hidden_display = "(" + hidden_display + ")*(" + hidden_display + ")";
}

function root_display() {
    display.value = ' \u221A' + display.value; 
    hidden_display = Math.sqrt(parseFloat(hidden_display)).toString();
}

function append_display(input) {
    display.scrollLeft += 1000
    if (display.value != "0") {
        if (input == "/") {
            display.value += " ÷ ";
            hidden_display += input;
        } else if (input == "*") {
            display.value += " x ";
            hidden_display += "*";
        } else if (input == "+") {
            display.value += " + ";
            hidden_display += "+";
        } else if (input == "-") {
            display.value += " - ";
            hidden_display += "-";
        } else if (input == ".") {
            display.value += ".";
            hidden_display += ".";
        }
        if (!isNaN(input)) {
            display.value += input;
            hidden_display += input;
        }
    } else {
        if (!isNaN(input)) {
            display.value = input;
            hidden_display = input;
        }
        if (input == ".") {
            display.value += ".";
            hidden_display += ".";
        }
    }
}

function clear_display() {
    display.value = "0";
    hidden_display = "0";
}

function calculate_display() {
    try {
        display.value = round(eval(hidden_display), 5);
        hidden_display = round(eval(hidden_display), 5);
    } catch (error) {
        display.value = "Err";
        console.log(error);
    }
}

display.addEventListener("keydown", function(event) {
    event.preventDefault();
    if (event.key === "Backspace") {
        backspace();
    } else if (event.key === "Enter") {
        calculate_display();
    } else {
        append_display(event.key);
    }
});

display.addEventListener("focus", function() {focused_display = true});
display.addEventListener("blur", function() {focused_display = false});

document.addEventListener('keydown', function(event) {
    if (!focused_display) {
        if (event.key === "Backspace") {
            backspace();
        } else if (event.key === "Enter") {
            calculate_display();
        } else if (event.key === "c") {
            clear_display();
        } else {
            append_display(event.key);
        }
    }
});

topbar.addEventListener("mousedown", function(event) {
    topbar_down = true;
    differenceX = calculator.offsetLeft - event.clientX;
    differenceY = calculator.offsetTop - event.clientY;
});

document.addEventListener("mouseup", function() {
    topbar_down = false;
});

document.addEventListener("mousemove", function(event) {
    if (topbar_down) {
        let posX = differenceX + event.clientX;
        let posY = differenceY + event.clientY;

        calculator.style.left = `${posX}px`;
        calculator.style.top = `${posY}px`;
    }
});
