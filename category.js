class Category {
    name;

    constructor(name){
        this.name = name;
    }

    toString(){
        return this.name
    }
}


const categories = [ new Category("Alimentaire"), new Category("vêtements") , new Category("meubles"), new Category("Outils"), 
    new Category("Lingerie")]