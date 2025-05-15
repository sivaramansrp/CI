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
} from '../../constants/importacion-retorno-sanitario.enum';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { ImportacionRetornoSanitarioService } from '../../service/importacion-retorno-sanitario.service';
import { Location } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';

import { ActivatedRoute } from '@angular/router';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';

@Component({
  selector: 'app-agregar-otros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './fabricante-datos.component.html',
  styleUrl: './fabricante-datos.component.scss',
})
export class FabricanteDatosComponent implements OnInit, OnDestroy {
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
   * @property {string} tipoDatos
   * Tipo de datos que se está capturando en el formulario.
   */
  radioOpcions = TERCEROS_NACIONALIDAD_RADIO_OPCIONS;

  /**
   * @property {string} tipoDatos
   * Tipo de datos que se está capturando en el formulario.
   */
  tipoPersonaRadioOpcions = TERCEROS_PERSONA_RADIO_OPCIONS;


  id?:number

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
    private tramiteStore: Tramite260103Store,
    private tramiteQuery: Tramite260103Query,
    private importacionRetornoSanitarioService: ImportacionRetornoSanitarioService,
    private route: ActivatedRoute
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
      id:[Math.floor(100000 + Math.random() * 900000)],
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
      municipioAlcaldia: [''],
      denominacionRazon: [''],
    });
  }

  /**
   * @method ngOnInit
   * @description Hook de inicialización del componente. Llama a `cargarDatos()` para obtener catálogos.
   */
  ngOnInit(): void {
 this.route.paramMap.subscribe(params => {
    const ID_PARAM = params.get('id');

    if (ID_PARAM) {
      const ID = Number(ID_PARAM); // convert to number
this.id=ID;
      this.tramiteQuery.getFabricanteTablaDatos$
        .pipe(takeUntil(this.unsubscribe$)) // take the latest value only once
        .subscribe((dataArray) => {
          const MATCHING_ITEM: Fabricante | undefined = dataArray.find(item => item.id === ID);
          if (MATCHING_ITEM) {
            this.agregarDatosForm.patchValue({
              ...MATCHING_ITEM,
              id: ID,
            });
          }
        });
    }
  });
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

  obtenerNuevoValorFormulario(): Fabricante {
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
   if (this.id !== undefined) {
  this.tramiteStore.updateFabricanteTablaDatos(
    [this.obtenerNuevoValorFormulario()],
    Number(this.id)
  );
}
  else{
 this.tramiteStore.updateFabricanteTablaDatos([
      this.obtenerNuevoValorFormulario(),
    ]);
  }
    this.ubicaccion.back();
  }

  /**
   * Cambia el estado de habilitación de los campos del formulario dependiendo de la nacionalidad.
   * Si la nacionalidad no es 'true', habilita todos los campos del formulario.
   * Si la nacionalidad es 'true', deshabilita algunos campos y habilita otros dependiendo de la tipoPersona.
   */
  // changeNacionalidad(): void {
  //   if (this.agregarDatosForm?.value?.nacionalidad !== 'true') {
  //     this.agregarDatosForm.enable();
  //   } else {
  //     this.agregarDatosForm.disable();
  //     this.agregarDatosForm.get('nacionalidad')?.enable();
  //     this.agregarDatosForm.get('tipoPersona')?.enable();
  //     this.agregarDatosForm.get('nombreDescripcion')?.enable();
  //     this.agregarDatosForm.get('rfc')?.enable();
  //     this.agregarDatosForm.get('curp')?.enable();

  //     if (
  //       this.agregarDatosForm.value.tipoPersona !==
  //       this.tipoPersona.NO_CONTRIBUYENTE
  //     ) {
  //       this.agregarDatosForm.get('curp')?.disable();
  //     } else {
  //       this.agregarDatosForm.get('curp')?.enable();
  //       this.agregarDatosForm.get('rfc')?.disable();
  //     }
  //   }
  // }

  /**
   * Realiza una búsqueda para obtener datos de importación y los asigna al formulario.
   * Hace una petición al servicio 'ImportacionRetornoSanitarioService' y actualiza los valores del formulario con los datos obtenidos.
   */
  seBuscaRfc(): void {
    this.importacionRetornoSanitarioService
      .obtenerOstro()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        
        const DATOS_CON_ID = {
        ...data,
      };
      

        this.agregarDatosForm.patchValue({
  curp: DATOS_CON_ID.curp || '',
  nombreDescripcion: DATOS_CON_ID.nombreDescripcion || '',
  nacionalidad: 'true',
  nombres: DATOS_CON_ID.nombres || '',
  primerApellido: DATOS_CON_ID.primerApellido || '',
  segundoApellido: DATOS_CON_ID.segundoApellido || '',
  pais: DATOS_CON_ID.pais || '',
  estado: DATOS_CON_ID.estado || '',
  codigoPostal: DATOS_CON_ID.codigoPostal || '',
  colonia: DATOS_CON_ID.colonia || '',
  calle: DATOS_CON_ID.calle || '',
  numeroExterior: DATOS_CON_ID.numeroExterior || '',
  numeroInterior: DATOS_CON_ID.numeroInterior || '',
  lada: DATOS_CON_ID.lada || '',
  telefono: DATOS_CON_ID.telefono || '',
  correoElectronico: DATOS_CON_ID.correoElectronico || '',
  localidad: DATOS_CON_ID.localidad || '',
  municipioAlcaldia: DATOS_CON_ID.municipioAlcaldia || '',
  denominacionRazon: DATOS_CON_ID.denominacionRazon || '',         
      });
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
