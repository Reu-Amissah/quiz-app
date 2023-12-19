class GlobalVariables {
  private _lightMode: boolean;

  constructor(lightMode: boolean) {
    this._lightMode = lightMode;
  }

  // Getter for name
  get mode(): boolean {
    return this._lightMode;
  }

  // Setter for name
  set mode(diffMode: boolean) {
    this._lightMode = diffMode;
  }
}

let globalMain = new GlobalVariables(true);

export { globalMain };
