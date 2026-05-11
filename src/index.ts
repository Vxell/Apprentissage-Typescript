// // 1. Variables typées
// const nom: string = "Aïcha";
// const age: number = 28;
// const estDeveloppeuse: boolean = true;

// console.log(`${nom} a ${age} ans , developpeuse: ${estDeveloppeuse}`);

// // 2. Tableau
// // const langages: string[] = ["JS", "TS", "Python"];
// // console.log(`Elle connaît : ${langages.join(", ")}`);
// const langages : string[] = ["JS","TS","Python"];
// console.log(`elle connait : ${langages.join(", ")}`)

// //3. Objet typé avec interface


// interface Personne{
//     nom:string;
//     age:number;
//     email:string;
// }

// type Animal ={
//     nom:string;
//     race:string;
//     age:number;
// }

// const animal1 : Animal={

//     nom:'chien',
//     race:'bulldog',
//     age:13
// }

// console.log(animal1)

// const Personne1: Personne={
//     nom:'Kouame',
//     age:23,
//     email:"marcaxelkouame@gmail.com"
// }

// console.log(Personne1)

// //4. Tableau d'objets
// const equipe: Personne[] = [
//   { nom: "Aïcha", age: 28, email: "a@ex.com" },
//   { nom: "Mamadou", age: 32, email: "m@ex.com" },
// ];

// equipe.forEach((p) => console.log(`${p.nom} - ${p.email}`));

// const troupe:Animal[]=[
//     {nom:'chien',
//     race:'bulldog',
//     age:13},
//     {nom:'chat',
//     race:'inconnu',
//     age:12}
// ]

// troupe.forEach((a)=>console.log(`${a.nom}-${a.race}`));

const age: number = 14;      // ❌ Que dit TS ?
interface Personne{
    nom: string;
}
const personne1: Personne = { nom: "X" }; // ❌ Champs manquants
const langages: string[] = ["1", "2", "3"];    // ❌ Pas des strings
