//fonctions utilitaires pour tout le monde

function capitalize( word){
return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
/** met en majuscusle le 1 er caractère d'une chaïne de caractère. cette fonction est inspirée de la fonction capitalize de python */
}

//création des catégories
const categoryContainer = document.getElementById("category-container")


const list_cat = document.createElement('ul');

list_cat.id = 'cat'

categoryContainer.appendChild(list_cat)

const categories = ["tous", "nourriture", "vêtement", "meuble", "outil", "livre"]


function createCategory(categorie){
/**créé pour chaque catégorie un élément de liste qui contient la catégorie et si on clique sur la catégorie de déclencher
 * l'évènement category-selected qui sera propagé jusqu'à ce fichier et ailleurs.
 */
    const nameHtml = document.createElement('li');
        nameHtml.textContent = capitalize(categorie);
        list_cat.appendChild(nameHtml);
        nameHtml.addEventListener('click', function(){
            nameHtml.dispatchEvent(new CustomEvent("category-selected", {detail: this.textContent, bubbles: true}));
        }); 
}

const categories_sort = [...categories].sort((a, b) => {
    return a.localeCompare(b, 'fr', { sensitivity: 'base' });
})
/** trie les catégories dans l'ordre alphabètique */

categories_sort.map(categorie => createCategory(categorie))

/**fonction pour l'évènement category-selected */
document.addEventListener("category-selected", function(event){
    const categorieChoice = event.detail.toLowerCase();
    /** on met en minuscule detail qui contient le nom de la catégorie */
    articleContainer.innerHTML = "";

    /** le innerHTML devient vide */
    let articlesFilter = articles_sort
    /** par défaut articleFilter vaut tout les articles */

    if(categorieChoice !="tous") articlesFilter = articles_sort.filter(art => art.category.toLowerCase().includes(categorieChoice))
        /** si categorie ne vaut pas tous,  on filtre les articles en fonction du nom de la catégorie et on les met dans articleFilter*/

    articlesFilter.map(article => createArticle(article))
        /**on crée uniquement les articles concernés */
})

// Création des articles

const articleContainer = document.getElementById("article-container")

const letters = document.getElementById("letters");

const articles = [
    {name: "Pizza", category: categories[1], price: 4, quantity: 0},
    {name: "Pantalon", category: categories[2], price: 28, quantity: 0},
    {name: "Jupe", category: categories[2], price: 200, quantity: 0},
    {name: "Table basse", category: categories[3], price: 60, quantity: 0},
    {name: "Marteau", category: categories[4], price: 10, quantity: 0},
    {name: "La bible", category: categories[5], price: 800, quantity: 0},
    {name: "Pates", category: categories[1], price: 12, quantity: 0},
    {name: "Lit", category: categories[3] , price: 24, quantity: 0},
    {name: "Les ordinateurs pour les nuls", category: categories[5], price: 1, quantity: 0},
    {name: "Tournevis", category: categories[4], price: 8900, quantity: 0}
]


// Ajouter l'article donné en paramètre sur la page HTML
function createArticle(article) {
    // Création de l'élement HTML
    const element = document.createElement("div")
    element.classList.add("article")

    // Paramètres de l'article
    const name = document.createElement("h2");
    name.textContent = capitalize(article.name)

    const category = document.createElement("p")
    category.textContent = capitalize(article.category)

    const price = document.createElement("p")
    price.textContent = article.price + " €"

    // Bouton pour ajouter l'article au panier
    const button = document.createElement("button")
    button.classList.add("add-to-cart")
    button.textContent = "Ajouter au panier"
    button.onclick = function() {
        addArticleToCart(article);
    };

    element.append(name, category, price, button)

    // Ajouter la balise
    articleContainer.append(element)
}


// Ajouter un article
function addArticleToCart(article) {
    // Panier
    const cart = document.getElementById("cart-container").getElementsByClassName("cart")[0]
    
    

    // Si le panier ne contient pas l'article, ajouter la balise au panier
    if (article.quantity == 0) {
        // Création de l'élement HTML
        const element = document.createElement("div")
        element.classList.add("article")
        element.classList.add("cart-article")

        // Paramètres de l'article
        const name = document.createElement("h2");
        name.textContent = capitalize(article.name)

        const category = document.createElement("p")
        category.textContent = capitalize(article.category)

        const price = document.createElement("p")
        price.textContent = article.price + " €"

        // Mise à jour de la quantité
        article.quantity = 1
        const quantity = document.createElement("p")
        quantity.textContent = "Quantité : " + article.quantity

        // Boutons +/- pour modifier la quantité
        const quantityButtons = document.createElement("div")
        quantityButtons.classList.add("quantity-buttons")

        // Bouton pour ajouter l'article au panier
        const buttonAddOne = document.createElement("button")
        buttonAddOne.classList.add("add-one-button")
        buttonAddOne.textContent = "+"
        buttonAddOne.onclick = function() {
            addArticleToCart(article);
        };

        // Bouton pour enlever 1 à la quantité de l'article dans panier
        const buttonRemoveOne = document.createElement("button")
        buttonRemoveOne.classList.add("remove-one-button")
        buttonRemoveOne.textContent = "-"
        buttonRemoveOne.onclick = function() {
            removeOneArticleFromCart(article);
        };

        quantityButtons.append(buttonAddOne, buttonRemoveOne)

        // Bouton pour retirer l'article du panier
        const buttonRemoveAll = document.createElement("button")
        buttonRemoveAll.classList.add("remove-all-button")
        buttonRemoveAll.textContent = "Retirer du panier"
        buttonRemoveAll.onclick = function() {
            removeArticleFromCart(article);
        };// Bouton pour payer
        const payButton = document.getElementsByClassName("cart-button")[0]
        payButton.addEventListener('click', pay)

        element.append(name, category, price, quantity, quantityButtons, buttonRemoveAll)

        // Ajouter la balise
        cart.append(element)
    }
    // Si l'article est déjà dans le panier, ajouter 1 à la quantité
    else {
        var articlesInCart = cart.getElementsByClassName("cart-article")

        for (var i = 0; i < articlesInCart.length; i++) {
            if (articlesInCart[i].getElementsByTagName("h2")[0].textContent.toLowerCase() == article.name.toLowerCase()) {
                const element = articlesInCart[i]
                article.quantity += 1
                const quantity = element.getElementsByTagName("p")[2]
                quantity.textContent = "Quantité : " + article.quantity
            }
        }
    }

    // Mettre à jour le prix total
    totalPrice()
}

// Retire un exemplaire d'un article donné du panier (retire 1 à la quantité)
function removeOneArticleFromCart(article) {
    // Panier
    const cart = document.getElementById("cart-container").getElementsByClassName("cart")[0]
    // Articles du panier
    var articlesInCart = cart.getElementsByClassName("cart-article")

    // Parcourir le panier pour trouver l'article
    for (var i = 0; i < articlesInCart.length; i++) {
        if (articlesInCart[i].getElementsByTagName("h2")[0].textContent.toLowerCase() == article.name.toLowerCase()) {
            const element = articlesInCart[i]
            // Si le panier contient plusieurs fois l'article, en retirer 1
            if (article.quantity > 1) {
                article.quantity -= 1
                const quantity = element.getElementsByTagName("p")[2]
                quantity.textContent = "Quantité : " + article.quantity
            }
            // S'il n'en reste qu'un exemplaire, retirer le dernier et la balise dans le panier.
            else {
                article.quantity = 0
                element.remove()
            }
        }
    }

    // Mettre à jour le prix total
    totalPrice()
}


function removeArticleFromCart(article) {
    // Panier
    const cart = document.getElementById("cart-container").getElementsByClassName("cart")[0]
    // Articles du panier
    var articlesInCart = cart.getElementsByClassName("cart-article")

    // Parcourir le panier pour trouver l'article
    for (var i = 0; i < articlesInCart.length; i++) {
        if (articlesInCart[i].getElementsByTagName("h2")[0].textContent.toLowerCase() == article.name.toLowerCase()) {
            const element = articlesInCart[i]
            // Retirer l'article du panier et définir la quantité à 0
            article.quantity = 0
            element.remove()
        }
    }

    // Mettre à jour le prix total
    totalPrice()
}


function pay() {
    // Panier
    const cart = document.getElementById("cart-container").getElementsByClassName("cart")[0]

    // Réinitialiser la quantité pour tous les articles
    articles_sort.map(article => article.quantity = 0)
    // Retirer tous les articles du panier
    cart.innerHTML = ""

    // Mettre à jour le prix total
    totalPrice()
}




const articles_sort = [...articles].sort((a, b) => {
    return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
})

articles_sort.map(article => createArticle(article))


// Calcule le prix total et l'affiche dans le panier
function totalPrice() {
    // Balise du prix total
    const element = document.getElementById("total-price")
    // Prix total
    var total = 0

    // Ajouter le prix de chaque article * sa quantité au total
    articles_sort.map(article => total += article.price * article.quantity)
    // Ajouter le total à la page HTML
    element.textContent = "Prix total : " + total + " €"
}


letters.addEventListener("submit", function(e){
    /** on filtre sur les noms des articles et si il y a rien ou qu'on trouve rien, on remet tout les aricles */
    e.preventDefault()
    articleContainer.innerHTML = "";
    const value = document.getElementById("input_web").value.toLowerCase();
    
    let articlesFilter = articles_sort.filter(art => art.name.toLowerCase().includes(value))

    if(articlesFilter.length == 0) articlesFilter = articles_sort;

    articlesFilter.map(article => createArticle(article))
    
    })