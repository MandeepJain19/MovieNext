export default class View {
  #errorMessage = "Something went wrong try again later...";
  #data;
  render(data) {
    this.#data = data;
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderError = function (message = this.#errorMessage) {
    this._parentElement.innerHTML = "";
    document.querySelector(".error-Container .err-message").innerHTML = message;
    this.#toogleErrAlert();
    document
      .querySelector(".error-Container .btn-close i")
      .addEventListener("click", this.#toogleErrAlert);
  };
  #toogleErrAlert() {
    document.querySelector(".error-Container").classList.toggle("hidden");
  }
  renderSpinner = function () {
    this._clear();
    const markup = `<div class="spinner"><i class="ph-bold ph-spinner"></i></div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };
}
