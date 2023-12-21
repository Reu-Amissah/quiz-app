"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalMain = void 0;
class GlobalVariables {
    constructor(lightMode) {
        this._lightMode = lightMode;
    }
    // Getter for name
    get mode() {
        return this._lightMode;
    }
    // Setter for name
    set mode(diffMode) {
        this._lightMode = diffMode;
    }
}
let globalMain = new GlobalVariables(true);
exports.globalMain = globalMain;
