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
  selector: 'app-socios-comerciales',
  standalone: true,
  imports: [InputRadioComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './socios-comerciales.component.html',
  styleUrl: './socios-comerciales.component.css',
})
export class SociosComercialesComponent implements OnInit, OnDestroy {
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  sociosComercialesForm!: FormGroup;
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

    this.crearFormularioSociosComerciales();
  }
  crearFormularioSociosComerciales(): void {
    this.sociosComercialesForm = this.fb.group({
      indiqueLleva: [
        this.solicitudState?.indiqueLleva,
        Validators.required,
      ],
      describaProcedimiento: [
        this.solicitudState?.describaProcedimiento,
        Validators.required,
      ],
      indiqueSocios: [
        this.solicitudState?.indiqueSocios,
        Validators.required,
      ],
      indiqueForma: [
        this.solicitudState?.indiqueForma,
        Validators.required,
      ],
      indiqueExisten: [
        this.solicitudState?.indiqueExisten,
        Validators.required,
      ],
      indiqueCuenta: [
        this.solicitudState?.indiqueCuenta,
        Validators.required,
      ],
      procedimientoRealizar: [
        this.solicitudState?.procedimientoRealizar,
        Validators.required,
      ],
      indiquePeriodicidad: [
        this.solicitudState?.indiquePeriodicidad,
        Validators.required,
      ],
      describaComo: [
        this.solicitudState?.describaComo,
        Validators.required,
      ],
      comoAseguran: [
        this.solicitudState?.comoAseguran,
        Validators.required,
      ],
      indiqueFormatos: [
        this.solicitudState?.indiqueFormatos,
        Validators.required,
      ],
      senalarMedidas: [
        this.solicitudState?.senalarMedidas,
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
