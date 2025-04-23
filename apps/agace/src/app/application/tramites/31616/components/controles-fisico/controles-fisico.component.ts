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
  selector: 'app-controles-fisico',
  standalone: true,
  imports: [InputRadioComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './controles-fisico.component.html',
  styleUrl: './controles-fisico.component.css',
})
export class ControlesFisicoComponent implements OnInit, OnDestroy {
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  controlesFisico!: FormGroup;
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

    this.crearFormularioControlesFisico();
  }

  crearFormularioControlesFisico(): void {
    this.controlesFisico = this.fb.group({
      procedimientoDocumentado: [
        this.solicitudState?.procedimientoDocumentado,
        Validators.required,
      ],
      indiqueNumero: [this.solicitudState?.indiqueNumero, Validators.required],
      cargosFunciones: [
        this.solicitudState?.cargosFunciones,
        Validators.required,
      ],
      casoContratarse: [
        this.solicitudState?.casoContratarse,
        Validators.required,
      ],
      casoContar: [this.solicitudState?.casoContar, Validators.required],
      describirProcedimiento: [
        this.solicitudState?.describirProcedimiento,
        Validators.required,
      ],
      indiqueMecanismos: [
        this.solicitudState?.indiqueMecanismos,
        Validators.required,
      ],
      indicarEmpleados: [
        this.solicitudState?.indicarEmpleados,
        Validators.required,
      ],
      indiqueIdentifica: [
        this.solicitudState?.indiqueIdentifica,
        Validators.required,
      ],
      describaEmpresa: [
        this.solicitudState?.describaEmpresa,
        Validators.required,
      ],
      indiqueAsegura: [
        this.solicitudState?.indiqueAsegura,
        Validators.required,
      ],
      procedimientoParaControl: [
        this.solicitudState?.procedimientoParaControl,
        Validators.required,
      ],
      senaleRegistros: [
        this.solicitudState?.senaleRegistros,
        Validators.required,
      ],
      senaleQuien: [this.solicitudState?.senaleQuien, Validators.required],
      describaRecepion: [
        this.solicitudState?.describaRecepion,
        Validators.required,
      ],
      indiqueEncargado: [
        this.solicitudState?.indiqueEncargado,
        Validators.required,
      ],
      indiqueIdentfica: [
        this.solicitudState?.indiqueIdentfica,
        Validators.required,
      ],
      senaleComo: [this.solicitudState?.senaleComo, Validators.required],
      describaCaracteristicas: [
        this.solicitudState?.describaCaracteristicas,
        Validators.required,
      ],
      senaleAccion: [this.solicitudState?.senaleAccion, Validators.required],
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
