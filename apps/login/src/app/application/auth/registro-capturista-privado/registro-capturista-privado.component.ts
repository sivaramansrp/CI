import { CapturistaStore, CapturistaStoreService } from '../../../estados/capturista.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { BusquedaRFCCURPQuery } from '../../../queries/capturista.query';
import { Capturista } from '../../core/models/capturista.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../core/service/usuarios.service';

@Component({
  selector: 'app-registro-capturista-privado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-capturista-privado.component.html',
  styleUrl: './registro-capturista-privado.component.scss',
})
export class RegistroCapturistaPrivadoComponent implements OnInit, OnDestroy {
  FormRegistroCapturistaPrivado!: FormGroup;
  private destroyNotifier$: Subject<void> = new Subject();
  capturistaConsultado?: Capturista;
  public capturistaState!: CapturistaStore;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private capturistaStore: CapturistaStoreService,
    private BusquedaQuery: BusquedaRFCCURPQuery
  ) {
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se crea el formulario reactivo para la consulta de capturista.
   */
  ngOnInit(): void {
    this.crearFormulario();
      this.BusquedaQuery.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.capturistaState = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  crearFormulario() {
    this.FormRegistroCapturistaPrivado = this.fb.group({
      rfc: [''],
      curp: ['']
    });
  }

  ngOnDestroy() {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  consultaCapturista() {
    const RFC = this.FormRegistroCapturistaPrivado.get('rfc')?.value;
    const CURP = this.FormRegistroCapturistaPrivado.get('curp')?.value;
    this.usuariosService.consultaCapturista(RFC, CURP)
      .pipe(
        map((data) => {
          if (data) {
            this.capturistaConsultado = data;
            this.capturistaStore.setConsultaCapturista(data);
            this.router.navigate(['login/consulta-capturista']);
          } else {
            this.capturistaConsultado = undefined;
          }
        }),
        catchError((error) => {
          console.error('Error al consultar capturista:', error);
          return of(undefined);
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }
}
