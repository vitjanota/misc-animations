Inits.push(initCard);

// Card functionality initialization
function initCard() {
    var myCard = new animCard($(".Card"));

    $("#RotateYLink").click(function(event) {
        event.preventDefault();
        myCard.initRotation("Y");
    });

    $("#RotateXLink").click(function(event) {
        event.preventDefault();
        myCard.initRotation("X");
    });
}

// Card object definition
function animCard(crd) {
    // card objects references
    this.card = crd;
    this.avers = $(crd.children()[0]);
    this.revers = $(crd.children()[1]);
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
        var initRot = {"transform":"rotate" + this.axis + "(0deg)"};
        // set rotation axis if valid; use default otherwise
        if (this.axes.indexOf(axis) !== -1) this.axis = axis;
        // reset Card to initial state
        this.avers.css(initRot);
        this.revers.css(initRot);
        this.card.css(initRot);
        // start rotation
        this.rotate(0);
    };

    this.rotate = function(angle) {
        var that = this,
            flipRot = {};
        // rotate by one step
        this.card.css("transform","rotate" + this.axis + "(" + (angle + this.step) + "deg)");
        // in 90 degrees switch back and front
        if (angle <= 90 & angle + this.step > 90) {
            this.card.toggleClass(this.aversClass);
            // prevent mirror image of content
            flipRot = {"transform":"rotate" + this.axis + "(180deg)"};
            this.avers.toggle().css(flipRot);
            this.revers.toggle().css(flipRot);
        }
        // rotate until flip (180 degrees) is finished
        if (angle <= 180) {
            setTimeout(function(){
                that.rotate(angle + that.step);
            },this.speed);
        }
    };
}

