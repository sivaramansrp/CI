import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user'
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { OPCION_DE_RADIO } from '../../constants/permiso-importacion-modification.enum';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { RadioOpcion } from '@libs/shared/data-access-user/src/core/models/110203/datos-busqueda.model';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';

import { FormValidationService } from '../../services/formValidation.service';


/**
 * @component
 * @name DatosProductorComponent
 * @description
 * Componente encargado de gestionar el formulario de datos del productor
 * para el trámite de permiso de importación 130120. Permite inicializar el formulario, manejar el tipo de persona,
 * aplicar validaciones dinámicas y actualizar el estado global mediante el store.
 *
 * @method ngOnInit
 * @description Inicializa el componente, suscribe al estado y configura los formularios y datos.
 *
 * @method initActionFormBuild
 * @description Inicializa el formulario reactivo con los valores actuales del estado.
 *
 * @method onTipoPersonaProductorChange
 * @description Cambia el tipo de persona productor y ajusta los validadores y valores del formulario según la selección.
 * @param {string | number} value - Valor seleccionado para el tipo de persona.
 *
 * @method setValoresStore
 * @description Actualiza el store con el valor de un campo del formulario usando el método correspondiente.
 * @param {FormGroup} form - Formulario reactivo.
 * @param {string} campo - Nombre del campo en el formulario.
 * @param {keyof PermisoImportacionStore} metodoNombre - Método del store a invocar.
 *
 * @method ngOnDestroy
 * @description Limpia las suscripciones activas cuando el componente es destruido.
 */
@Component({
  selector: 'app-datos-productor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputRadioComponent],
  templateUrl: './datos-productor.component.html',
  styleUrl: './datos-productor.component.css',
})
export class DatosProductorComponent implements OnInit, OnDestroy{

  /**
   * @property {FormGroup} datosProductor
   * @description Formulario reactivo que captura los datos del productor.
   */
  datosProductor!: FormGroup

  /**
   * @property {string} tipoPersonaProductor
   * @description Tipo de persona seleccionada ('Física', 'Moral' o 'Ninguno').
   */
  tipoPersonaProductor: string = 'Física';

  /**
   * @property {RadioOpcion[]} TipoOpcion
   * @description Opciones disponibles para el tipo de persona productor.
   */
  TipoOpcion: RadioOpcion[] = OPCION_DE_RADIO;

  /**
   * @property {boolean} esFormularioSoloLectura
   * @description Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject para manejar la destrucción de suscripciones.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {DatosGrupos} datosState
   * @description Estado actual de los datos del trámite.
   */
  private datosState!: DatosGrupos;

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {PermisoImportacionStore} store - Store para manejar el estado global del permiso de importación.
   * @param {Tramite130120Query} query - Query para obtener el estado de los datos del trámite.
   * @param {ConsultaioQuery} consultaQuery - Query para obtener el estado de consulta y solo lectura.
   */
  constructor(
    public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaQuery: ConsultaioQuery,
    private cdr: ChangeDetectorRef,
    private formValidation: FormValidationService
  ){
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente, suscribe al estado y configura los formularios y datos.
   */
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

    if(this.esFormularioSoloLectura){
      this.datosProductor.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.datosProductor = this.fb.group({
      persona_tipo: [this.datosState.datosProductor.persona_tipo],
      personales_nombre: [this.datosState.datosProductor.personales_nombre,Validators.required],
      primer_apellido: [this.datosState.datosProductor.primer_apellido,Validators.required],
      segundo_apellido: [this.datosState.datosProductor.segundo_apellido,Validators.required],
      denominación_razón_social: [this.datosState.datosProductor.denominación_razón_social,Validators.required],
      domicilio: [this.datosState.datosProductor.domicilio, [Validators.required, Validators.maxLength(200)]],
    });
  }

  /**
   * @method onTipoPersonaProductorChange
   * @description Cambia el tipo de persona productor y ajusta los validadores y valores del formulario según la selección.
   * @param {string | number} value - Valor seleccionado para el tipo de persona.
   */
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

  /**
   * @method setValoresStore
   * @description Actualiza el store con el valor de un campo del formulario usando el método correspondiente.
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Nombre del campo en el formulario.
   * @param {keyof PermisoImportacionStore} metodoNombre - Método del store a invocar.
   */
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

  
validarFormulario(): boolean {
    this.formValidation.marcarFormularioComoTocado(this.datosProductor);
    this.cdr.detectChanges();
    return this.datosProductor.valid;
  }

  /**
   * @method ngOnDestroy
   * @description Limpia las suscripciones activas cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
