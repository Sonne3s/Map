class CanvasMousePointer {
    #Parent;
    #Details;

    constructor(parent) {
        this.#Parent = parent;
        this.initial();
    }

    initial() {
        this.#Details = this.#Parent.getParent().Parent.DetailsPanel;
    }

    select(event) {
        if (event.target.classList.contains("dot-coordinates")) {
            this.selectPoint(event);
        }
    }

    selectObject(event) {

    }

    selectPoint(event) {
        this.#Details.updatePointerSection(
            event.target.dataset.pathId,
            event.target.dataset.pathDotId,
            event.target.dataset.x,
            event.target.dataset.y);
    }
}