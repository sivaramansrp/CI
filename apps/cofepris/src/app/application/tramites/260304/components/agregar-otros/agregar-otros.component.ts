import {
  Catalogo,
  InputRadioComponent,
  TipoPersona,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  TERCEROS_NACIONALIDAD_RADIO_OPCIONS,
  TERCEROS_PERSONA_RADIO_OPCIONS,
} from '../../constants/medicamentos-contengan.enum';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';

import { ExportacionMedicamentosContenganService } from '../../service/exportacion-medicamentos-contengan.service';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Location } from '@angular/common';
import { Otros } from '../../models/medicamentos-contengan.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';

@Component({
  selector: 'app-agregar-otros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './agregar-otros.component.html',
  styleUrl: './agregar-otros.component.scss',
})
export class AgregarOtrosComponent implements OnInit, OnDestroy {
  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {Proveedor[]} proveedores
   * Arreglo de proveedores capturados en el formulario.
   */
  datos: Facturador[] = [];

  /**
   * @property {FormGroup} agregarDatosForm
   * Formulario reactivo utilizado para capturar los datos del proveedor.
   */
  agregarDatosForm!: FormGroup;

  /**
   * @property {Catalogo[]} paisesDatos
   * Lista de países obtenida del servicio de datos.
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * Opciones de nacionalidad para terceros.
   * Este objeto contiene las opciones que se presentan en un grupo de botones de radio
   * para seleccionar la nacionalidad de un tercero.
   */
  radioOpcions = TERCEROS_NACIONALIDAD_RADIO_OPCIONS;

  /**
   * Opciones de tipo de persona para terceros.
   * Este objeto contiene las opciones que se presentan en un grupo de botones de radio
   * para seleccionar el tipo de persona (física o jurídica) de un tercero.
   */
  tipoPersonaRadioOpcions = TERCEROS_PERSONA_RADIO_OPCIONS;

  /**
   * @constructor
   * Inicializa el formulario y los servicios necesarios para el componente.
   *
   * @param fb - FormBuilder para construir el formulario reactivo.
   * @param datosSolicitudService - Servicio para obtener datos del backend.
   * @param tramiteStore - Store que administra el estado del trámite actual.
   * @param tramiteQuery - Servicio para consultar el estado del trámite.
   * @param ubicaccion - Servicio de Angular para navegación de retroceso.
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location,
    private tramiteStore: Tramite260304Store,
    private exportacionMedicamentosContenganService: ExportacionMedicamentosContenganService
  ) {
    this.crearFormulario();
    this.changeNacionalidad();
  }

  /**
   * Crea y inicializa el formulario con los campos y validaciones necesarios.
   * Este formulario incluye información personal y de contacto.
   *
   * @returns {void}
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
   * @description Hook de inicialización del componente. Llama a `cargarDatos()` para obtener catálogos.
   */
  ngOnInit(): void {
    this.cargarDatos();
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
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
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarDatosForm.reset();
  }

  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * Obtiene un nuevo valor para el formulario, procesando los datos según el tipo de persona.
   * @returns {Otros} Objeto con los valores del formulario, incluyendo el nombre o razón social procesado.
   */
  obtenerNuevoValorFormulario(): Otros {
    const VALOR_FORMULARIO = this.agregarDatosForm.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${
        VALOR_FORMULARIO.primerApellido
      } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = '';
    }

    const NUEVO_VALOR_FORMULARIO = {
      ...VALOR_FORMULARIO,
      nombreRazonSocial: nombreRazonSocial,
    };

    return NUEVO_VALOR_FORMULARIO;
  }

  /**
   * Guarda los datos del formulario y navega hacia atrás.
   * Actualiza el estado de los datos en el store y realiza una acción de retroceso en la ubicación.
   */
  guardar(): void {
    this.tramiteStore.updateOtrosTablaDatos([
      this.obtenerNuevoValorFormulario(),
    ]);
    this.ubicaccion.back();
  }

  /**
   * Cambia el estado de habilitación de los campos del formulario dependiendo de la nacionalidad.
   * Si la nacionalidad no es 'true', habilita todos los campos del formulario.
   * Si la nacionalidad es 'true', deshabilita algunos campos y habilita otros dependiendo de la tipoPersona.
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
   * Realiza una búsqueda para obtener datos de importación y los asigna al formulario.
   * Hace una petición al servicio 'exportacionMateriasPrimasService' y actualiza los valores del formulario con los datos obtenidos.
   */
  seBuscaRfc(): void {
    this.exportacionMedicamentosContenganService
      .obtenerOstro()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.agregarDatosForm.patchValue(data);
      });
  }

  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
