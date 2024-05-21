class DetailsDrawSection {
    #Parent;
    #Element;

    #Inputs;

    constructor(parent) {
        this.#Parent = parent;
        this.#Element = document.getElementById("details-draw-section");
        this.#Inputs = new DetailsDrawSectionInputs(this);
    }

    getParent() {
        return this.#Parent;
    }
}