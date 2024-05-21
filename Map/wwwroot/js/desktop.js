class Desktop {
    #Element;

    #Canvas;
    #MousePanel;

    constructor() {
        this.#Element = document.getElementById('desktop');
        this.#Canvas = new Canvas(this);
        this.#MousePanel = new MousePanel(this);
        this._detailsPanel = new DetailsPanel(this);
        this.initial();
    }

    initial() {
        this.#Canvas.initial();
    }

    get DetailsPanel() {
        return this._detailsPanel;
    }

    getCanvas() {
        return this.#Canvas;
    }

    getElement() {
        return this.#Element;
    }
}