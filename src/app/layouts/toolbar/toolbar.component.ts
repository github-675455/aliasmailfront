import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { AppComponent } from 'src/app/app.component';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {

  @Input() sidenav: MatSidenav;
  @Input() app: AppComponent;

  public isAutenticado = false;

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {
    this.isAutenticado = this.autenticacaoService.isAutenticado();

    this.autenticacaoService.assinaturaIsAutenticado.subscribe(e => {
      this.isAutenticado = e;
    });
  }

  ngOnDestroy() {
    this.autenticacaoService.assinaturaIsAutenticado.unsubscribe();
  }

  toggleSideMenu() {
    this.sidenav.toggle();
  }

  hideMenu() {
    return this.app.screenWidth > 840;
  }

  autenticar() {
    this.router.navigateByUrl('/autenticacao');
  }

  desconectar() {
    this.autenticacaoService.logout();
  }
}
