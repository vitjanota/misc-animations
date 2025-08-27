Inits.push(initClock);
Inits.push(initResClock);

// Clock functionality initialization
function initClock() {
	let myClock = new AnimClock(document.getElementById('PureClock')),
		myClockDial = new AnimClock(document.getElementById('DialImageClock')),
		myClockHands = new AnimClock(document.getElementById('HandImageClock'));
	const currentTime = new Date();
	
	myClock.positionHands();
    myClockDial.positionHands();
    myClockHands.positionHands();

    myClock.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    myClockDial.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    myClockHands.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
}

function initResClock() {
    document.getElementById('ResizeClock').onclick = function(event) {
        event.preventDefault();
		myResClock.setClockSize(document.forms['ClockSizer'].ClockSize.value);
    };

    let myResClock = new AnimClock(document.getElementById('ResizableClock'));
	const currentTime = new Date();

	myResClock.setClockSize(120);
    myResClock.positionHands();
    myResClock.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
}

// Clock object definition
function AnimClock(dial) {
    // clock components references
    this.dial = dial;
	this.secondHandArea = dial.children[0];
	this.minuteHandArea = dial.children[1];
	this.hourHandArea = dial.children[2],
	this.secondHand = this.secondHandArea.children[0],
	this.minuteHand = this.minuteHandArea.children[0],
	this.hourHand = this.hourHandArea.children[0],

	this.setClockSize = function(diameter) {
		//calcuate hands size (arbitrary numbers derived from dial diameter just to look nice)
		let secondHandSize = [Math.round(diameter * 0.46),Math.round(diameter * 0.02)], // 2% x 46% of dial size
			minuteHandSize = [Math.round(diameter * 0.46),Math.round(diameter * 0.05)], // 5% x 46% of dial size
			hourHandSize = [Math.round(diameter * 0.31),Math.round(diameter * 0.05)]; // 5% x 31% of dial size

		// in order to place hands properly, both dial diemater and hands widths need to be even numbers
		diameter = diameter % 2 === 0 ? diameter : diameter - 1;
		secondHandSize[1] = secondHandSize[1] % 2 === 0 ? secondHandSize[1] : secondHandSize[1] - 1;
		minuteHandSize[1] = minuteHandSize[1] % 2 === 0 ? minuteHandSize[1] : minuteHandSize[1] - 1;
		hourHandSize[1] = hourHandSize[1] % 2 === 0 ? hourHandSize[1] : hourHandSize[1] - 1;

		//set hands size ans shape
		this.dial.style.height= diameter + 'px';
		this.dial.style.width = diameter + 'px';
		this.dial.style.borderWidth = Math.round(diameter * 0.06) + 'px';

		this.secondHand.style.width = secondHandSize[1] + 'px',
		this.secondHand.style.height = secondHandSize[0] + 'px';
		this.secondHand.style.borderRadius = Math.round(secondHandSize[1] / 2) + 'px';

		this.minuteHand.style.width =  minuteHandSize[1] + 'px';
		this.minuteHand.style.height = minuteHandSize[0] + 'px';
		this.minuteHand.style.borderRadius = Math.round(minuteHandSize[1] / 2) + 'px';

		this.hourHand.style.width = hourHandSize[1] + 'px';
		this.hourHand.style.height =  hourHandSize[0] + 'px';
		this.hourHand.style.borderRadius = Math.round(hourHandSize[1] / 2) + 'px';
		//position hands
		this.positionHands();
	};

	this.positionHands = function() {
		//read and store current clock size
		const diameter = window.getComputedStyle(this.dial,null).getPropertyValue('height').replace('px',''),
			secondHandSize = {
                height: window.getComputedStyle(this.secondHand,null).getPropertyValue('height').replace('px',''),
                width: window.getComputedStyle(this.secondHand,null).getPropertyValue('width').replace('px','')
            },
			minuteHandSize = {
                height:  window.getComputedStyle(this.minuteHand).getPropertyValue('height').replace('px',''),
                width:  window.getComputedStyle(this.minuteHand).getPropertyValue('width').replace('px','')
            },
			hourHandSize = {
                height:  window.getComputedStyle(this.hourHand).getPropertyValue('height').replace('px',''),
                width:  window.getComputedStyle(this.hourHand).getPropertyValue('width').replace('px','')
            };

        // set hands area size and position
        this.secondHandArea.style.width = secondHandSize.width + 'px';
        this.secondHandArea.style.height = 2 * secondHandSize.height + 'px';
        this.secondHandArea.style.left = ((diameter - secondHandSize.width) / 2) + 'px';
        this.secondHandArea.style.top =((diameter / 2) - secondHandSize.height) + 'px';

        this.minuteHandArea.style.width = minuteHandSize.width + 'px';
        this.minuteHandArea.style.height = 2 * minuteHandSize.height + 'px';
        this.minuteHandArea.style.left = ((diameter - minuteHandSize.width) / 2) + 'px';
        this.minuteHandArea.style.top = ((diameter / 2) - minuteHandSize.height - (secondHandSize.height * 2)) + 'px';

        this.hourHandArea.style.width = hourHandSize.width + 'px';
        this.hourHandArea.style.height = 2 * hourHandSize.height + 'px';
        this.hourHandArea.style.left = ((diameter - hourHandSize.width) / 2) + 'px';
        this.hourHandArea.style.top = ((diameter / 2) - hourHandSize.height - (minuteHandSize.height * 2) - (secondHandSize.height * 2)) + 'px';
	};

	this.moveHands = function(hrs,mins,secs) {
		let that = this;
	    const currentTime = new Date();
		// move hands to appropriate position
		this.hourHandArea.style.transform = `rotateZ(${((hrs * 30) + Math.round(30 * mins / 60))}deg)`;
		this.minuteHandArea.style.transform = `rotateZ(${(mins * 6)}deg)`;
		this.secondHandArea.style.transform = `rotateZ(${(secs * 6)}deg)`;
		// redraw after one second
		setTimeout(function(){
			that.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
		},1000);
	};
}
