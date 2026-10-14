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
    nameHtml.id ="ele"
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

    if(categorieChoice =="tous") articles_sort.map(article => createArticle(article))
        /** si categorie vaut tous,  on prend tout les articles et on les recréé */

    else{
        const articlesFilter = articles_sort.filter(art => art.category.toLowerCase().includes(categorieChoice))
        articlesFilter.map(article => createArticle(article))}
        /**sinon on filtre les articles en fonction du nom de la catégorie puis on créé uniquement les articles concernés */
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
    {name: "pates", category: categories[1], price: 12, quantity: 0},
    {name: "Lit", category: categories[3] , price: 24, quantity: 0},
    {name: "Les ordinateurs pour les nuls", category: categories[5], price: 1, quantity: 0},
    {name: "Tournevis", category: categories[4], price: 8900, quantity: 0}
]


// Ajouter l'article donné en paramètre sur la page HTML
function createArticle(article) {
    // Création de la balise HTML
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
        // Paramètres de l'article
        const element = document.createElement("div")
        element.classList.add("article")
        element.classList.add("cart-article")

        const name = document.createElement("h2")
        name.textContent = article.name

        const category = document.createElement("p")
        category.textContent = article.category

        const price = document.createElement("p")
        price.textContent = article.price

        // Mise à jour de la quantité
        article.quantity = 1
        const quantity = document.createElement("p")
        quantity.textContent = article.quantity

        // Bouton pour retirer l'article du panier
        const button = document.createElement("button")
        button.textContent = "Retirer du panier"
        button.onclick = function() {
            removeArticleFromCart(article);
        };

        element.append(name, category, price, quantity, button)

        // Ajouter la balise
        cart.append(element)
    }
    // Si l'article est déjà dans le panier, ajouter 1 à la quantité
    else {
        var articlesInCart = cart.getElementsByClassName("cart-article")
        
        for (var i = 0; i < articlesInCart.length; i++) {
            if (articlesInCart[i].getElementsByTagName("h2")[0].textContent == article.name) {
                const element = articlesInCart[i]
                article.quantity += 1
                const quantity = element.getElementsByTagName("p")[2]
                quantity.textContent = article.quantity
            }
        }
    }
}


function removeArticleFromCart(article) {
    // Panier
    const cart = document.getElementById("cart-container").getElementsByClassName("cart")[0]
    // Articles du panier
    var articlesInCart = cart.getElementsByClassName("cart-article")

    // Parcourir le panier pour trouver l'article
    for (var i = 0; i < articlesInCart.length; i++) {
        if (articlesInCart[i].getElementsByTagName("h2")[0].textContent == article.name) {
            const element = articlesInCart[i]
            // Si le panier contient plusieurs fois l'article, en retirer 1
            if (article.quantity > 1) {
                article.quantity -= 1
                const quantity = element.getElementsByTagName("p")[2]
                quantity.textContent = article.quantity
            }
            // S'il n'en reste qu'un exemplaire, retirer le dernier et la balise dans le panier.
            else {
                article.quantity = 0
                element.remove()
            }
        }
    }
}


function pay() {
    // Panier
    const cart = document.getElementById("cart-container").getElementsByClassName("cart")[0]

    // Réinitialiser la quantité pour tous les articles
    articles_sort.map(article => article.quantity = 0)
    // Retirer tous les articles du panier
    cart.innerHTML = "";
}


const articles_sort = [...articles].sort((a, b) => {
    return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
})

articles_sort.map(article => createArticle(article))


letters.addEventListener("submit", function(e){
    /** on filtre sur les noms des articles et si il y a rien ou qu'on trouve rien, on remet tout les aricles */
    e.preventDefault()
    const articleContainer = document.getElementById("article-container")
    articleContainer.innerHTML = "";
    const value = document.getElementById("input_web").value.toLowerCase();
    
    let articlesFilter = articles_sort.filter(art => art.name.toLowerCase().includes(value))

    if(articlesFilter.length == 0) articlesFilter = articles_sort;

    articlesFilter.map(article => createArticle(article))
    
    })