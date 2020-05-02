import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemsService } from './services/items.service';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

// array des 'routes' de l'application
const appRoutes: Routes = [
  { path: '', component: ListItemsComponent },
  { path: ':id', component: ItemViewComponent },
  { path: '**', redirectTo: '' }
];

export function initData(itemsService: ItemsService) {
  // méthode exécutée avant l'initialisation de tous les composants afin que les données soient disponibles
  return () => itemsService.getItems();
}

@NgModule({
  declarations: [
    AppComponent,
    ListItemsComponent,
    ItemViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ItemsService,
    { provide: APP_INITIALIZER, useFactory: initData, deps: [ItemsService], multi:true } // APP_INITIALIZER pour charger les données avant le chargement des composants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
