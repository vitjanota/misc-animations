Inits.push(initCard);

// Card functionality initialization
function initCard() {
    let myCard = new AnimCard(document.getElementById("Card"));

    document.getElementById("RotateYLink").onclick = (event) => {
        event.preventDefault();
        myCard.initRotation("Y");
    };

    document.getElementById("RotateXLink").onclick = (event) => {
        event.preventDefault();
        myCard.initRotation("X");
    };
}

// Card object definition
function AnimCard(crd) {
    // card objects references
    this.card = crd;
    this.avers = crd.children[0];
    this.revers = crd.children[1];
    // front styling reference
    this.aversClass = "Avers";
    // allowed and default rotation axes
    this.axes = ["Y","X"];
    this.axis = this.axes[0];
    // rotation step
    this.step = 1;
    // rotation spped
    this.speed = 10;

    this.initRotation = function(axis) {
        const initRot = "rotate" + this.axis + "(0deg)";
        // set rotation axis if valid; use default otherwise
        if (this.axes.indexOf(axis) !== -1) this.axis = axis;
        // reset Card to initial state
        this.avers.style.transform = initRot;
        this.revers.style.transform = initRot;
        this.card.style.transform = initRot;
        // start rotation
        this.rotate(0);
    };

    this.rotate = function(angle) {
        let that = this,
            flipRot = {};
        // rotate by one step
        this.card.style.transform = "rotate" + this.axis + "(" + (angle + this.step) + "deg)";
        // in 90 degrees switch back and front
        if (angle <= 90 & angle + this.step > 90) {
            this.card.classList.toggle(this.aversClass);
            // prevent mirror image of content
            flipRot = "rotate" + this.axis + "(180deg)";
            toggleDisplay(this.avers);
            this.avers.style.transform = flipRot;
            toggleDisplay(this.revers);
            this.revers.style.transform = flipRot;
        }
        // rotate until flip (180 degrees) is finished
        if (angle <= 180) {
            setTimeout(function(){
                that.rotate(angle + that.step);
            },this.speed);
        }
    };
}

// set style to make element visible
function toggleDisplay(element) {
    const actStyle = window.getComputedStyle(element, null);
    if (actStyle.getPropertyValue('display') == 'none') {
        element.style.display ='block';
    } else {
        element.style.display ='none';
    }
}
