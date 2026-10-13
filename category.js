class Category {
    name;

    constructor(name){
        this.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        /** permet de créé l'quivalent de capitalize en python (met en majuscule que la 1ère lettre) */
    }

    toString(){
        return this.name
    }
}


const categories = [ new Category("Alimentaire"), new Category("vêtements") , new Category("meubles"), new Category("Outils"), 
    new Category("Lingerie")]

function categories_filter(word){
    return categories.filter(cat => cat.name.toLowerCase().includes(word));
}

function initCategories(){
    const categories_sort = [...categories].sort((a, b) => {
    return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
})
const categories_string = "\n- " + categories_sort.join("\n- ");
}

initCategories()