// Création des articles
const categories = ["nourriture", "vêtement", "meuble", "outil", "livre"]



const articles = [
    {name: "Pizza", category: categories[0], price: 4},
    {name: "Pantalon", category: categories[1], price: 28},
    {name: "Jupe", category: categories[1], price: 200},
    {name: "Table basse", category: categories[2], price: 60},
    {name: "Marteau", category: categories[3], price: 10},
    {name: "La bible", category: categories[4], price: 800},
]

function capitalize( word){
return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function createArticle(article) {
    const element = document.createElement("div")
    element.classList.add("article")

    const name = document.createElement("h2");
    name.textContent = capitalize(article.name)

    const category = document.createElement("p")
    category.textContent = capitalize(article.category)

    const price = document.createElement("p")
    price.textContent = article.price

    element.append(name, category, price)

    const articleContainer = document.getElementById("article-container")
    articleContainer.append(element)
}

let articlesHtml = articles.map(article => createArticle(article))
