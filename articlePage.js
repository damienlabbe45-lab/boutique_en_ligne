export default class ArticlePage {
    constructor(articles) {
        this.articles = articles
    }

    createElement() {
        const section = document.createElement("section")
        section.classList.add("articles-page")

        const title = document.createElement("h1")
        title.textContent = "Articles"

        section.append(title)

        this.articles.forEach(article => {
            section.append(article.createElement())
        })

        return section
    }

        mount(container) {
        container.append(this.createElement());
    }
}