// Clock class
class AnimClock {
    constructor(dial, diameter) {
        this.dial = dial;
        this.diameter = diameter;
	    this.secondHandArea = dial.children[0];
	    this.minuteHandArea = dial.children[1];
	    this.hourHandArea = dial.children[2];
	    this.secondHand = this.secondHandArea.children[0];
	    this.minuteHand = this.minuteHandArea.children[0];
	    this.hourHand = this.hourHandArea.children[0];
    }

    run() {
        const currentTime = new Date();
        if (this.diameter) {
            // if diameter is specified in constructor, set clock size aitomatically
            this.setClockSize();
        } else{
            // use settings from css definitions otherwise (manual setup)
            this.diameter = this.dial.style.height;
        }
        this.positionHands();
        this.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    }

    setClockSize(diameter) {
        if (diameter) this.diameter = diameter;

		//calcuate hands size (arbitrary numbers derived from dial diameter just to look nice)
		let secondHandSize = { // 2% x 46% of dial size
                height: Math.round(this.diameter * 0.46),
                width: Math.round(this.diameter * 0.02)
            },
			minuteHandSize = { // 5% x 46% of dial size
                height: Math.round(this.diameter * 0.46),
                width: Math.round(this.diameter * 0.05)
            }, 
			hourHandSize = { // 5% x 31% of dial size
                height: Math.round(this.diameter * 0.31),
                width: Math.round(this.diameter * 0.05)
            };

            // in order to place hands properly, both dial diemater and hands widths need to be even numbers
		this.diameter = this.diameter % 2 === 0 ? this.diameter : this.diameter - 1;
		secondHandSize.width = secondHandSize.width % 2 === 0 ? secondHandSize.width : secondHandSize.width - 1;
		minuteHandSize.width = minuteHandSize.width % 2 === 0 ? minuteHandSize.width : minuteHandSize.width - 1;
		hourHandSize.width = hourHandSize.width % 2 === 0 ? hourHandSize.width : hourHandSize.width - 1;

		//set hands size ans shape
		this.dial.style.height= this.diameter + 'px';
		this.dial.style.width = this.diameter + 'px';
		this.dial.style.borderWidth = Math.round(this.diameter * 0.06) + 'px';

		this.secondHand.style.width = secondHandSize.width + 'px',
		this.secondHand.style.height = secondHandSize.height + 'px';
		this.secondHand.style.borderRadius = Math.round(secondHandSize.width / 2) + 'px';

		this.minuteHand.style.width =  minuteHandSize.width + 'px';
		this.minuteHand.style.height = minuteHandSize.height + 'px';
		this.minuteHand.style.borderRadius = Math.round(minuteHandSize.width / 2) + 'px';

		this.hourHand.style.width = hourHandSize.width + 'px';
		this.hourHand.style.height =  hourHandSize.height + 'px';
		this.hourHand.style.borderRadius = Math.round(hourHandSize.width / 2) + 'px';
		//position hands
		this.positionHands();
	};

    positionHands() {
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

    moveHands(hrs,mins,secs) {
	    const currentTime = new Date();
		// move hands to appropriate position
		this.hourHandArea.style.transform = `rotateZ(${((hrs * 30) + Math.round(30 * mins / 60))}deg)`;
		this.minuteHandArea.style.transform = `rotateZ(${(mins * 6)}deg)`;
		this.secondHandArea.style.transform = `rotateZ(${(secs * 6)}deg)`;
		// redraw after one second
		setTimeout(() => {
			this.moveHands(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
		},1000);
	};
}


// insert slight delay in actions
let waitABit = () => {
    return new Promise(resolve => setTimeout(resolve, 10));
}

// test if value is a positive integer
let isPositiveInteger = (val) => {
    let test = false;
    if (val?.trim?.() && !isNaN(val)) {
        const num = parseFloat(val);
        if (!val.includes('.') && num > 0) {
            test = true;
        }
    }
    return test;
}

// Clock functionality initialization
let initClock = () => {
	const myClock = new AnimClock(document.getElementById('PureClock'));
	const myClockDial = new AnimClock(document.getElementById('DialImageClock'));
	const myClockHands = new AnimClock(document.getElementById('HandImageClock'));
    myClock.run();
    myClockDial.run();
    myClockHands.run();
}

let  initResClock = async () => {
    // set resize functionality for dynamic size clock
    document.getElementById('ResizeClock').onclick = async (event) => {
        event.preventDefault();
        const finalSize = document.forms['ClockSizer'].ClockSize.value;
        if (isPositiveInteger(finalSize)) {
            if (finalSize > myResClock.diameter) {
                for (let index = myResClock.diameter; index <= finalSize; index++) {
                    await waitABit();
                    myResClock.setClockSize(index);
                }
            } else {
                for (let index = myResClock.diameter; index >= finalSize; index--) {
                    await waitABit();
                    myResClock.setClockSize(index);
                }
            }
            myResClock.diameter = finalSize;
        }
    };

    const myResClock = new AnimClock(document.getElementById('ResizableClock'),160);
    myResClock.run();
}

Inits.push(initClock);
Inits.push(initResClock);
