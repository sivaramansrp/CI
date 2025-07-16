import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { OPCION_DE_RADIO_EXPORTADOR } from '../../constants/permiso-importacion-modification.enum';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { RadioOpcion } from '@libs/shared/data-access-user/src/core/models/110203/datos-busqueda.model';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';

/**
 * @component
 * @name DatosExportadorComponent
 * @description
 * Componente encargado de gestionar el formulario de datos del exportador
 * para el trámite de permiso de importación 130120. Permite inicializar el formulario, manejar el tipo de persona,
 * aplicar validaciones dinámicas y actualizar el estado global mediante el store.
 *
 * @method ngOnInit
 * @description Inicializa el componente, suscribe al estado y configura los formularios y datos.
 *
 * @method initActionFormBuild
 * @description Inicializa el formulario reactivo con los valores actuales del estado.
 *
 * @method onTipoPersonaExportadorChange
 * @description Cambia el tipo de persona exportador y ajusta los validadores y valores del formulario según la selección.
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
  selector: 'app-datos-exportador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputRadioComponent],
  templateUrl: './datos-exportador.component.html',
  styleUrl: './datos-exportador.component.css',
})
export class DatosExportadorComponent implements OnInit, OnDestroy {

  /**
   * @property {FormGroup} datosExportador 
   * @description Formulario reactivo que captura los datos del exportador.
   */
  datosExportador!: FormGroup;

  /**
   * @property {boolean} esFormularioSoloLectura
   * @description Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @property {RadioOpcion[]} tipo_opcion
   * @description Opciones disponibles para el tipo de persona exportador.
   */
  tipo_opcion : RadioOpcion[] = OPCION_DE_RADIO_EXPORTADOR

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject para manejar la destrucción de suscripciones.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {string} tipoPersonaExportador
   * @description Tipo de persona seleccionada ('Física' o 'Moral').
   */
  tipoPersonaExportador: string = 'Física';

  /**
   * @property {DatosGrupos} datosState
   * @description Estado actual de los datos del trámite.
   */
  public datosState!: DatosGrupos

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {PermisoImportacionStore} store - Store para manejar el estado global del trámite.
   * @param {Tramite130120Query} query - Query para obtener el estado de los datos del trámite.
   * @param {ConsultaioQuery} consultaquery - Query para obtener el estado de consulta y solo lectura.
   */
  constructor(
    public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaquery: ConsultaioQuery,
  ){}

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

    this.consultaquery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.datosExportador = this.fb.group({
      persona_tipo: [this.datosState.datosExportador.persona_tipo],
      personales_nombre: [this.datosState.datosExportador.personales_nombre, Validators.required],
      primer_apellido: [this.datosState.datosExportador.primer_apellido, Validators.required],
      segundo_apellido: [this.datosState.datosExportador.segundo_apellido, Validators.required],
      denominación_razón_social: [this.datosState.datosExportador.denominación_razón_social_exportador, [Validators.required, Validators.maxLength(250)]],
      domicilio: [this.datosState.datosExportador.domicilio, [Validators.required, Validators.maxLength(200)]],
      observaciones: [this.datosState.datosExportador.observaciones, [Validators.required, Validators.maxLength(4000)]],
    })
  }

  /**
   * @method onTipoPersonaExportadorChange
   * @description Cambia el tipo de persona exportador y ajusta los validadores y valores del formulario según la selección.
   * @param {string | number} value - Valor seleccionado para el tipo de persona.
   */
  onTipoPersonaExportadorChange(value: string | number): void {
    this.tipoPersonaExportador = String(value);
    const GRUPO = this.datosExportador as FormGroup;

    this.store.setExportadorPersona_tipo(this.tipoPersonaExportador);

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
    GRUPO.get('observaciones')?.clearValidators();
    GRUPO.get('observaciones')?.setValue('');

    if (this.tipoPersonaExportador === 'Física') {
      GRUPO.get('personales_nombre')?.setValidators([Validators.required, Validators.maxLength(200)]);
      GRUPO.get('primer_apellido')?.setValidators([Validators.required, Validators.maxLength(200)]);
      GRUPO.get('segundo_apellido')?.setValidators([Validators.required, Validators.maxLength(200)]);
      GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
      GRUPO.get('observaciones')?.setValidators([Validators.maxLength(4000)]);
      // "denominación_razón_social" no visible, limpiar valor y validadores
      GRUPO.get('denominación_razón_social')?.setValue('');
      GRUPO.get('denominación_razón_social')?.clearValidators();
      this.store.setExportadorDenominación_razón_social('');
    } else if (this.tipoPersonaExportador === 'Moral') {
      GRUPO.get('denominación_razón_social')?.setValidators([Validators.required, Validators.maxLength(250)]);
      GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
      GRUPO.get('observaciones')?.setValidators([Validators.maxLength(4000)]);
      // Los personales y apellidos no visibles, limpiar valor y validadores
      GRUPO.get('personales_nombre')?.setValue('');
      GRUPO.get('personales_nombre')?.clearValidators();
      GRUPO.get('primer_apellido')?.setValue('');
      GRUPO.get('primer_apellido')?.clearValidators();
      GRUPO.get('segundo_apellido')?.setValue('');
      GRUPO.get('segundo_apellido')?.clearValidators();
      this.store.setExportadorPersonales_nombre('');
      this.store.setExportadorPrimer_apellido('');
      this.store.setExportadorSegundo_apellido('');
    }
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

  /**
   * @method ngOnDestroy
   * @description Limpia las suscripciones activas cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
