// Slider initialization
let initSlider = () => {
    let mySlider = document.getElementById("slider01");

    document.getElementById("sliderwrapper01").onmouseenter = function(event) {
        mySlider.style.height = this.clientHeight + "px";
        slideIt(mySlider,-120,0,3);
    };

    document.getElementById("sliderwrapper01").onmouseleave = function(event) {
        slideIt(mySlider,0,-120,-3);
    };
}

// Slder functionality
let slideIt = (slider,progress,end,step) => {
    slider.style.left = progress + "px";
    if (Math.abs(end - progress) >= Math.abs(step)) {
        progress += step;
        setTimeout(function(){
            slideIt(slider,progress,end,step);
        },4);
    }
}

Inits.push(initSlider);
