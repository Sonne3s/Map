class CanvasMouseRender {
    #Parent

    constructor() {
        this.initial();
    }

    initial() {

    }

    createPath(attrbutes) {
        return this.#createSvgPrimitive("path", "http://www.w3.org/2000/svg", attrbutes);
    }

    createCircle(attrbutes) {
        return this.#createSvgPrimitive("circle", "http://www.w3.org/2000/svg", attrbutes);
    }

    #createSvgPrimitive(tag, namespaceUri, attributes) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.#addAttributes(element, attributes);

        return element;
    }

    #addAttributes(element, attributes) {
        
        return attributes.forEach(attribute => element.setAttribute(attribute.name, attribute.value));
    }
}