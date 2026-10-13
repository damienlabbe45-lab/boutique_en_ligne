class Category {
    name;

    constructor(name){
        this.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        /** permet de créé l'quivalent de capitalize en python (met en majuscule que la 1ère lettre) */
    }

    toString(){
        return "- " + this.name + "\n"
    }
}

const list_cat = document.createElement('ul');

list_cat.id = 'cat'

class CategoryHtml extends Category{
    constructor(name){
        super(name);
        const nameHtml = document.createElement('li');
        nameHtml.textContent = this.name;
        list_cat.appendChild(nameHtml);
        nameHtml.addEventListener('click', function(){
            nameHtml.dispatchEvent(new CustomEvent("category-selected", {detail: this.textContent, bubbles: true}));
        });   
    }
    static fromCategory(cat) {
        return new CategoryHtml(cat.name);
    }
}

categories_html =[]


const categories = [ new Category("Alimentaire"), new Category("vêtements") , new Category("meubles"), 
    new Category("Outils"), new Category("Lingerie"), new Category("Livres")]

function categories_filter(word){
    return categories_html.filter(cat => cat.name.toLowerCase().includes(word));
}

function initCategories(){
    const categories_sort = [...categories].sort((a, b) => {
    return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
})
const categories_html = categories_filter.map(cat => CategoryHtml.fromCategory(cat));
}

initCategories()