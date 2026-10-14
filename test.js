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
const letters = document.getElementById("letters");

const articleContainer = document.getElementById("article-container")

const articles = [
    {name: "Pizza", category: categories[1], price: 4},
    {name: "Pantalon", category: categories[2], price: 28},
    {name: "Jupe", category: categories[2], price: 200},
    {name: "Table basse", category: categories[3], price: 60},
    {name: "Marteau", category: categories[4], price: 10},
    {name: "La bible", category: categories[5], price: 800},
    {name: "pates", category: categories[1], price: 12},
    {name: "Lit", category: categories[3] , price: 24},
    {name: "Les ordinateurs pour les nuls", category: categories[5], price: 1},
    {name: "Tournevis", category: categories[4], price: 8900}
]


function createArticle(article) {
    const element = document.createElement("div")
    element.classList.add("article")

    const name = document.createElement("h2");
    name.textContent = capitalize(article.name)

    const category = document.createElement("p")
    category.textContent = capitalize(article.category)

    const price = document.createElement("p")
    price.textContent = article.price + " €"

    const button = document.createElement("button")
    button.textContent = "Ajouter au panier"
    button.onclick = function() {
        addArticleToCart(article);
    };

    element.append(name, category, price, button)

    articleContainer.append(element)
}



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


const articles_sort = [...articles].sort((a, b) => {
    return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
})

articles_sort.map(article => createArticle(article))


letters.addEventListener("submit", function(e){
    e.preventDefault()
    articleContainer.innerHTML = "";
    const value = document.getElementById("input_web").value.toLowerCase();
    let articlesFilter = articles_sort.filter(art => art.name.toLowerCase().includes(value))

    if(articlesFilter.length == 0) articlesFilter = articles_sort;

    articlesFilter.map(article => createArticle(article))
    
    })
