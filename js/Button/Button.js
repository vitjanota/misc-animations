Inits.push(initButton);

// Button functionality initialization
function initButton() {
    $(".Button").click(function(event) {
        setTimeout(buttonClickAction,200);
    });
}

// Button click action here
function buttonClickAction() {
    alert("Button clicked!");
}
