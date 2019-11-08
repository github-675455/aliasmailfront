import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailsComponent } from './emails/emails.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MaterialModule } from '../share/material.module';
import { ContaAddComponent } from './conta-add/conta-add.component';
import { ContaModalAddComponent } from './conta-modal-add/conta-modal-add.component';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusComponent } from './status/status.component';
import { AskUpdateComponent } from './ask-update/ask-update.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    EmailsComponent,
    UsuarioComponent,
    ContaAddComponent,
    ContaModalAddComponent,
    AutenticacaoComponent,
    StatusComponent,
    AskUpdateComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    MatDialogModule,
  ],
   exports: [
     EmailsComponent,
     ContaModalAddComponent,
     UsuarioComponent,
     ContaAddComponent,
     AutenticacaoComponent,
     AskUpdateComponent,
   ],
   entryComponents: [ContaModalAddComponent, AskUpdateComponent]
})
export class PagesModule { }
