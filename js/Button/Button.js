Inits.push(initButton);

// Button functionality initialization
function initButton() {
    [...document.getElementsByClassName("Button")].forEach((Button) => {
        Button.onclick = (event) => {
            setTimeout(buttonClickAction,200);
        };
    });
}

// Button click action here
function buttonClickAction() {
    alert("Button clicked!");
}
