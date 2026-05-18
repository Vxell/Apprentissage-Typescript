function afficher(valeur:string|number):void {
    if (typeof valeur === "string") {
        console.log(valeur.toUpperCase());
    }else{
        console.log(valeur.toFixed(2))
    }
}

afficher("abc-231");
afficher(723)

function longueurtexte(s:string|null):number{
    if (s === null) return 0;
    return s.length;
}

console.log(longueurtexte('Bonjour je suis marc axel'));
console.log(longueurtexte(null));

function premierelement(valeur:string|string[]):string{
    if (Array.isArray(valeur)) {
        return valeur[0] ?? 'vide';
    }
    return valeur;
}

console.log(premierelement("Alice"));
console.log(premierelement(["Bob", "Charlie"]));
console.log(premierelement([]));

//EXERCICE 2

type Niveau = "debutant" | "intermediaire" | "avance";

interface Cours{
    titre :string;
    niveau:Niveau;
    duree:number
}

const cours : Cours[] = [
    {titre:"HTML",niveau:"debutant",duree:5},
    { titre: "React", niveau: "intermediaire", duree: 15 },
    { titre: "Architecture distribuée", niveau: "avance", duree: 30 },
]

function coursParNiveau(cours:Cours[],niveau:Niveau):Cours[] {
    return cours.filter((c)=>c.niveau === niveau)
}

console.log(coursParNiveau(cours,"intermediaire"))

function emojiNoveau(niveau:Niveau):string{
    if (niveau === "debutant") return "🌱";
    if (niveau === "intermediaire") return "🌿";
    return "🌳";
}

cours.forEach((c)=>{
    console.log(`${emojiNoveau(c.niveau)} ${c.titre}`)
})

//EXERCICE 3

// Modélise une réponse d'API
type ReponseApi<T> =
  | { statut: "loading" }
  | { statut: "success"; data: T }
  | { statut: "error"; message: string };


interface Utilisateur {
  id: string;
  nom: string;
}

function afficherReponse(reponse: ReponseApi<Utilisateur>): void {
  if (reponse.statut === "loading") {
    console.log("⏳ Chargement en cours...");
    return;
  }

  if (reponse.statut === "error") {
    // ici TS sait : reponse a un champ `message`
    console.log(`❌ Erreur : ${reponse.message}`);
    return;
  }

  // ici TS sait : reponse a un champ `data` de type Utilisateur
  console.log(`✅ Utilisateur : ${reponse.data.nom} (${reponse.data.id})`);
}

// Tests : simule 3 réponses
afficherReponse({ statut: "loading" });
afficherReponse({ statut: "error", message: "Réseau indisponible" });
afficherReponse({ statut: "success", data: { id: "u1", nom: "Aïcha" } });

//BLOC 3 

type StatutPaiement = "en_attente" | "valide" | "echoue" | "rembourse";

interface Paiement{
    id:string;
    montant:number;
    statut:StatutPaiement;
}

const p: Paiement={id:"1",montant:100,statut:"en_attente"};
    
function messagePaiement (p:Paiement) : string{
    if(p.statut === 'en_attente') return "En attente de validation";
    if(p.statut === 'valide') return "Paiement de Xxeuro validé";
    if(p.statut === 'echoue') return "Paiement echoué";
    return "XXe remboursé";
}

console.log(messagePaiement(p))

const paie : Paiement[] = [
    {id:"1",montant:100,statut:"en_attente"},
    {id:"2",montant:300,statut:"valide"},
    {id:"4",montant:500,statut:"echoue"},
    {id:"10",montant:400,statut:"rembourse"},
]

paie.forEach((p)=>{
    console.log(`${p.statut}${messagePaiement(p)}`)
})


//MISSION 2

interface Compte {
  proprietaire: string;
  solde: number;
}

type ResultatRecherche =
  | { trouve: true; compte: Compte }
  | { trouve: false; raison: string };

function chercherCompte(id: string): ResultatRecherche {
     if  (id==='Axel'){
        return{
            trouve:true,
            compte:{proprietaire:"Axel",solde:200}
        }
     }
     return{
        trouve:false,
        raison:"Aucun compte"
     }
}

console.log(`${chercherCompte("Axel")}`)
console.log(`${chercherCompte("Inconnu")}`)

function traiterRecherche(r: ResultatRecherche): void {
  if (r.trouve === true) {
    console.log(`Compte de ${r.compte.proprietaire} : ${r.compte.solde}€`);
  } else {
    console.log(`Compte non trouvé : ${r.raison}`);
  }
}

traiterRecherche(chercherCompte("Axel"))
traiterRecherche(chercherCompte("Inconnu"))

//MISSION 3

type Forme =
  | { type: "cercle"; rayon: number }
  | { type: "rectangle"; largeur: number; hauteur: number }
  | { type: "triangle"; base: number; hauteur: number };

function aire(f: Forme): number{
    if (f.type === "cercle") return Math.PI * f.rayon**2;
    if (f.type === "rectangle") return f.hauteur * f.largeur
    return (f.base*f.hauteur)/2
}

console.log(aire({ type: "cercle", rayon: 5 }));
console.log(aire({ type: "rectangle", largeur: 4, hauteur: 6 }));
console.log(aire({ type: "triangle", base: 4, hauteur: 5 }));
    


