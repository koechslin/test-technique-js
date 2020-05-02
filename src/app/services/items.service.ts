import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService { // service qui va gérer le stockage/chargement des items ainsi que leur manipulation

  items: Item[] = []; // contient tous les items chargés
  itemsSubject = new Subject<Item[]>(); // permet de communiquer automatiquement les données aux composants
  private itemsJsonURL = 'assets/items.json'; // URL du fichier JSON contenant les données

  constructor(private httpClient: HttpClient) {
  }

  emitItemsSubject() { // méthode envoyant une copie de l'array 'items' grâce au Subject
    this.itemsSubject.next(this.items.slice());
  }

  getItems() { // méthode qui va charger les items depuis le JSON (stocké dans assets)

    // on retourne une Promise afin qu'on puisse (à l'initialisation) attendre que les données soient bien arrivées
    // (cela est utile si par exemple on rafraîchit la page d'un Item, ou que l'on accède directement à une page d'un Item en tapant l'URL)
    return new Promise((resolve, reject) => {
      // requête grâce à HttpClient pour récupérer les items
      this.httpClient.get<Item[]>(this.itemsJsonURL).subscribe(
        (response) => {
          this.items = response;
          this.emitItemsSubject(); // une fois les données reçues, on les émet pour les autres composants
          resolve();
        },
        (error) => {
          console.log('Erreur lors du chargement du fichier JSON : '+error);
          reject();
        }
      );
    });
  }

  orderItemsByAscendingPrice() { // méthode triant les items dans l'array par prix croissant
    this.items.sort(function(itemA: Item, itemB: Item): number {
      // tout d'abord on convertit les prix (qui sont des string) en number en enlevant les caractères qui ne sont ni des chiffres ni un point
      let costA: number = Number(itemA.unit_cost.replace(/[^0-9.-]+/g,""));
      let costB: number = Number(itemB.unit_cost.replace(/[^0-9.-]+/g,""));

      if (costA<costB) {
        return -1;
      } else if (costA>costB) {
        return 1;
      } else {
        // en cas d'égalité de prix, on trie par ordre alphabétique
        if (itemA.product_name<itemB.product_name) {
          return -1;
        } else {
          return 1;
        }
      }
    });
    this.emitItemsSubject();
  }

  orderItemsByDescendingPrice() { // méthode triant les items dans l'array par prix décroissant
    this.items.sort(function(itemA: Item, itemB: Item): number {
      // tout d'abord on convertit les prix (qui sont des string) en number en enlevant les caractères qui ne sont ni des chiffres ni un point
      let costA: number = Number(itemA.unit_cost.replace(/[^0-9.-]+/g,""));
      let costB: number = Number(itemB.unit_cost.replace(/[^0-9.-]+/g,""));

      if (costA>costB) {
        return -1;
      } else if (costA<costB) {
        return 1;
      } else {
        // en cas d'égalité de prix, on trie par ordre alphabétique
        if (itemA.product_name<itemB.product_name) {
          return -1;
        } else {
          return 1;
        }
      }
    });
    this.emitItemsSubject();
  }

  getItemById(id: string) { // méthode pour récupérer un item grâce à son id
    // (note : l'id passé en paramètre correspond en fait à 'l'oid' qui est dans l'objet '_id' d'un item)
    const item = this.items.find(
      (el) => {
        return el._id.$oid === id;
      }
    );
    return item;
  }
}
