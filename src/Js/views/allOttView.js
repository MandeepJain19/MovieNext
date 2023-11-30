class allOttView {
  #parentElement = document.querySelector(".whereToWatch-tabDetail");
  #allOtt;

  render(allOtt) {
    console.log(allOtt);
    this.#allOtt = allOtt;
    const markup = this.#generateMarkup();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup.join(" "));
  }

  #generateMarkup() {
    const markup = this.#allOtt.map((el) => {
      return `<div class="platform"><img src="https://image.tmdb.org/t/p/w45${el.logo_path}" alt="${el.provider_name}" /></div>`;
    });

    return markup;
  }
}

export default new allOttView();
