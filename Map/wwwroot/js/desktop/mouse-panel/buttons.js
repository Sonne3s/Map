class MousePanelButtons {
    #Parent;

    #Canvas;
    #DrawButtonElement;
    #PointerButtonElement;
    //#DotCoordinatesDrawCssRules;

    constructor(parent) {
        this.#Parent = parent;
        this.#Canvas = this.#Parent.getParent().getCanvas();
        this.#DrawButtonElement = document.getElementById("draw-button");
        this.#PointerButtonElement = document.getElementById("pointer-button");
        //this.#DotCoordinatesDrawCssRules = getCSSRule("dot-coordinates", false);
        this.initial();
    }

    initial() {
        this.#DrawButtonElement.onclick = () => { this.drawClick(); }
        this.#PointerButtonElement.onclick = () => { this.pointerClick(); }
    }

    drawClick() {
        this.#Canvas.setDrawMouseMode();
        
    }

    pointerClick() {
        this.#Canvas.setPointerMouseMode();
        //this.#DotCoordinatesDrawCssRules.style.display = "initial";
    }
}