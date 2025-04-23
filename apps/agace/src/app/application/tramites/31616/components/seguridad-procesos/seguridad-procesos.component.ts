import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud31616PerfilesState,
  Tramite31616PerfilesStore,
} from '../../../../estados/tramites/tramite31616_perfiles.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';
import { Tramite31616PerfilesQuery } from '../../../../estados/queries/tramite31616_perfiles.query';

@Component({
  selector: 'app-seguridad-procesos',
  standalone: true,
  imports: [InputRadioComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './seguridad-procesos.component.html',
  styleUrl: './seguridad-procesos.component.css'
})
export class SeguridadProcesosComponent implements OnInit, OnDestroy{
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  seguridadProcesosForm!:FormGroup;
  private solicitudState!: Solicitud31616PerfilesState;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private tramite31616Store: Tramite31616PerfilesStore,
    private tramite31616Query: Tramite31616PerfilesQuery
  ) {
    //
  }
  ngOnInit(): void {
    this.tramite31616Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.crearFormularioSeguridadProcesos();
  }
  crearFormularioSeguridadProcesos(): void {
    this.seguridadProcesosForm = this.fb.group({
      indiqueAlmacenes: [
        this.solicitudState?.indiqueAlmacenes,
        Validators.required,
      ],
      expliqueBrevemente: [
        this.solicitudState?.expliqueBrevemente,
        Validators.required,
      ],
      indiqueCerciora: [
        this.solicitudState?.indiqueCerciora,
        Validators.required,
      ],
      indiqueEstos: [
        this.solicitudState?.indiqueEstos,
        Validators.required,
      ],
      indiquePertenecen: [
        this.solicitudState?.indiquePertenecen,
        Validators.required,
      ],
      indiqueResponsable: [
        this.solicitudState?.indiqueResponsable,
        Validators.required,
      ],
      indiqueTecnologia: [
        this.solicitudState?.indiqueTecnologia,
        Validators.required,
      ],
      describirProcesamiento: [
        this.solicitudState?.describirProcesamiento,
        Validators.required,
      ],
      detalleComo: [
        this.solicitudState?.detalleComo,
        Validators.required,
      ],
      indiqueUtiliza: [
        this.solicitudState?.indiqueUtiliza,
        Validators.required,
      ],
      detalleValida: [
        this.solicitudState?.detalleValida,
        Validators.required,
      ],
      comoNumero: [
        this.solicitudState?.comoNumero,
        Validators.required,
      ],
      senaleAsociados: [
        this.solicitudState?.senaleAsociados,
        Validators.required,
      ],
      estosEmpresa: [
        this.solicitudState?.estosEmpresa,
        Validators.required,
      ],
    });
  }
  public setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31616PerfilesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31616Store[metodoNombre] as (value: string) => void)(VALOR);
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
