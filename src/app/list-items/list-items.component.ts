import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.model';
import { Subscription } from 'rxjs';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, OnDestroy {

  items: Item[]; // contient tous les items envoyés par le service
  itemsSubscription: Subscription; // subscription pour récupérer les items envoyés par le service
  nomRecherche: string = ""; // variable permettant d'effectuer la recherche par nom
  lastItemVisited: string;

  constructor(private itemsService: ItemsService, private router: Router) { }

  ngOnInit(): void {
    this.itemsSubscription = this.itemsService.itemsSubject.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
    this.itemsService.emitItemsSubject(); // on lance l'émission à l'initialisation pour bien récupérer les items

    let idStorage: string = window.localStorage.getItem("idLastItem");
    if(idStorage) {
      document.getElementById("last_item").hidden = false;
      this.lastItemVisited = idStorage;
    } else {
      document.getElementById("last_item").hidden = true;
    }
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe(); // à la destruction on unsubscribe pour éviter d'éventuels problèmes
  }

  onTriCroissant() {
    this.itemsService.orderItemsByAscendingPrice();
  }

  onTriDecroissant() {
    this.itemsService.orderItemsByDescendingPrice();
  }

  onInput(value: string) {
    this.nomRecherche = value;
  }

  onClickDetails(id: any) {
    window.localStorage.setItem("idLastItem",id.$oid); // on place l'id dans le localStorage pour retenir le dernier lien cliqué
    this.router.navigate(['/',id.$oid]); // utilisation du "oid" (à l'intérieur de l'id) pour la route
  }



}
