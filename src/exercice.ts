interface Livre{
    titre:string;
    auteur:string;
    annee:number;
    disponible:boolean;
}

const bibliotheques:Livre[]=[
    {titre:"Test",auteur:"Axel",annee:2003,disponible:true},
    {titre:"Test2",auteur:"AxelK",annee:2013,disponible:true},
    {titre:"Test3",auteur:"AxellK",annee:2023,disponible:false}
]

bibliotheques.forEach((l)=>console.log(`${l.titre}- ${l.auteur} (${l.annee}) - Dispo:${l.disponible}`))

const dispo = bibliotheques.filter((l)=>l.disponible);
console.log(`nombre de livres disponibles ${dispo.length}`)

const noms: string[] = [];
const premier = noms[0];
if (premier) {
    console.log(premier.toUpperCase());
}else{
    console.log('Tableau vide')
}


