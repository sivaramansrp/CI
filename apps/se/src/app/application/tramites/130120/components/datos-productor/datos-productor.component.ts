import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { OPCION_DE_RADIO } from '../../constants/permiso-importacion-modification.enum';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { RadioOpcion } from '@libs/shared/data-access-user/src/core/models/110203/datos-busqueda.model';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';


@Component({
  selector: 'app-datos-productor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputRadioComponent],
  templateUrl: './datos-productor.component.html',
  styleUrl: './datos-productor.component.css',
})
export class DatosProductorComponent implements OnInit, OnDestroy{

  datosProductor!: FormGroup

  tipoPersonaProductor: string = 'Física';

  TipoOpcion: RadioOpcion[] = OPCION_DE_RADIO;

  esFormularioSoloLectura: boolean = false;

  public destroyNotifier$: Subject<void> = new Subject();

  private datosState!: DatosGrupos;

  constructor(
    public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaQuery: ConsultaioQuery
  ){
  }

  async ngOnInit(): Promise<void> {
    this.query.selectDatos$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((state) => {
            this.datosState = state as DatosGrupos;
          })
        )
        .subscribe();
    await this.initActionFormBuild();

    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
  }

  initActionFormBuild(): void {
    this.datosProductor = this.fb.group({
      persona_tipo: [this.datosState.datosProductor.persona_tipo],
      personales_nombre: [this.datosState.datosProductor.personales_nombre,Validators.required],
      primer_apellido: [this.datosState.datosProductor.primer_apellido,Validators.required],
      segundo_apellido: [this.datosState.datosProductor.seguna_apellido,Validators.required],
      denominación_razón_social: [this.datosState.datosProductor.denominación_razón_social,Validators.required],
      domicilio: [this.datosState.datosProductor.domicilio, [Validators.required, Validators.maxLength(200)]],
    });
  }

  onTipoPersonaProductorChange(value: string | number): void {
  this.tipoPersonaProductor = String(value);
  const GRUPO = this.datosProductor as FormGroup;

  this.store.setPersona_tipo(this.tipoPersonaProductor);

  // Siempre requerido
  GRUPO.get('persona_tipo')?.setValidators([Validators.required]);
  GRUPO.get('persona_tipo')?.updateValueAndValidity();

  // Limpiar todos los validadores y valores primero
  GRUPO.get('personales_nombre')?.clearValidators();
  GRUPO.get('personales_nombre')?.setValue('');
  GRUPO.get('primer_apellido')?.clearValidators();
  GRUPO.get('primer_apellido')?.setValue('');
  GRUPO.get('segundo_apellido')?.clearValidators();
  GRUPO.get('segundo_apellido')?.setValue('');
  GRUPO.get('denominación_razón_social')?.clearValidators();
  GRUPO.get('denominación_razón_social')?.setValue('');
  GRUPO.get('domicilio')?.clearValidators();
  GRUPO.get('domicilio')?.setValue('');

  // Asignar validadores y limpiar solo los campos no visibles
  if (this.tipoPersonaProductor === 'Física') {
    GRUPO.get('personales_nombre')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('primer_apellido')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('segundo_apellido')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
    // "denominación_razón_social" no visible, limpiar valor y validadores
    GRUPO.get('denominación_razón_social')?.setValue('');
    GRUPO.get('denominación_razón_social')?.clearValidators();
    this.store.setDenominación_razón_social('');
  } else if (this.tipoPersonaProductor === 'Moral') {
    GRUPO.get('denominación_razón_social')?.setValidators([Validators.required, Validators.maxLength(250)]);
    GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
    // Los personales y apellidos no visibles, limpiar valor y validadores
    GRUPO.get('personales_nombre')?.setValue('');
    GRUPO.get('personales_nombre')?.clearValidators();
    GRUPO.get('primer_apellido')?.setValue('');
    GRUPO.get('primer_apellido')?.clearValidators();
    GRUPO.get('segundo_apellido')?.setValue('');
    GRUPO.get('segundo_apellido')?.clearValidators();
    this.store.setPersonales_nombre('');
    this.store.setPrimer_apellido('');
    this.store.setSegundo_apellido('');
  } else if (this.tipoPersonaProductor === 'Ninguno') {
    GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
    // Todos los demás no visibles, limpiar valor y validadores
    GRUPO.get('personales_nombre')?.setValue('');
    GRUPO.get('personales_nombre')?.clearValidators();
    GRUPO.get('primer_apellido')?.setValue('');
    GRUPO.get('primer_apellido')?.clearValidators();
    GRUPO.get('segundo_apellido')?.setValue('');
    GRUPO.get('segundo_apellido')?.clearValidators();
    GRUPO.get('denominación_razón_social')?.setValue('');
    GRUPO.get('denominación_razón_social')?.clearValidators();
    this.store.setPersonales_nombre('');
    this.store.setPrimer_apellido('');
    this.store.setSegundo_apellido('');
    this.store.setDenominación_razón_social('');
  }

  // Actualizar validez de todos los controles
  Object.keys(GRUPO.controls).forEach(key => GRUPO.get(key)?.updateValueAndValidity());
}

setValoresStore(
  form: FormGroup,
  campo: string,
  metodoNombre: keyof PermisoImportacionStore,
): void {
  const VALOR = form.get(campo)?.value;
  (this.store[metodoNombre] as (value: string) => void)(
    VALOR
  );
}

ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}

}
