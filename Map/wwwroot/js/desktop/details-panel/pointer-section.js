class DetailsPointerSection {
    #Parent;
    #Element;

    constructor(parent) {
        this.#Parent = parent;
        this.#Element = document.getElementById("details-pointer-section");
    }

    update(objectId, pointId, pointX, pointY) {
        document.getElementById("object-id").innerHTML = objectId;
        document.getElementById("point-id").innerHTML = pointId;
        document.getElementById("point-x").innerHTML = pointX;
        document.getElementById("point-y").innerHTML = pointY;
    }

    getParent() {
        return this.#Parent;
    }
}