import { Catalogo, InputRadioComponent, TipoPersona } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TERCEROS_NACIONALIDAD_RADIO_OPCIONS, TERCEROS_PERSONA_RADIO_OPCIONS } from '../../constants/estupefacientes.enum';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { ImportacionMateriasPrimasService } from '../../service/importacion-materias-primas.service';
import { Location } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260301Store } from '../../estados/tramite260301Store.store';

/**
 * @class AgregarOtrosComponent
 * @description Componente Angular standalone para agregar información de terceros relacionados.
 * Permite capturar datos de personas físicas o morales con validaciones específicas
 * según la nacionalidad y tipo de persona.
 * 
 * @implements {OnInit} - Interfaz para inicialización del componente
 * @implements {OnDestroy} - Interfaz para limpieza de recursos del componente
 * 
 */
@Component({
  selector: 'app-agregar-otros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputRadioComponent],
  templateUrl: './agregar-otros.component.html',
  styleUrl: './agregar-otros.component.scss',
})
export class AgregarOtrosComponent implements OnInit, OnDestroy {
  /**
   * @property {TipoPersona} tipoPersona
   * @description Referencia al enum TipoPersona que define los tipos de persona disponibles
   * (Física, Moral, No Contribuyente). Se utiliza en el template para comparaciones
   * y validaciones condicionales.
   * @public
   * @readonly
   */
  public tipoPersona = TipoPersona;

  /**
   * @property {Subject<void>} unsubscribe$
   * @description Subject utilizado para el patrón de cancelación de suscripciones RxJS.
   * Permite cancelar todas las suscripciones activas cuando el componente se destruye,
   * evitando fugas de memoria y comportamientos no deseados.
   * @private
   * @readonly
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {Facturador[]} datos
   * @description Arreglo que almacena la información de los terceros relacionados
   * capturados a través del formulario. Cada elemento representa un facturador
   * con sus datos personales y de contacto completos.
   * @public
   */
  datos: Facturador[] = [];

  /**
   * @property {FormGroup} agregarDatosForm
   * @description Formulario reactivo Angular que maneja la captura y validación
   * de datos de terceros relacionados. Incluye campos para información personal,
   * de contacto y direcciones con validaciones específicas.
   * @public
   */
  agregarDatosForm!: FormGroup;

  /**
   * @property {Catalogo[]} paisesDatos
   * @description Lista de países obtenida del servicio de datos para poblar
   * el selector de países en el formulario. Cada elemento contiene la información
   * del catálogo de países disponibles en el sistema.
   * @public
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * @property {any[]} radioOpcions
   * @description Opciones de radio button para seleccionar la nacionalidad del tercero.
   * Contiene las opciones predefinidas para nacional/extranjero utilizadas
   * en el componente InputRadioComponent.
   * @public
   * @readonly
   */
  radioOpcions = TERCEROS_NACIONALIDAD_RADIO_OPCIONS;

  /**
   * @property {any[]} tipoPersonaRadioOpcions
   * @description Opciones de radio button para seleccionar el tipo de persona.
   * Define las opciones disponibles (Física, Moral, No Contribuyente) para
   * el campo de tipo de persona en el formulario.
   * @public
   * @readonly
   */
  tipoPersonaRadioOpcions = TERCEROS_PERSONA_RADIO_OPCIONS;

  /**
   * @constructor
   * @description Constructor del componente AgregarOtrosComponent.
   * Inicializa los servicios de dependencia inyectados y configura el estado inicial
   * del componente llamando a los métodos de inicialización del formulario y
   * configuración de validaciones condicionales.
   *
   * @param {FormBuilder} fb - Servicio Angular para construir formularios reactivos
   * con validaciones y controles de forma programática
   * @param {DatosSolicitudService} datosSolicitudService - Servicio personalizado para
   * obtener datos de catálogos y información relacionada con la solicitud desde el backend
   * @param {Location} ubicaccion - Servicio Angular para manejar la navegación del historial
   * del navegador, permitiendo retroceder a la página anterior
   * @param {Tramite260301Store} tramiteStore - Store de estado que administra la información
   * del trámite 260301 utilizando el patrón de gestión de estado
   * @param {ImportacionMateriasPrimasService} importacionMateriasPrimasService - Servicio
   * específico para obtener datos relacionados con importación de materias primas
   * 
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location,
    private tramiteStore: Tramite260301Store,
    private importacionMateriasPrimasService: ImportacionMateriasPrimasService
  ) {
    this.crearFormulario();
    this.changeNacionalidad();
  }

  /**
   * @method crearFormulario
   * @description Crea e inicializa el formulario reactivo con todos los campos necesarios
   * para capturar información de terceros relacionados. Establece validaciones específicas
   * para cada campo según los requerimientos del negocio.
   * 
   * Campos incluidos:
   * - Información de identificación: CURP, RFC, nombre/descripción
   * - Datos personales: nombres, apellidos, tipo de persona
   * - Información de contacto: teléfono, correo electrónico
   * - Datos de dirección: país, estado, código postal, colonia, calle, números
   * - Configuración de nacionalidad (nacional/extranjero)
   * 
   * @returns {void} No retorna ningún valor, modifica la propiedad agregarDatosForm
   * @memberof AgregarOtrosComponent
   */
  crearFormulario(): void {
    this.agregarDatosForm = this.fb.group({
      curp: [''],
      rfc: [''],
      nombreDescripcion: [''],
      nacionalidad: ['true'],
      tipoPersona: ['', Validators.required],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
      localidad: [''],
      municipio: [''],
      denominacionRazon: [''],
    });
  }

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida de Angular que se ejecuta después de la
   * inicialización del componente. Se encarga de cargar los datos iniciales
   * necesarios para el correcto funcionamiento del formulario.
   * 
   * @implements {OnInit.ngOnInit}
   * @returns {void} No retorna ningún valor
   * @memberof AgregarOtrosComponent
   */
  ngOnInit(): void {
    this.cargarDatos();
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países disponibles desde el servicio de datos
   * de solicitud y la almacena en la propiedad paisesDatos para ser utilizada
   * en el selector de países del formulario. Utiliza el patrón de cancelación
   * de suscripciones para evitar fugas de memoria.
   * 
   * @returns {void} No retorna ningún valor, actualiza la propiedad paisesDatos
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * @private
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });
  }

  /**
   * @method limpiarFormulario
   * @description Resetea completamente el formulario reactivo agregarDatosForm,
   * limpiando todos los valores de los campos y restaurando el estado inicial.
   * Útil para limpiar el formulario después de guardar datos o cuando el usuario
   * desea comenzar una nueva captura.
   *
   * @returns {void} No retorna ningún valor, modifica el estado del formulario
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * @public
   */
  limpiarFormulario(): void {
    this.agregarDatosForm.reset();
  }
  /**
   * @method cancelar
   * @description Cancela la operación actual de captura de datos y navega hacia
   * la vista anterior en el historial del navegador. Utiliza el servicio Location
   * de Angular para realizar la navegación de retroceso sin perder el contexto
   * de la aplicación.
   *
   * @returns {void} No retorna ningún valor, ejecuta navegación
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * @public
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * @method guardar
   * @description Guarda los datos capturados en el formulario y actualiza el estado
   * global del trámite. Toma los valores actuales del formulario, los envía al store
   * para persistir en el estado de la aplicación y posteriormente navega hacia atrás
   * para regresar a la vista anterior.
   * 
   * @returns {void} No retorna ningún valor, actualiza el store y navega
   * @memberof AgregarOtrosComponent
   * @since 1.0.0
   * @public
   */
  guardar(): void {
    this.tramiteStore.updateOtrosTablaDatos([this.agregarDatosForm.value]);
    this.ubicaccion.back();
  }

  /**
   * @method changeNacionalidad
   * @description Maneja los cambios en el campo de nacionalidad del formulario,
   * habilitando o deshabilitando campos específicos según si es nacional o extranjero.
   * Implementa lógica de validación condicional basada en el tipo de persona y
   * nacionalidad seleccionada.
   * 
   * Comportamiento:
   * - Si es extranjero (nacionalidad !== 'true'): Habilita todos los campos
   * - Si es nacional (nacionalidad === 'true'): 
   *   - Deshabilita el formulario completo inicialmente
   *   - Habilita campos básicos: nacionalidad, tipoPersona, nombreDescripcion, rfc, curp
   *   - Para No Contribuyente: Habilita CURP, deshabilita RFC
   *   - Para otros tipos: Deshabilita CURP, habilita RFC
   * 
   * @returns {void} No retorna ningún valor, modifica el estado del formulario
   * @memberof AgregarOtrosComponent
   * @public
   */
  changeNacionalidad(): void {
    if (this.agregarDatosForm?.value?.nacionalidad !== 'true') {
      this.agregarDatosForm.enable();
    } else {
      this.agregarDatosForm.disable();
      this.agregarDatosForm.get('nacionalidad')?.enable();
      this.agregarDatosForm.get('tipoPersona')?.enable();
      this.agregarDatosForm.get('nombreDescripcion')?.enable();
      this.agregarDatosForm.get('rfc')?.enable();
      this.agregarDatosForm.get('curp')?.enable();

      if (
        this.agregarDatosForm.value.tipoPersona !==
        this.tipoPersona.NO_CONTRIBUYENTE
      ) {
        this.agregarDatosForm.get('curp')?.disable();
      } else {
        this.agregarDatosForm.get('curp')?.enable();
        this.agregarDatosForm.get('rfc')?.disable();
      }
    }
  }

  /**
   * @method seBuscaRfc
   * @description Realiza una búsqueda automatizada de datos relacionados con importación
   * de materias primas utilizando el RFC proporcionado. Obtiene información adicional
   * del tercero desde el servicio y actualiza automáticamente los campos del formulario
   * con los datos encontrados.
   * 
   * Utiliza el método patchValue para actualizar solo los campos que coinciden
   * con la estructura de datos retornada, manteniendo los valores existentes
   * en campos no afectados.
   * 
   * @returns {void} No retorna ningún valor, actualiza el formulario con datos obtenidos
   * @memberof AgregarOtrosComponent
   * @public
   */
  seBuscaRfc(): void {
    this.importacionMateriasPrimasService
      .obtenerOstro()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.agregarDatosForm.patchValue(data);
      });
  }

  /**
   * @method ngOnDestroy
   * @description Hook del ciclo de vida de Angular que se ejecuta cuando el componente
   * está a punto de ser destruido. Se encarga de la limpieza de recursos, específicamente
   * cancela todas las suscripciones activas utilizando el Subject unsubscribe$ para
   * prevenir fugas de memoria y comportamientos no deseados.
   * 
   * @implements {OnDestroy.ngOnDestroy}
   * @returns {void} No retorna ningún valor
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
