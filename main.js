

const articleContainer = document.getElementById("article-container")

const categoryContainer = document.getElementById("category-container")


const list_cat = document.createElement('ul');

list_cat.id = 'cat'

categoryContainer.appendChild(list_cat)

// Création des articles
const categories = ["tous", "nourriture", "vêtement", "meuble", "outil", "livre"]



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

function capitalize( word){
return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}



function createCategory(categorie){

    const nameHtml = document.createElement('li');
    nameHtml.id ="ele"
        nameHtml.textContent = capitalize(categorie);
        list_cat.appendChild(nameHtml);
        nameHtml.addEventListener('click', function(){
            nameHtml.dispatchEvent(new CustomEvent("category-selected", {detail: this.textContent, bubbles: true}));
        }); 
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

    articleContainer.append(element)
}

const articles_sort = [...articles].sort((a, b) => {
    return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
})

articles_sort.map(article => createArticle(article))


const categories_sort = [...categories].sort((a, b) => {
    return a.localeCompare(b, 'fr', { sensitivity: 'base' });
})

categories_sort.map(categorie => createCategory(categorie))

document.addEventListener("category-selected", function(event){
    const categorieChoice = event.detail.toLowerCase();
    articleContainer.innerHTML = "";


    if(categorieChoice =="tous") articles_sort.map(article => createArticle(article))

    else{
        articlesFilter = articles_sort.filter(art => art.category.toLowerCase().includes(categorieChoice))
        articlesFilter.map(article => createArticle(article))}
})

