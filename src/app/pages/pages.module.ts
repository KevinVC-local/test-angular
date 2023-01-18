import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ListItemsComponent } from './list-items/list-items.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { LoaderComponent } from './loader/loader.component';
import { ImageErrorDirective } from './directive/image-error.directive';

@NgModule({
  declarations: [ListItemsComponent, LoaderComponent, ImageErrorDirective],
  imports: [CommonModule, NgbModule, PagesRoutingModule, AutocompleteLibModule],
})
export class PagesModule {}
