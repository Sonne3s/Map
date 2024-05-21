class DetailsDrawSectionInputs {
    #Parent;

    #IsDiscreetDrow;
    #DiscreetDrowValue;
    #DiscreetDrowValueRange;
    #CanvasMouseDraw;

    constructor(parent) {
        this.#Parent = parent;
        this.#IsDiscreetDrow = document.getElementById("is-discreet-drow");
        this.#DiscreetDrowValue = document.getElementById("discreet-drow-value");
        this.#DiscreetDrowValueRange = document.getElementById("discreet-drow-value-range");
        this.#CanvasMouseDraw = this.#Parent.getParent().getParent().getCanvas().getMouse().getDraw();
        this.initial();
    }

    initial() {
        this.#IsDiscreetDrow.onchange = () => { this.toggleIsDiscreetDrow(); };
        this.#DiscreetDrowValue.oninput = () => { this.readDiscreetDrowValue(); };
        this.#DiscreetDrowValueRange.oninput = () => { this.readDiscreetDrowValueRange(); };
        this.#DiscreetDrowValue.value = this.#CanvasMouseDraw.getDiscreetMultiplier();
        this.#DiscreetDrowValueRange.value = this.#CanvasMouseDraw.getDiscreetMultiplier();
    }

    toggleIsDiscreetDrow() {
        this.#CanvasMouseDraw.toggleIsDiscreetDrow();
        this.#DiscreetDrowValue.disabled = !this.#DiscreetDrowValue.disabled;
        this.#DiscreetDrowValueRange.disabled = !this.#DiscreetDrowValueRange.disabled;
    }

    readDiscreetDrowValue() {
        this.#DiscreetDrowValueRange.value = this.#DiscreetDrowValue.value;
        this.#CanvasMouseDraw.setDiscreetMultiplier(this.#DiscreetDrowValue.value);
    }

    readDiscreetDrowValueRange() {
        this.#DiscreetDrowValue.value = this.#DiscreetDrowValueRange.value;
        this.#CanvasMouseDraw.setDiscreetMultiplier(this.#DiscreetDrowValueRange.value);
    }
}