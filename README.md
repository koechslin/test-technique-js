# Test technique JS (02/05/2020)
## Auteur : Killian OECHSLIN
## Framework utilisé : Angular | Mise en forme faite avec Bootstrap 4

### Installation

---
##### (Note : Si vous voulez éviter d'installer et de lancer l'application localement, vous pouvez également y accéder à partir du lien suivant : https://koechslin.github.io/test-technique-js )

Placez vous dans le dossier de votre choix, puis récupérez l'application depuis git avec la commande
```
git clone https://github.com/koechslin/test-technique-js.git
```
Pour installer les dépendances du projet, déplacez vous dans le dossier du projet puis lancez la commande
```
npm install
```
Si vous n'avez pas la CLI d'Angular d'installée, installez la avec
```
npm install -g @angular/cli
```
Vous pouvez maintenant lancer l'application localement en tapant
```
ng serve
```


### Manuel d'utilisation

---

Lorsque vous chargez l'application, vous arrivez directement sur la liste des items disponibles. Vous pouvez alors :
- Trier les items par ordre de prix croissant (flèche ▲)
- Trier les items par ordre de prix décroissant (flèche ▼)
- Rechercher un produit par son nom (barre de recherche)
- Consulter la fiche d'un item en cliquant sur la ligne correspondante
- Revoir la dernière fiche consultée (s'il y en a une, le lien apparaît en haut du tableau)
