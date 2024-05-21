class CanvasMouse {
    #Modes = Enum({ pointer: 'pointer mode', draw: 'draw mode' });

    #Parent;

    #Mode;    
    #Draw;
    #Pointer;
    #IsDown;
    #Target;

    constructor(parent) {
        this.#Parent = parent;
        this.#Draw = new CanvasMouseDraw(this);
        this.#Pointer = new CanvasMousePointer(this);
        this.#Mode = this.#Modes.draw;
        this.#IsDown = false;
        this.initEvents();
    }

    initial() {
        this.#Pointer.initial();
    }

    initEvents() {
        this.#Parent.getElement().onmousedown = (event) => { this.down(event) };
        document.onmouseup = (event) => { this.up(event, this) };
        this.#Parent.getElement().onmousemove = (event) => { this.move(event) };
        this.#Parent.getElement().onclick = (event) => { this.click(event) };
    }

    setMode(mode) {
        this.#Mode = mode;
    }

    getModes() {
        return this.#Modes;
    }

    down(event) {
        this.#IsDown = true;
        switch (this.#Mode) {
            case this.#Modes.draw: {
                this.startDrawing(event);
            }
        }
    }

    up(event) {
        this.#IsDown = false;
        switch (this.#Mode) {
            case this.#Modes.draw: {
                this.stopDrawing(event);
            }
        }
    }

    click(event) {
        switch (this.#Mode) {
            case this.#Modes.pointer: {
                this.select(event);
            }
        }
    }

    move(event) {
        if (this.#IsDown) {
            switch (this.#Mode) {
                case this.#Modes.draw: {
                    this.drawing(event);
                }
            }
        }
    }

    startDrawing(event) {
        let coord = this.getCorrectedCoords(event);
        this.#Draw.startDraw(coord.x, coord.y);
    }

    stopDrawing(event) {
        this.#Draw.stopDraw();
    }

    drawing(event) {
        let coord = this.getCorrectedCoords(event);
        this.#Draw.draw(coord.x, coord.y);
    }

    select(event) {
        this.#Pointer.select(event);
    }

    getCorrectedCoords(event) {
        let coord = {
            x: event.clientX - this.#Parent.getElement().getBoundingClientRect().x,
            y: event.clientY - this.#Parent.getElement().getBoundingClientRect().y,
        }

        return coord;
    }

    getDraw() {
        return this.#Draw;
    }

    getParent() {
        return this.#Parent;
    }
}