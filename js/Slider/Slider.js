Inits.push(initSlider);

// Slider initialization
function initSlider() {
    var mySlider = $("#slider01");

    $(".SliderWrapper").mouseenter(function(event) {
        mySlider.css("height",this.clientHeight + "px");
        slideIt(mySlider,-120,0,3);
    });

    $(".SliderWrapper").mouseleave(function(event) {
        slideIt(mySlider,0,-120,-3);
    });
}

// Slder functionality
function slideIt(slider,progress,end,step) {
    slider.css("left",progress + "px");
    if (Math.abs(end - progress) >= Math.abs(step)) {
        progress += step;
        setTimeout(function(){
            slideIt(slider,progress,end,step);
        },4);
    }
}