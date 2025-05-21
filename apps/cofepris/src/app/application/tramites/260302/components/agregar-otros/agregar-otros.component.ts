import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  REGEX_NOMBRE,
  TipoPersona,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {
  TERCEROS_NACIONALIDAD_RADIO_OPCIONS,
  TERCEROS_PERSONA_RADIO_OPCIONS,
} from '../../constants/exporticon-estupefacientes.enum';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { ExportacionMateriasPrimasService } from '../../service/exportacion-materias-primas.service';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Location } from '@angular/common';
import { Otros } from '../../models/exporticon-estupefacientes.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';

@Component({
  selector: 'app-agregar-otros',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent
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
   * @property {string} tipoDatos
   * Tipo de datos que se está capturando en el formulario.
   */
  radioOpcions = TERCEROS_NACIONALIDAD_RADIO_OPCIONS;

  /**
   * @property {string} tipoDatos
   * Tipo de datos que se está capturando en el formulario.
   */
  tipoPersonaRadioOpcions = TERCEROS_PERSONA_RADIO_OPCIONS;

  /**
   * @property {Otros} datoSeleccionado
   * Almacena el destinatario seleccionado.
   * Se inicializa como un objeto vacío de tipo `Otros`.
   */
  public datoSeleccionado!: Otros;



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
    private tramiteStore: Tramite260302Store,
    private exportacionMateriasPrimasService: ExportacionMateriasPrimasService,
    private tramiteQuery: Tramite260302Query
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
      curp: [this.obtenerValor('curp'),[Validators.required]],
      rfc: [this.obtenerValor('rfc'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      nombreDescripcion: [this.obtenerValor('nombreDescripcion'),[Validators.required]],
      nacionalidad: ['true'],
      tipoPersona: ['', Validators.required],
      nombres: [this.obtenerValor('nombres'), [Validators.required,Validators.pattern(REGEX_NOMBRE)]],
      primerApellido: [
        this.obtenerValor('primerApellido'),
        [Validators.required,Validators.pattern(REGEX_NOMBRE)]
      ],
      segundoApellido: [this.obtenerValor('segundoApellido'),[Validators.required,Validators.pattern(REGEX_NOMBRE)]],
      pais: [this.obtenerValor('pais'), Validators.required],
      estado: [this.obtenerValor('estadoLocalidad'), Validators.required],
      codigoPostal: [this.obtenerValor('codigoPostal'), Validators.required],
      colonia: [this.obtenerValor('colonia')],
      calle: [this.obtenerValor('calle'), Validators.required],
      numeroExterior: [
        this.obtenerValor('numeroExterior'),
        Validators.required,
      ],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [this.obtenerValor('lada')],
      telefono: [this.obtenerValor('telefono')],
      correoElectronico: [
        this.obtenerValor('correoElectronico'),
        [Validators.required, Validators.email],
      ],
      localidad: [this.obtenerValor('localidad')],
      municipioAlcaldia: [this.obtenerValor('municipioAlcaldia')],
      razonSocial: [this.obtenerValor('razonSocial'),[Validators.required, Validators.pattern(REGEX_NOMBRE)],],
    });
  }

  /**
   * @method ngOnInit
   * @description Hook de inicialización del componente. Llama a `cargarDatos()` para obtener catálogos.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.tramiteQuery.getOtrosSeleccionado$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState) => {
          this.datoSeleccionado = seccionState?.[0] ?? ({} as Otros);
          this.crearFormulario();
          this.changeNacionalidad();
        })
      )
      .subscribe();
  }

  /**
   * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
   * @param {keyof TablaMercanciasDatos | keyof MercanciaForm} field - Nombre del campo a obtener.
   * @returns {string | number | undefined | string[]} - Valor del campo especificado.
   */
  public obtenerValor(
    field: keyof Otros
  ): string | number | undefined | string[] {
    return this.datoSeleccionado?.[field as keyof Otros] ?? '';
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
    this.tipoPersonaRadioOpcions=this.tipoPersonaRadioOpcions.filter((item)=>item.value !== TipoPersona.NO_CONTRIBUYENTE);
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

    // 👇 Replace only nombreRazonSocial, keeping rest of the object the same
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
      this.alternarOpcionNoContribuyente(false)
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
    this.alternarOpcionNoContribuyente(true);
    }
  }


  /**
   * @method alternarOpcionNoContribuyente
   * @description
   * Agrega o elimina la opción "No Contribuyente" en el arreglo de opciones de tipo de persona
   * según el valor del parámetro `debeAgregar`.
   *
   * @param {boolean} debeAgregar - Indica si se debe agregar (`true`) o eliminar (`false`)
   * la opción "No Contribuyente" en el grupo de opciones de tipo de persona.
   *
   * @returns {void}
   */
  alternarOpcionNoContribuyente(debeAgregar: boolean): void {
  const NO_CONTRIBUYENTE = {
    label: TipoPersona.NO_CONTRIBUYENTE,
    value: TipoPersona.NO_CONTRIBUYENTE
  };

  const INDICE = this.tipoPersonaRadioOpcions.findIndex(
    opcion => opcion.value === TipoPersona.NO_CONTRIBUYENTE
  );

  if (debeAgregar && INDICE === -1) {
    this.tipoPersonaRadioOpcions.push(NO_CONTRIBUYENTE);
  } else if (!debeAgregar && INDICE !== -1) {
    this.tipoPersonaRadioOpcions.splice(INDICE, 1);
  }
}

  /**
   * Realiza una búsqueda para obtener datos de importación y los asigna al formulario.
   * Hace una petición al servicio 'exportacionMateriasPrimasService' y actualiza los valores del formulario con los datos obtenidos.
   */
  seBuscaRfc(): void {
    this.exportacionMateriasPrimasService
      .obtenerOstro()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.agregarDatosForm.patchValue(data);
        if(this.agregarDatosForm.get('curp')?.value !== null && this.agregarDatosForm.get('rfc')?.disabled){
          this.agregarDatosForm.get('rfc')?.setValue('RFC78900')
        }
         if(this.agregarDatosForm.get('rfc')?.value !== null && this.agregarDatosForm.get('curp')?.disabled){
          this.agregarDatosForm.get('curp')?.setValue('CURP8888')
        }
      });
  }

   /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.agregarDatosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
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
