function Calculertva(montant:number , taux:number = 0.18):number{
    return montant * (1+taux);
}

console.log(Calculertva(10000));
console.log(Calculertva(24000,0.20))

const Calculertvabis= (montant:number , taux:number=0.20):number =>
        montant * (1+taux);

console.log(Calculertvabis(5000))

function logger(message:string):void{

    return console.log(`LOG ${message}`)
}

logger('APPLICATION DEMARRÉ')

function presenter(nom:string , age?:number):string{

    if (age===undefined) {
        return `je suis ${nom}`
    } else {
        return `je suis ${nom} j'ai ${age} ans`
    }
}

console.log(presenter("Kouame guy marc axel"))
console.log(presenter('Kouame Guy Marc Axel',23))

interface Produit{

    nom:string,
    prix:number,
    stock:number,
}

const catalogue: Produit[] =[
  { nom: "Clavier", prix: 50, stock: 10 },
  { nom: "Souris", prix: 25, stock: 0 },
  { nom: "Écran", prix: 200, stock: 3 },
  { nom: "Casque", prix: 80, stock: 7 },
]

// .filter : garde les produits en stock

const enstock = catalogue.filter((c)=>c.stock>0);

console.log(`En stock :`,enstock)
console.log(`En stock :`,enstock.length)

// .map : transforme chaque produit en juste son nom

const nomproduits = catalogue.map((n)=>n.nom)

console.log(`${nomproduits.join(", ")}`)

// .map : applique 20% de réduction

const enpromo = catalogue.map((p)=> ({
    ...p ,
    prix : p.prix * 0.8,
}))

console.log("En promo:",enpromo);

// .reduce : calcule la valeur totale du stock
const valeurTotale = catalogue.reduce(
  (total, p) => total + p.prix * p.stock,
  0  // valeur initiale
);
console.log(`Valeur totale du stock : ${valeurTotale}€`);

// Type décrivant une fonction qui transforme un produit en string
type FormatterProduit = (p: Produit) => string;

const formatCourt: FormatterProduit = (p) => `${p.nom} (${p.prix}€)`;

const formatLong: FormatterProduit = (p) =>
  `${p.nom} - ${p.prix}€ - Stock: ${p.stock}`;

// Fonction qui prend un formatter en paramètre
function afficherCatalogue(produits: Produit[], format: FormatterProduit): void {
  produits.forEach((p) => console.log(format(p)));
}

console.log("--- Format court ---");
afficherCatalogue(catalogue, formatCourt);

console.log("--- Format long ---");
afficherCatalogue(catalogue, formatLong);

interface Compte {
  proprietaire: string;
  solde: number;
}

function creerCompte(proprietaire: string, soldeInitial?: number): Compte {

    return {
    proprietaire: proprietaire,
    solde: soldeInitial === undefined ? 0 : soldeInitial,
    };

}

function deposer(compte: Compte, montant: number): Compte{

    return {
        ...compte,
        solde : compte.solde+montant,
    }; 
}

function retirer(compte: Compte, montant: number): Compte{
    if (compte.solde-montant<0) {
        console.log('ne retire pas');
        return compte
    }
    return{
        ...compte,
        solde : compte.solde-montant,
    };
    
}

function afficherCompte(compte: Compte): void{
     console.log(`${compte.proprietaire} Solde ${compte.solde}£`)
}

const compte1 = creerCompte("Axel");                    // solde 0
const compte2 = creerCompte("Aïcha", 500);              // solde 500

const compte1Bis = deposer(compte1, 1000);              // 1000
const compte2Bis = retirer(compte2, 200);               // 300
const compte2Ter = retirer(compte2Bis, 5000);           // refus

afficherCompte(compte1Bis);
afficherCompte(compte2Ter);

console.log("Original intact ?", compte1);              // doit être { ..., solde: 0 }

function filtrerProduits(
  produits: Produit[],
  predicat: (p: Produit) => boolean
): Produit[] {
   const resultat: Produit[] = [];
   produits.forEach((p)=>{
        if (predicat(p)) {
            resultat.push(p)
        }
   })

   return resultat;
}