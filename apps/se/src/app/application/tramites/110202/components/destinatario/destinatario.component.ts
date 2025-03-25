import { Catalogo, CatalogoSelectComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, delay, map, takeUntil, tap } from 'rxjs';
import { CertificadoValidacionService } from '../../../110202/services/certificado-validacion.service';
import { CommonModule } from '@angular/common';

import { Tramite110202Query } from '../../../110202/estados/tramite110202.query';
import { Tramite110202Store } from '../../../110202/estados/tramite110202.store';

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.scss'
})
export class DestinatarioComponent implements OnDestroy, OnInit {

  destinatarioForm!: FormGroup;
  destroyNotifier$: Subject<void> = new Subject();
  paisDestin$!: Observable<Catalogo[]>;
  medioDeTransporte$!: Observable<Catalogo[]>;
  private seccion!: SeccionLibState;
  private actualizandoFormulario = false;

  constructor(
    private fb: FormBuilder,
    public store: Tramite110202Store,
    public tramiteQuery: Tramite110202Query,
    public certificadoService: CertificadoValidacionService,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {
    this.destinatarioForm = this.fb.group({
      paisDestin: ['', [Validators.required, Validators.min(0)]],
      medioDeTransporte: ['', [Validators.required, Validators.min(0)]],
    });

    this.tramiteQuery.destinatarioForm$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
      if (!this.actualizandoFormulario && estado) {
        this.actualizandoFormulario = true;
        this.destinatarioForm.patchValue(estado);
        this.actualizandoFormulario = false;
      }
    });

    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.paisDestin$ = this.tramiteQuery.selectPaisDestino$;
    this.medioDeTransporte$ = this.tramiteQuery.selectEntidadFederativa$;
  }

  get formularioControl(): FormControl {
    return this.destinatarioForm.get('') as FormControl;
  }

  esFormValido(): boolean {
    for (const NOMBRE_DEL_CONTROL in this.destinatarioForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.destinatarioForm.controls, NOMBRE_DEL_CONTROL)) {
        const CONTROL = this.destinatarioForm.get(NOMBRE_DEL_CONTROL);
        if (CONTROL && CONTROL.enabled && CONTROL.invalid) {
          return false;
        }
      }
    }
    return true;
  }

  validarFormulario(): void {
    this.destinatarioForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          const SECCION: number = 2;
          const FORMAS_VALIDADAS = this.seccion.formaValida;
          const ES_VALIDO_EL_FORM = this.esFormValido();

          if (this.destinatarioForm.valid || (ES_VALIDO_EL_FORM)) {
            FORMAS_VALIDADAS[SECCION] = true;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          } else {
            FORMAS_VALIDADAS[SECCION] = false;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.cargarIdioma();
    this.destinatarioForm.valueChanges.subscribe(value => {
      if (!this.actualizandoFormulario) {
        this.store.setDestinatarioForm(value);
        this.validarFormulario();
      }
    });
  }

  paisDestinSeleccion(estado: Catalogo): void {
    this.store.setpaisDestino([estado]);
  }

  cargarIdioma(): void {
    this.certificadoService
      .obtenerPaisDestino()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setpaisDestino(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
