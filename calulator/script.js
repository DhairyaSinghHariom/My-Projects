let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");
let string = ""; // changed from inputString to string for consistency

let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.innerHTML === "=") {
            try {
                string = eval(string); // evaluate the expression
                input.value = string;
            } catch {
                input.value = "Error";
            }
        } else if (e.target.innerHTML === "AC") {
            string = "";
            input.value = string;
        } else if (e.target.innerHTML === "DEL") {
            string = "";
            input.value = string;
        } else if (e.target.innerHTML === "%") {
            string = "";
            input.value = string;
        } else {
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});
