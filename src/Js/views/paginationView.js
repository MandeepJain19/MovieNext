import View from "./view";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination-container");
  #data;
  #currentPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn) return;

      const goto = +btn.dataset.goto;
      this._parentElement.innerHTML = "";
      handler(goto);
    });
  }
  render(data, currentPage) {
    this.#data = data;
    this.#currentPage = currentPage;
    this._clear();
    const markup = this.#generateMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
    this.#disableBtn();
  }
  #generateMarkup() {
    return `
    <button data-goto="${
      this.#currentPage - 1
    }" class="btn btn-left btn-pagination">
      <i class="ph-bold ph-arrow-left"></i> Prev
    </button>
  <div class="currentPage">${this.#currentPage} / ${this.#data.totalPages}</div>
    <button data-goto="${
      this.#currentPage + 1
    }" class="btn btn-right btn-pagination">
      Next <i class="ph-bold ph-arrow-right"></i>
    </button>
`;
  }
  #disableBtn() {
    // Page 1, there are other pages
    if (this.#currentPage === 1 && this.#data.totalPages > 1) {
      const leftBtn = this._parentElement.querySelector(".btn-left");
      leftBtn.disabled = true;
      leftBtn.classList.add("block");
    }
    // Last page
    if (this.#currentPage === this.#data.totalPages) {
      const rightBtn = this._parentElement.querySelector(".btn-right");
      rightBtn.disabled = true;
      rightBtn.classList.add("block");
    }
  }
}

export default new PaginationView();
