import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.sass'],
  animations: [
    trigger('changeColor', [
      state('off', style({
          color: '#ddd'
      })),
      state('on', style({
        color: 'red'
      })),
      transition('off => on', animate('2s')),
      transition('on => off', animate('2s'))
    ])
  ]
})
export class StatusComponent implements OnInit, OnDestroy {
  status = '';
  isActive = 'off';
  public carregando = true;
  private subscribe: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.atualizarStatus();

    this.subscribe = interval(10000).subscribe(val => {
      this.atualizarStatus();
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  atualizarStatus() {
    this.carregando = true;
    this.http.get(`${environment.API_URL}health`).subscribe(
      (data: any) => {
        if (data.status === 'Healthy') {
          this.status = 'Funcionando normalmente';
          this.isActive = 'on';
        } else {
          this.status = 'Indisponível';
          this.isActive = 'off';
        }
      },
      (error: any) => {
        this.status = 'Indisponível';
        this.isActive = 'off';
        this.carregando = false;
      },
      () => {
        this.carregando = false;
      }
    );
  }
}
