class CanvasMouseDraw {
    #Parent

    #Canvas;
    #Render;
    #Path;
    #PathId;
    #PhantomPath;
    #IsDiscreetDrow = true;
    #DiscreetMultiplier = 50;
    #DotsManager;

    constructor(parent) {
        this.#Parent = parent;
        this.#Render = new CanvasMouseRender();
        this.#PathId = 0;
        this.#Path = this.#Render.createPath(this.#getPathAttributesById(this.#PathId));
        this.#Canvas = this.#Parent.getParent().getElement();
        this.#DotsManager = new CanvasMouseDotsManager();
        this.#initial();
    }

    #initial() {
        this.#Canvas.appendChild(this.#Path);
    }

    startDraw(coordX, coordY) {
        this.draw(coordX, coordY, "M", true);
        if (this.#IsDiscreetDrow) {
            this.#DotsManager.setLastCoords(coordX, coordY);
        }
    }

    stopDraw() {
        if (this.#PhantomPath) {
            this.#PhantomPath.remove();
        }
    }

    draw(coordX, coordY, tag, force) {
        tag = tag ?? "L";
        let distance = 0;
        if (force
            || !this.#IsDiscreetDrow
            || (distance = this.#DotsManager.getDistance(coordX, coordY, this.#DotsManager.lastCoords.x, this.#DotsManager.lastCoords.y)) > this.#DiscreetMultiplier) {
            this.#draw(coordX, coordY, tag);
            this.#DotsManager.saveDot(coordX, coordY, this.#PathId, this.#DotsManager.currentId, tag);
            if (this.#IsDiscreetDrow) {
                this.#DotsManager.setLastCoords(coordX, coordY);
                if (this.#PhantomPath) {
                    this.#PhantomPath.remove();
                }
            }
        }
        else {
            this.#phantomDraw(coordX, coordY, distance);
        }
    }    

    getIsDiscreetDrow() {
        return this.#IsDiscreetDrow;
    }

    toggleIsDiscreetDrow() {
        this.#IsDiscreetDrow = !this.#IsDiscreetDrow;
    }

    getDiscreetMultiplier() {
       return this.#DiscreetMultiplier;
    }

    setDiscreetMultiplier(value) {
        this.#DiscreetMultiplier = value;
    }

    //core

    #draw(coordX, coordY, tag) {
        this.#Path.setAttribute("d", (this.#Path.getAttribute("d") ?? "") + tag + coordX + " " + coordY + " ");
        this.#drawDot(coordX, coordY);
    }

    #drawDot(coordX, coordY) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        circle.setAttribute("fill", "red");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "1");
        circle.setAttribute("r", "5");
        circle.setAttribute("cx", coordX);
        circle.setAttribute("cy", coordY);
        circle.setAttribute("data-x", coordX);
        circle.setAttribute("data-y", coordY);
        circle.setAttribute("data-pathId", this.#PathId);
        circle.setAttribute("data-pathDotId", this.#DotsManager.currentId++);
        circle.classList.add("dot-coordinates");
        this.#Canvas.appendChild(circle);
    }

    #phantomDraw(coordX, coordY, distance) {
        if (this.#PhantomPath) {
            this.#PhantomPath.remove();
        }
        let endCoords = this.#DotsManager.getPhantomCoords(this.#DotsManager.lastCoords.x, this.#DotsManager.lastCoords.y, coordX, coordY, this.#DiscreetMultiplier - distance);
        this.#PhantomPath = this.#createPhantomPath(
            "opacity" + this.#getPhantomDrawOpacity(distance),
            this.#DotsManager.lastCoords.x,
            this.#DotsManager.lastCoords.y,
            endCoords.x,
            endCoords.y);
        this.#Canvas.appendChild(this.#PhantomPath);
    }

    #getPhantomDrawOpacity(distance) {
        let opacityMultiplier = 35;

        return Math.round((distance / this.#DiscreetMultiplier * opacityMultiplier) / 10) * 10;
    }
 
    #createPhantomPath(classes, x1, y1, x2, y2) {
        return this.#Render.createPath(this.#getPathAttributes().concat(
            [
                { name: "id", value: "phantom" },
                { name: "class", value: classes },
                { name: "d", value: "M" + x1 + " " + y1 + " " + "L" + x2 + " " + y2 }
            ]));
    }

    #getPathAttributesById(pathId) {
       return this.#getPathAttributes().concat([{ name: "data-id", value: pathId }]);
    }

    #getPathAttributes() {
        return [{ name: "fill", value: "transparent" }, { name: "stroke", value: "black" }];
    }
}