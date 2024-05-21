class CanvasMouseDotsManager {
    #PathDots;

    lastCoords;
    currentId;

    constructor() {
        this.lastCoords = { x: null, y: null };
        this.currentId = 0;
        this.#PathDots = [];
        this.initial();
    }

    initial() {

    }

    setLastCoords(coordX, coordY) {
        this.lastCoords.x = coordX;
        this.lastCoords.y = coordY;
    }

    saveDot(coordX, coordY, dotId, pathId, tag) {
        this.#PathDots.push({ pathId: pathId, dotId: dotId, x: coordX, y: coordY, tag: tag });
    }

    getPhantomCoords(coordX1, coordY1, coordX2, coordY2, newLength) {
        let vector = { x: coordX2 - coordX1, y: coordY2 - coordY1 };
        let length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        vector.x = vector.x / length;
        vector.y = vector.y / length;

        return { x: coordX2 + vector.x * newLength, y: coordY2 + vector.y * newLength };
    }

    getDistance(coordX1, coordY1, coordX2, coordY2) {
        return Math.sqrt(Math.pow((coordX2 - coordX1), 2) + Math.pow((coordY2 - coordY1), 2));
    }
}