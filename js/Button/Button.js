// Button click action here
let buttonClickAction = () => {
    alert("Button clicked!");
}

// Button functionality initialization
let initButton = () => {
    [...document.getElementsByClassName("Button")].forEach((Button) => {
        Button.onclick = (event) => {
            setTimeout(buttonClickAction,200);
        };
    });
}

Inits.push(initButton);
