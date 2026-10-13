export default class Article {
    constructor(name, category, price) {
        this.name = name
        this.price = price
        this.category = category
    }

    createElement() {
        const article = document.createElement("div")
        article.classList.add("article")

        const name = document.createElement("h2");
        name.textContent = this.name;

        const category = document.createElement("p")
        category.textContent = this.category

        const price = document.createElement("p")
        price.textContent = `${this.price} €`

        article.append(name, category, price)

        return article
    }

    mount(container) {
        container.append(this.createElement());
    }
}