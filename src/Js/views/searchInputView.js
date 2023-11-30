class searchInputView {
  #parentElement = document.querySelector(".searchInput");

  #clearInput() {
    this.#parentElement.querySelector("input").value = "";
  }
  getQuery() {
    const inputValue = this.#parentElement.querySelector("input").value;
    // this.#clearInput();
    return inputValue;
  }
  addHandlerGetInput(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      handler();
    });

    this.#parentElement.addEventListener("keypress", function (e) {
      if (e.keyCode == 13) handler();
    });
  }
}

export default new searchInputView();
