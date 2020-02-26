Inits.push(initClock);
Inits.push(initResClock);

// Clock functionality initialization
function initClock() {
	var myClock = new animClock($("#PureClock")),
		myClockDial = new animClock($("#DialImageClock")),
		myClockHands = new animClock($("#HandImageClock")),
		currentTime = new Date();
	
	myClock.positionHands();
    myClockDial.positionHands();
    myClockHands.positionHands();

    myClock.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    myClockDial.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    myClockHands.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
}

function initResClock() {
    $("#ResizeClock").click(function(event) {
		myResClock.setClockSize(document.forms["ClockSizer"].ClockSize.value);
    });

    var myResClock = new animClock($("#ResizableClock")),
		currentTime = new Date();

	myResClock.setClockSize(120);
    myResClock.positionHands();
    myResClock.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
}

// Clock object definition
function animClock(dial) {
    // clock components references
    this.dial = dial;
	this.secondHandArea = $(dial.children()[0]);
	this.minuteHandArea = $(dial.children()[1]);
	this.hourHandArea = $(dial.children()[2]),
	this.secondHand = $(this.secondHandArea.children()[0]),
	this.minuteHand = $(this.minuteHandArea.children()[0]),
	this.hourHand = $(this.hourHandArea.children()[0]),

	this.setClockSize = function(diameter) {
		//calcuate hands size (arbitrary numbers derived from dial diameter just to look nice)
		var secondHandSize = [Math.round(diameter * 0.46),Math.round(diameter * 0.02)], // 2% x 46% of dial size
			minuteHandSize = [Math.round(diameter * 0.46),Math.round(diameter * 0.05)], // 5% x 46% of dial size
			hourHandSize = [Math.round(diameter * 0.31),Math.round(diameter * 0.05)]; // 5% x 31% of dial size

		// in order to place hands properly, both dial diemater and hands widths need to be even numbers
		diameter = diameter % 2 === 0 ? diameter : diameter - 1;
		secondHandSize[1] = secondHandSize[1] % 2 === 0 ? secondHandSize[1] : secondHandSize[1] - 1;
		minuteHandSize[1] = minuteHandSize[1] % 2 === 0 ? minuteHandSize[1] : minuteHandSize[1] - 1;
		hourHandSize[1] = hourHandSize[1] % 2 === 0 ? hourHandSize[1] : hourHandSize[1] - 1;

		//set hands size ans shape
		this.dial.css({height: diameter + "px",
						width: diameter + "px"})
						.css("border-width", Math.round(diameter * 0.06) + "px");

		this.secondHand.css({width: secondHandSize[1] + "px",
							height: secondHandSize[0] + "px"})
							.css("border-radius",Math.round(secondHandSize[1] / 2) + "px");

		this.minuteHand.css({width: minuteHandSize[1] + "px",
							height: minuteHandSize[0] + "px"})
							.css("border-radius",Math.round(minuteHandSize[1] / 2) + "px");

		this.hourHand.css({width: hourHandSize[1] + "px",
							height: hourHandSize[0] + "px"})
							.css("border-radius",Math.round(hourHandSize[1] / 2) + "px");
		//position hands
		this.positionHands();
	};

	this.positionHands = function() {
		//read and store current clock size
		var	diameter = this.dial.css("height").replace("px",""),
			secondHandSize = [this.secondHand.css("height").replace("px",""),this.secondHand.css("width").replace("px","")],
			minuteHandSize = [this.minuteHand.css("height").replace("px",""),this.minuteHand.css("width").replace("px","")],
			hourHandSize = [this.hourHand.css("height").replace("px",""),this.hourHand.css("width").replace("px","")];

			// set hands area size and position
			this.secondHandArea.css({width: secondHandSize[1] + "px",
									height: 2 * secondHandSize[0] + "px",
									left: ((diameter - secondHandSize[1]) / 2) + "px",
									top: ((diameter / 2) - secondHandSize[0]) + "px"});

			this.minuteHandArea.css({width: minuteHandSize[1] + "px",
									height: 2 * minuteHandSize[0] + "px",
									left: ((diameter - minuteHandSize[1]) / 2) + "px",
									top: ((diameter / 2) - minuteHandSize[0] - (secondHandSize[0] * 2)) + "px"});

			this.hourHandArea.css({width: hourHandSize[1] + "px",
									height: 2 * hourHandSize[0] + "px",
									left: ((diameter - hourHandSize[1]) / 2) + "px",
									top: ((diameter / 2) - hourHandSize[0] - (minuteHandSize[0] * 2) - (secondHandSize[0] * 2)) + "px"});
	};

	this.moveHands = function(hrs,mins,secs) {
		var that = this,
			currentTime = new Date();
		// move hands to appropriate position
		this.hourHandArea.css("transform","rotateZ(" + ((hrs * 30) + Math.round(30 * mins / 60)) + "deg)");
		this.minuteHandArea.css("transform","rotateZ(" + (mins * 6) + "deg)");
		this.secondHandArea.css("transform","rotateZ(" + (secs * 6) + "deg)");
		// redraw after one second
		setTimeout(function(){
			that.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
		},1000);
	};
}
