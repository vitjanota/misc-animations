// Card object definition
class AnimCard {
    // card objects references
    constructor (card) {
        this.card = card,
        this.avers = card.children[0],
        this.revers = card.children[1],
        // front styling reference
        this.aversClass = "Avers",
        // allowed and default rotation axes
        this.axes = ["Y","X"],
        this.axis = this.axes[0],
        // rotation step
        this.step = 1,
        // rotation spped
        this.speed = 10;
    }

    initRotation(axis) {
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

    rotate (angle) {
        let that = this,
            flipRot = {};
        // rotate by one step
        this.card.style.transform = "rotate" + this.axis + "(" + (angle + this.step) + "deg)";
        // in 90 degrees switch back and front
        if (angle <= 90 & angle + this.step > 90) {
            this.card.classList.toggle(this.aversClass);
            // prevent mirror image of content
            flipRot = "rotate" + this.axis + "(180deg)";
            this.toggleDisplay(this.avers);
            this.avers.style.transform = flipRot;
            this.toggleDisplay(this.revers);
            this.revers.style.transform = flipRot;
        }
        // rotate until flip (180 degrees) is finished
        if (angle <= 180) {
            setTimeout(function(){
                that.rotate(angle + that.step);
            },this.speed);
        }
    };

    // helper function: set style to make element visible
    toggleDisplay(element) {
        const actStyle = window.getComputedStyle(element, null);
        actStyle.getPropertyValue('display') == 'none' ?  element.style.display ='block' : element.style.display ='none';
    }
}

// Card functionality initialization
let initCard = () => {
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

Inits.push(initCard);
