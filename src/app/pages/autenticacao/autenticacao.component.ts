import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { LoginResponse } from 'src/app/model/login-response';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Utils from 'src/app/share/utils';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.sass']
})
export class AutenticacaoComponent implements OnInit {
  login: string;
  senha: string;
  loading: boolean;
  isAutenticado: boolean;
  returnUrl: string;
  autenticarForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private autenticacaoService: AutenticacaoService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.autenticarForm = this.formBuilder.group({
      login: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z0-9_-]{3,256}')]
      ],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {

    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.returnUrl = queryParams.get('returnUrl');
    });
  }

  getServerErrors(field: string) {
    return this.autenticarForm.get(field).errors.serverError;
  }

  autenticar() {
    if (this.autenticarForm.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.autenticacaoService
      .login(
        this.autenticarForm.controls.login.value,
        this.autenticarForm.controls.senha.value
      )
      .subscribe(
        (data: LoginResponse) => {

            if (this.returnUrl !== null) {
              this.router.navigateByUrl(`/${this.returnUrl}`);
            } else {
              this.router.navigateByUrl('/');
            }

            this.snackBarService.show('Autenticado com sucesso!', 'Ignorar');
        },
        (errors: any) => {
          Utils.setErrorsInFormGroup(this.autenticarForm, errors);
        }
      ).add(() => {
        this.loading = false;
      });
  }
}
