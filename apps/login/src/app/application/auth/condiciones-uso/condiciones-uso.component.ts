import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Notificacion, NotificacionesComponent, SessionQuery } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioState } from '@libs/shared/data-access-user/src/core/estados/usuario.store';

@Component({
  selector: 'app-condiciones-uso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificacionesComponent],
  templateUrl: './condiciones-uso.component.html',
  styleUrl: './condiciones-uso.component.scss',
})
export class CondicionesUsoComponent implements OnInit {

  public datosUsuario!: UsuarioState;
  public nuevaNotificacion!: Notificacion;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(
    private UsuarioQuery: SessionQuery,
  ) { }

  ngOnInit(): void {
    this.UsuarioQuery.selectUsuarioState$
      .pipe(
        map((seccionState) => {
          this.datosUsuario = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  form: FormGroup = inject(FormBuilder).group({
    aceptado: [false]
  });

  private router = inject(Router);

  aceptar() {
    if (this.form.value.aceptado) {
      this.router.navigate(['login/firma-electronica']);
    } else {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Alerta',
        mensaje: 'Debe aceptar las condiciones para continuar.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    }
  }

  noAceptar() {
    this.router.navigateByUrl('/logout'); // o a login, o cerrar sesión
  }

}
