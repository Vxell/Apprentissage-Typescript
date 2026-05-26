type Priorite = "basse"|"normale"|"haute"|"urgente";
type Statut = "a_faire"|"en_cours"|"terminee"|"annulee";
interface Tache{
    id:string,
    titre:string,
    description?:string,
    priorite: Priorite;
    statut : Statut;
    createdAt : Date;
    dateEcheance?:Date;
    tags : string[];
}
const taches:Tache[] = [];

//CRUD DE BASE

type CreerTacheInput = Omit<Tache,"id"|"statut"|"createdAt">

function creerTache(input:CreerTacheInput):Tache{
    const newTache:Tache = {
        id: Math.random().toString(36).substring(2,10),
        statut : "a_faire",
        createdAt: new Date(),
        ...input,
    };
    taches.push(newTache);
    return newTache;
}

function obtenirTache(id:string):Tache | undefined{
    return taches.find((t)=>t.id === id)
}

type modifierTacheInput = Partial<Omit<Tache,"id"|"createdAt">>;

type ResultatModification =
    | { succes: true; tache: Tache }
    | { succes: false; raison: string };

function modifierTache(id: string, modifications: modifierTacheInput): ResultatModification {
  const index = taches.findIndex((t) => t.id === id);
  if (index === -1) {
    return { succes: false, raison: "Tâche non trouvée" };
  }
  const ancienne = taches[index]!;
  const nouvelle: Tache = { ...ancienne, ...modifications };
  taches[index] = nouvelle;      
  return { succes: true, tache: nouvelle };
}

function supprimerTache(id:string):boolean{

    const index = taches.findIndex((t) => t.id === id);
    if (index === -1) {
        return false;            // pas trouvée
    }
    taches.splice(index, 1);   // supprime 1 élément à la position `index`
    return true;
}

//RECHERCHE ET FILTRAGE

function listerToutes():Tache[]{
    return taches;
}

function tachesParStatut(statut:Statut):Tache[]{
    return taches.filter((t)=>t.statut === statut);
}

function tachesParPriorite(priorite:Priorite):Tache[]{
    return taches.filter((t)=>t.priorite === priorite);
}

function tachesParTag(tag:string):Tache[]{
    return taches.filter((t)=>t.tags.includes(tag))
}

function rechercher(critere:(t:Tache)=>boolean):Tache[]{
    return taches.filter(critere);
}

//Statistiques

function compterParStatut():Record<Statut,number>{
     const initial: Record<Statut, number> = {
        a_faire: 0,
        en_cours: 0,
        terminee: 0,
        annulee: 0
    };
    taches.forEach((t) => {
        initial[t.statut]++;
    });
    return initial;
}

function compterParPriorite():Record<Priorite,number>{
    const initial: Record<Priorite, number> = {
        basse: 0,
        normale: 0,
        haute: 0,
        urgente: 0
    };
    taches.forEach((t) => {
        initial[t.priorite]++;
    });
    return initial;
}

function pourcentageTerminees(): number{
    const tachescount = taches.length;
    if (tachescount === 0) return 0;

    const tachesTerminees = taches.filter((t) => t.statut === "terminee").length;
    return (tachesTerminees / tachescount) * 100;
}

//TRI

function trierParPriorite(taches:Tache[]):Tache[]{

   const ordreP: Record<Priorite, number> = {
    urgente: 0,
    haute: 1,
    normale: 2,
    basse: 3,
    };


    return [...taches].sort((a, b) => ordreP[a.priorite] - ordreP[b.priorite]);
}

function trierParDateEcheance(taches:Tache[]):Tache[]{
    const dateValeur = (t: Tache) => t.dateEcheance?.getTime() ?? Infinity;
    return [...taches].sort((a, b) => dateValeur(a) - dateValeur(b));
}

function formaterTache(t: Tache): string{
    const emojiPriorite: Record<Priorite, string> = {
    urgente: "🔥",
    haute: "⚠️",
    normale: "📌",
    basse: "🌱",
    };
    return `${emojiPriorite[t.priorite]} ${t.titre} - ${t.statut} (échéance: ${t.dateEcheance ? t.dateEcheance.toLocaleDateString() : "Aucune"}) ${t.description ? `\n  ${t.description}` : ""} ${t.tags.length > 0 ? `\n  Tags: ${t.tags.join(", ")}` : ""}`;
}

function afficherToutes(taches: Tache[]): void {
    if (taches.length === 0) {
        console.log("Aucune tâche à afficher.");
        return;
    }

    taches.forEach(tache => {
        console.log(formaterTache(tache));
        console.log("-----------------------------------------"); // Séparateur visuel
    });
}

console.log("\n=== 🚀 DÉMO GESTIONNAIRE DE TÂCHES ===\n");

// 1. Créer 5 tâches variées
const t1 = creerTache({
  titre: "Faire les courses",
  description: "Pain, lait, fruits",
  priorite: "haute",
  dateEcheance: new Date("2025-12-31"),
  tags: ["shopping", "weekend"],
});

const t2 = creerTache({
  titre: "Apprendre TypeScript",
  priorite: "urgente",
  tags: ["dev", "apprentissage"],
});

const t3 = creerTache({
  titre: "Appeler maman",
  priorite: "normale",
  tags: ["famille"],
});

const t4 = creerTache({
  titre: "Trier le bureau",
  priorite: "basse",
  tags: ["maison"],
});

const t5 = creerTache({
  titre: "Réviser pour l'examen",
  priorite: "urgente",
  dateEcheance: new Date("2025-12-20"),
  tags: ["dev", "urgent"],
});

// 2. Afficher toutes
console.log("--- TOUTES LES TÂCHES ---");
afficherToutes(listerToutes());

// 3. Modifier une tâche
const resultat = modifierTache(t2.id, {
  statut: "en_cours",
  description: "Section : génériques",
});

if (resultat.succes) {
  console.log("\n--- Modifiée ---");
  console.log(formaterTache(resultat.tache));
} else {
  console.log("Erreur :", resultat.raison);
}

// 4. Marquer une comme terminée
modifierTache(t1.id, { statut: "terminee" });

// 5. Recherche par tag
console.log("\n--- TÂCHES AVEC TAG 'dev' ---");
afficherToutes(tachesParTag("dev"));

// 6. Tri par priorité
console.log("\n--- TRIÉES PAR PRIORITÉ ---");
afficherToutes(trierParPriorite(listerToutes()));

// 7. Recherche avec prédicat custom (utilise le générique)
console.log("\n--- TÂCHES URGENTES OU HAUTES ---");
afficherToutes(
  rechercher((t) => t.priorite === "urgente" || t.priorite === "haute")
);

// 8. Stats
console.log("\n--- STATISTIQUES ---");
console.log("Par statut :", compterParStatut());
console.log("Par priorité :", compterParPriorite());
console.log(`% terminées : ${pourcentageTerminees().toFixed(1)}%`);

// 9. Supprimer
console.log("\n--- SUPPRESSION ---");
console.log("Suppression t4 :", supprimerTache(t4.id));
console.log("Suppression inexistante :", supprimerTache("id-bidon"));
console.log(`Reste ${listerToutes().length} tâches`);

// 10. Tester le cas d'erreur de modification
const erreur = modifierTache("id-inexistant", { titre: "X" });
if (!erreur.succes) {
  console.log("\nGestion d'erreur OK :", erreur.raison);
}

console.log("\n=== ✅ FIN DE LA DÉMO ===\n");
