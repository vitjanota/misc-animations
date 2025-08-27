var Inits = [];

//run all available init functions
document.addEventListener("DOMContentLoaded", () => {
    Inits.forEach(function(Init){
        Init();
    });
});
