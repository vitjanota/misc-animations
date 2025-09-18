var Inits = [];

//run all available init functions
document.addEventListener("DOMContentLoaded", () => {
    Inits.forEach((Init) =>{
        Init();
    });
});
