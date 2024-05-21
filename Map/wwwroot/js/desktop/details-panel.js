class DetailsPanel {
    #Parent;
    #Element;

    #DrawSection;
    #PointerSection

    constructor(parent) {
        this.#Parent = parent;
        this.#Element = document.getElementById("details-panel");
        this.#DrawSection = new DetailsDrawSection(this);
        this.#PointerSection = new DetailsPointerSection(this);
    }

    updatePointerSection(objectId, pointId, pointX, pointY) {
        this.#PointerSection.update(objectId, pointId, pointX, pointY);
    }

    getParent() {
        return this.#Parent;
    }
}