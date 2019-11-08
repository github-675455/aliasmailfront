import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './share/material.module';
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import { AutenticacaoService } from './services/autenticacao.service';
import { SnackBarService } from './services/snack-bar.service';
import { AuthGuard } from './guards/auth-guard.service';
import { UpdateServiceWorkerService } from './services/update-service-worker.service';
import { AutenticacaoInterceptor } from './interceptors/autenticacao-interceptor';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { EmailService } from './services/email.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutsModule,
    PagesModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    AutenticacaoService,
    EmailService,
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true
    },
    AuthGuard,
    UpdateServiceWorkerService,

    HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
