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

function createArticle(article) {
    const element = document.createElement("div")
    element.classList.add("article")

    const name = document.createElement("h2");
    name.textContent = article.name

    const category = document.createElement("p")
    category.textContent = article.category

    const price = document.createElement("p")
    price.textContent = article.price

    const button = document.createElement("button")
    button.textContent = "Ajouter au panier"
    button.onclick = function() {
        addArticleToCart(article);
    };

    element.append(name, category, price, button)

    const articleContainer = document.getElementById("article-container")
    articleContainer.append(element)
}

articles.map(article => createArticle(article))

function addArticleToCart(article) {
    const cart = document.getElementById("cart-container").getElementsByClassName("cart")[0]
    const name = document.createElement("h2");
    var ArticlesByNameInCart = cart.getElementsByTagName("h2");

    var success = false
    
    for (var i = 0; i < ArticlesByNameInCart.length; i++) {
        if (ArticlesByNameInCart[i].textContent == article.name) {
            success = true;
        }
    }

    if (success == false) {
        const element = document.createElement("div")
        element.classList.add("article")

        name.textContent = article.name

        const category = document.createElement("p")
        category.textContent = article.category

        const price = document.createElement("p")
        price.textContent = article.price

        const quantity = document.createElement("p")
        quantity.textContent = 1

        const button = document.createElement("button")
        button.textContent = "Retirer du panier"
        button.onclick = function() {
            removeArticleFromCart(article);
        };

        element.append(name, category, price, quantity, button)

        cart.append(element)
    }
}




