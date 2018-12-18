import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list/items-list.component';
import {
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatProgressBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ItemsListComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatSortModule,
    HttpClientModule
  ]
})
export class ItemsModule {}
