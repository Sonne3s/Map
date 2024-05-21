class MousePanel {
    #Parent;
    #Element;

    #Buttons

    constructor(parent) {
        this.#Parent = parent;
        this.#Element = document.getElementById("mouse-panel");
        this.#Buttons = new MousePanelButtons(this);
    }

    getParent() {
        return this.#Parent;
    }

    getElement() {
        return this.#Element;
    }
}