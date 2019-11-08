import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../share/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    MenuComponent, 
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    MenuComponent,
    ToolbarComponent
  ]
})
export class LayoutsModule { }
