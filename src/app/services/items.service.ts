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
  private itemsJsonURL = 'assets/items.json';

  constructor(private httpClient: HttpClient) {
  }

  emitItemsSubject() {
    this.itemsSubject.next(this.items.slice()); // on envoie une copie de l'array items
  }

  getItems() { // méthode qui va charger les items depuis le JSON (socké dans assets)

    // on retourne une Promise afin qu'on puisse ensuite attendre que les données soient bien arrivées
    // (cela est utile si par exemple on rafraîchit la page d'un Item, ou que l'on accède directement à une page d'un Item en tapant l'URL)
    return new Promise((resolve, reject) => {
      this.httpClient.get<Item[]>(this.itemsJsonURL).subscribe(
        (response) => {
          this.items = response;
          this.emitItemsSubject(); // quand on charge les données, on les émet également pour les autres composants
          resolve();
        },
        (error) => {
          console.log('Erreur lors du chargement du fichier JSON : '+error);
          reject();
        }
      );
    });
  }

  orderItemsByAscendingPrice() {
    this.items.sort(function(itemA: Item, itemB: Item): number {
      // tout d'abord on convertit les prix (qui sont des string) en number en enlevant les caractères qui ne sont ni des chiffres ni un point
      let numberA: number = Number(itemA.unit_cost.replace(/[^0-9.-]+/g,""));
      let numberB: number = Number(itemB.unit_cost.replace(/[^0-9.-]+/g,""));

      if (numberA<numberB) {
        return -1;
      } else if (numberA>numberB) {
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

  orderItemsByDescendingPrice() {
    this.items.sort(function(itemA: Item, itemB: Item): number {
      // tout d'abord on convertit les prix (qui sont des string) en number en enlevant les caractères qui ne sont ni des chiffres ni un point
      let numberA: number = Number(itemA.unit_cost.replace(/[^0-9.-]+/g,""));
      let numberB: number = Number(itemB.unit_cost.replace(/[^0-9.-]+/g,""));

      if (numberA>numberB) {
        return -1;
      } else if (numberA<numberB) {
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

  getItemById(id: string) { // l'id passé en paramètre correspond en fait à "l'oid" qui est dans l'objet id d'un item
    const item = this.items.find(
      (el) => {
        return el._id.$oid === id;
      }
    );
    return item;
  }
}
