class Canvas {
    #Element;

    #Mouse;    

    constructor(parent) {
        this._parent = parent;
        this.#Element = document.getElementById('canvas');
        this.#Mouse = new CanvasMouse(this);
    }

    initial() {
        this.#Mouse.initial();
    }

    get Parent() {
        return this._parent;
    }

    setDrawMouseMode() {
        this.#Mouse.setMode(this.#Mouse.getModes().draw);
        this.removeModeClasses();
        this.#Element.classList.add("draw-mode");
    }

    setPointerMouseMode() {
        this.#Mouse.setMode(this.#Mouse.getModes().pointer);
        this.removeModeClasses();
        this.#Element.classList.add("pointer-mode");
    }

    removeModeClasses() {
        this.#Element.classList.remove("draw-mode", "pointer-mode");
    }

    getMouse() {
        return this.#Mouse;
    }

    getElement() {
        return this.#Element;
    }
}