//Mission 2
interface User{
    id:string;
    email:string;
    password:string;
    nom: string;
    age: number;
    adresse: string;
    createdAt: Date;
}

type CreateUserDto = Omit<User,"id"|"createdAt">

function creerUser(data:CreateUserDto):User{
    return {
        id: Math.random().toString(36).substring(2,10),
        createdAt: new Date(),
        ...data,
    }
}

type UpdateDto = Partial<Omit<User,"id">>
function updateUser(id:string ,donnes:UpdateDto):User{
    console.log(`Update effectué ${id} avec donnees:`,donnes);
    return {
    id,
    email: donnes.email ?? "unknown@mail.com",
    password: donnes.password ?? "password123",
    nom: donnes.nom ?? "Anonyme",
    age: donnes.age ?? 0,
    adresse: donnes.adresse ?? "Inconnue",
    createdAt: new Date()
  };
}

type UserPublic = Pick<User,"id"|"nom"|"age">
function getUserPublic (data:User):UserPublic{
    return {
        id: data.id,
        nom: data.nom,
        age: data.age
    }
}

type UserCredentials = Pick<User,"email"|"password">
function login (creds:UserCredentials):boolean{
    return creds.email.includes("@");
}

// MISSION 1 — Boîte à outils générique

function estVide<T>(tableau: T[]): boolean{
    return tableau.length===0
}

function enleverDoublons<T>(tableau: T[]): T[] {
  return [...new Set(tableau)];
}

function derniers<T>(tableau: T[], n: number): T[] {
  return tableau.slice(-n);
}

function chunk<T>(tableau: T[], taille: number): T[][] {
  const resultat: T[][] = [];
  for (let i = 0; i < tableau.length; i += taille) {
    resultat.push(tableau.slice(i, i + taille));
  }
  return resultat;
}