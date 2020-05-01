import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  item: Item;

  constructor(private itemsService: ItemsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.item = this.itemsService.getItemById(this.route.snapshot.params['id']);
  }

}
