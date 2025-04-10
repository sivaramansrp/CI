import { AlertComponent, CatalogoSelectComponent, CatalogosSelect, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud105State, Tramite105Store, } from '../../estados/tramite105.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InvoCarService } from '../../services/invocar.service';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/datos-del-tramite.enum';
import { Tramite105Query } from '../../estados/tramite105.query';
import mercanciaTable from 'libs/shared/theme/assets/json/105/mercancia-table.json';
interface TableBodyData {
  tbodyData: string[];
}
@Component({
  selector: 'app-datos-del-tramite-uno',
  standalone: true,
  imports: [CommonModule, AlertComponent,
    InputRadioComponent,
    TableComponent,
    TituloComponent, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './datos-del-tramite-uno.component.html',
  styleUrl: './datos-del-tramite-uno.component.scss',
})


export class DatosDelTramiteUnoComponent implements OnInit, OnDestroy {

  /**
   * Constructor de la clase DatosDelTramiteUnoComponent.
   * 
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param invoCarService - Servicio para gestionar datos relacionados con el trámite.
   * @param store - Almacén para gestionar el estado de la solicitud.
   * @param query - Consulta para obtener datos del estado de la solicitud.
   */
  constructor(private fb: FormBuilder, private invoCarService: InvoCarService, private store: Tramite105Store,
    private query: Tramite105Query,) {
    // Se puede agregar lógica de inicialización aquí si es necesario
  }

  /**
   * Formulario reactivo para agregar mercancías.
   */
  public agregarForm!: FormGroup;

  /**
   * Estado del modal (abierto o cerrado).
   */
  public modal: string = 'modal';

  /**
   * Formulario reactivo para los datos del trámite.
   */
  public datosDelTramite!: FormGroup;

  /**
   * Formulario reactivo para la fracción arancelaria.
   */
  fraccionForm!: FormGroup;

  /**
   * Lista de suscripciones activas para evitar fugas de memoria.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud105State;

  /**
   * Catálogo de países.
   */
  pais!: CatalogosSelect;

  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativa!: CatalogosSelect;

  /**
   * Catálogo de municipios o delegaciones.
   */
  municipioDelegacion!: CatalogosSelect;

  /**
   * Catálogo de colonias.
   */
  colonia!: CatalogosSelect;

  /**
   * Valor seleccionado del radio.
   */
  valorSeleccionado!: string;
  valorSeleccionado1!: string;
  valorSeleccionado2!: string;

  /**
   * Catálogo de aduanas.
   */
  aduana!: CatalogosSelect;

  /**
   * Catálogo de fracciones arancelarias.
   */
  fraccionArancelaria!: CatalogosSelect;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos de la tabla de mercancías.
   */
  public getMercanciaTableData = mercanciaTable;

  /**
   * Encabezado de la tabla de mercancías.
   */
  public mercanciaHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de mercancías.
   */
  public mercanciaBodyData: TableBodyData[] = [];

  /**
   * Indica si la selección está deshabilitada.
   */
  disableSelection: boolean = true;

  /**
   * Referencia al elemento del modal en la plantilla.
   */
  @ViewChild('modal') modalElement!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

/**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
/**
   * Cambia el valor seleccionado del radio.
   * @param value Valor seleccionado.
   */


cambiarRadio(value: string | number):void {
  this.valorSeleccionado = value as string;
  this.store.setDistribucionGas(this.valorSeleccionado);
}
cambiarRadio1(value: string | number):void {
  this.valorSeleccionado1 = value as string;
  this.store.setDistribucionGas(this.valorSeleccionado1);
}
cambiarRadio2(value: string | number):void {
  this.valorSeleccionado2 = value as string;
  this.store.setIndustriaAutomotriz(this.valorSeleccionado2);
}
  /**
   * Suscripción activa.
   */
  subscription!: Subscription;

  /**
   * Suscripción para manejar múltiples observables.
   */
   subscriptionS: Subscription = new Subscription();

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Suscribe a varios observables para obtener datos relacionados con la solicitud, 
   *   como país, entidad federativa, municipio o delegación, colonia, aduana y fracción arancelaria.
   * - Configura los datos obtenidos en propiedades del componente para su uso en la interfaz de usuario.
   * - Inicializa el formulario reactivo `agregarForm` con validaciones requeridas para ciertos campos.
   * - Administra las suscripciones a los observables para evitar fugas de memoria al destruir el componente.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.crearDatosDelTramiteForm();
    this.getPais();
    this.getAduana();
    this.getEntidadFederativa();
    this.getMunicipioDelegacion();
    this.getColonia();
    this.getFraccionArancelariae();
    this.obtenerMercancia();
    this.obtenerJsonData()
    this.crearFormularioAgregar();
  }

  obtenerJsonData():void{
  this.subscriptions.push(
    this.query.selectPais$.subscribe((pais) => {
      this.pais = {
        labelNombre: 'País',
        required: false,
        primerOpcion: 'Selecciona un valor',
        catalogos: pais ?? [],
      };
    })
  );
  this.subscriptions.push(
    this.query.selectEntidadFederativa$.subscribe((entidadFederativa) => {
      this.entidadFederativa = {
        labelNombre: 'Entidad Federativa',
        required: false,
        primerOpcion: 'Selecciona un valor',
        catalogos: entidadFederativa ?? [],
      };
    })
  );
  this.subscriptions.push(
    this.query.selectMunicipioDelegacion$.subscribe((municipioDelegacion) => {
      this.municipioDelegacion = {
        labelNombre: 'Municipio o Delegación',
        required: false,
        primerOpcion: 'Selecciona un valor',
        catalogos: municipioDelegacion ?? [],
      };
    })
  );

  this.subscriptions.push(
    this.query.selectColonia$.subscribe((colonia) => {
      this.colonia = {
        labelNombre: 'Colonia',
        required: false,
        primerOpcion: 'Selecciona un valor',
        catalogos: colonia ?? [],
      };
    })
  );

  this.subscriptions.push(
    this.query.selectAduana$.subscribe((aduana) => {
      this.aduana = {
        labelNombre: 'Aduana',
        required: false,
        primerOpcion: 'Selecciona un valor',
        catalogos: aduana ?? [],
      };
    })
  );

  this.subscriptions.push(
    this.query.selectFraccionarancelaria$.subscribe((fraccionarancelaria) => {
      this.fraccionArancelaria = {
        labelNombre: 'Fracción arancelaria',
        required: false,
        primerOpcion: 'Selecciona un valor',
        catalogos: fraccionarancelaria ?? [],
      };
    })
  );
}

crearFormularioAgregar(): void {
  this.agregarForm = this.fb.group({
    fraccionArancelaria: [{ value: '' }, Validators.required],
    descripcion: ['', Validators.required],
    descripcionAdicional: ['']
  });
}

  /**
   * @method crearDatosDelTramiteForm
   * @description Crea y configura el formulario reactivo `datosDelTramite` con los controles necesarios
   *              para capturar y gestionar los datos relacionados con el trámite. Los valores iniciales
   *              de los controles se establecen a partir del estado actual de `solicitudState`.
   * 
   * @remarks
   * Este método utiliza `FormBuilder` para construir un formulario reactivo con validaciones y valores
   * iniciales. Algunos campos están deshabilitados y otros tienen validaciones requeridas.
   * 
   * @example
   * // Ejemplo de uso:
   * this.crearDatosDelTramiteForm();
   * console.log(this.datosDelTramite.value);
   * 
   * @property {FormGroup} datosDelTramite - El formulario reactivo creado por este método.
   * 
   * @fields
   * - **Regímenes**: Controles para los diferentes regímenes como importación, exportación, etc.
   * - **Servicios a terceros**: Control único para capturar si aplica o no.
   * - **Distribución de gas**: Control único para capturar si aplica o no.
   * - **Industria automotriz**: Control único para capturar si aplica o no.
   * - **Ubicación**: Controles relacionados con la dirección y ubicación del trámite.
   * - **Aduanas**: Control requerido para capturar la aduana asociada.
   * 
   * @throws No aplica.
   */
  crearDatosDelTramiteForm(): void {
    this.datosDelTramite = this.fb.group({
      // Regímenes
      importacion: [this.solicitudState?.importacion],
      exportacion: [this.solicitudState?.exportacion],
      depositoFiscalGas: [this.solicitudState?.depositoFiscalGas],
      depositoFiscalVehiculos: [this.solicitudState?.depositoFiscalVehiculos],
      distribucionGasSi: [this.solicitudState?.distribucionGas],
      distribucionGasNo: [this.solicitudState?.distribucionGas],
      serviciosTercerosSi: [this.solicitudState?.serviciosTerceros],
      serviciosTercerosNo: [this.solicitudState?.serviciosTerceros],
      industriaAutomotrizSi: [this.solicitudState?.industriaAutomotriz],
      industriaAutomotrizNo: [this.solicitudState?.industriaAutomotriz],
      // Servicios a terceros (single value, use one control)
      serviciosTerceros: [this.solicitudState?.serviciosTerceros],

      // Distribución de gas (single value)
      distribucionGas: [this.solicitudState?.distribucionGas],

      // Industria automotriz (single value)
      industriaAutomotriz: [this.solicitudState?.industriaAutomotriz],

      // Ubicación
      domicilio: [this.solicitudState?.domicilio],
      ubicacion: [this.solicitudState?.ubicacion],

      // Inputsimportacion
      pais: [{ value: this.solicitudState?.pais, disabled: true }, Validators.required],
      codigoPostal: [{ value: this.solicitudState?.codigoPostal, disabled: true }],
      entidadFederativa: [{ value: this.solicitudState?.entidadFederativa, disabled: true }],
      municipioDelegacion: [{ value: this.solicitudState?.municipioDelegacion, disabled: true }],
      localidad: [{ value: this.solicitudState?.localidad, disabled: true }],
      colonia: [{ value: this.solicitudState?.colonia, disabled: true }],
      entidadFederativaDos: [{ value: this.solicitudState?.entidadFederativaDos, disabled: true }],
      calle: [{ value: this.solicitudState?.calle, disabled: true }],
      numeroExterior: [{ value: this.solicitudState?.numeroExterior, disabled: true }],
      numeroInterior: [{ value: this.solicitudState?.numeroInterior, disabled: true }],
      ubicacionDescripcion: [{ value: this.solicitudState?.ubicacionDescripcion, disabled: true }],
      // Aduanas
      aduana: [{ value: this.solicitudState?.aduana }, Validators.required],
    });

  }

  /**
   * @method cerrarModal
   * @description Cierra el modal utilizando la referencia al botón de cierre.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * @property opcionSeleccionada
   * @description Almacena la opción seleccionada en los checkboxes.
   */
  opcionSeleccionada: string = '';

  /**
   * @method onCheckboxChange
   * @description Maneja el cambio de estado de los checkboxes y habilita/deshabilita controles del formulario.
   * @param opcion - La opción seleccionada.
   */
  onCheckboxChange(opcion: string): void {
    const CONTROLS_TO_DISABLE = ['pais', 'codigoPostal', 'entidadFederativa', 'localidad', 'municipioDelegacion', 'colonia', 'entidadFederativaDos', 'calle', 'numeroExterior', 'numeroInterior'];
    if (this.opcionSeleccionada === opcion) {
      this.opcionSeleccionada = '';
      this.datosDelTramite.get('domicilio')?.setValue(null);
      CONTROLS_TO_DISABLE.forEach(control => {
        this.datosDelTramite.get(control)?.disable();
      });
      this.disableSelection = true;
    } else {
      this.opcionSeleccionada = opcion;
      this.datosDelTramite.get('domicilio')?.setValue(opcion);
      CONTROLS_TO_DISABLE.forEach(control => {
        this.datosDelTramite.get(control)?.enable();
      });
      this.disableSelection = false;
    }
  }

  /**
   * @method obtenerMercancia
   * @description Obtiene los datos de la tabla de mercancías y los asigna a las propiedades correspondientes.
   */
  public obtenerMercancia(): void {
    this.mercanciaHeaderData = this.getMercanciaTableData.mercanciaTable.tableHeader;
    this.mercanciaBodyData = this.getMercanciaTableData.mercanciaTable.tableBody;
  }

  /**
   * @method setValoresStore
   * @description Establece valores en el store a partir de un formulario y un campo específico.
   * @param form - El formulario reactivo.
   * @param campo - El nombre del campo en el formulario.
   * @param metodoNombre - El método del store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite105Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * @method abrirModal
   * @description Abre el modal y configura el formulario de agregar mercancías.
   */
  public abrirModal(): void {
    this.modal = 'show';
    this.getAgregarForm();
  }

  /**
   * @method getAgregarForm
   * @description Configura el formulario reactivo para agregar mercancías.
   */
  public getAgregarForm(): void {
    this.agregarForm = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      descripcion: ['', Validators.required],
      descripcionAdicional: ['']
    });
  }

  /**
   * @method getPais
   * @description Obtiene el catálogo de países desde el servicio y lo almacena en el store.
   */
  getPais(): void {
    const SUB = this.invoCarService
      .getPais()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setPais(RESPONSE);
        }
      });
    this.subscriptionS.add(SUB);
  }

  /**
   * @method getEntidadFederativa
   * @description Obtiene el catálogo de entidades federativas desde el servicio y lo almacena en el store.
   */
  getEntidadFederativa(): void {
    const SUB = this.invoCarService.getEntidadFederativa().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.store.setEntidadFederativa(RESPONSE);
      }
    });
    this.subscriptionS.add(SUB);
  }

  /**
   * @method getMunicipioDelegacion
   * @description Obtiene el catálogo de municipios o delegaciones desde el servicio y lo almacena en el store.
   */
  getMunicipioDelegacion(): void {
    const SUB = this.invoCarService.getMunicipioDelegacion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.store.setMunicipioDelegacion(RESPONSE);
      }
    });
    this.subscriptionS.add(SUB);
  }

  /**
   * @method getColonia
   * @description Obtiene el catálogo de colonias desde el servicio y lo almacena en el store.
   */
  getColonia(): void {
    const SUB = this.invoCarService.getColonia().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.store.setColonia(RESPONSE);
      }
    });
    this.subscriptionS.add(SUB);
  }

  /**
   * @method getAduana
   * @description Obtiene el catálogo de aduanas desde el servicio y lo almacena en el store.
   */
  getAduana(): void {
    const SUB = this.invoCarService.getAduana().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.store.setAduana(RESPONSE);
      }
    });
    this.subscriptionS.add(SUB);
  }

  /**
   * @method getFraccionArancelariae
   * @description Obtiene el catálogo de fracciones arancelarias desde el servicio y lo almacena en el store.
   */
  getFraccionArancelariae(): void {
    const SUB = this.invoCarService.getFraccionArancelariaOptions().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.store.setFraccionarancelaria(RESPONSE);
      }
    });
    this.subscriptionS.add(SUB);
  }

  /**
   * @method agregarMercancias
   * @description Agrega una mercancía a la tabla de mercancías y reinicia el formulario.
   */
  agregarMercancias(): void {
    if (!this.agregarForm.valid) {
      return;
    }
    const MERCANCIA = this.agregarForm.value;
    this.getMercanciaTableData.mercanciaTable.tableBody.push(MERCANCIA);
    this.agregarForm.reset();
    this.cerrarModal();
  }

  /**
   * @method ngOnDestroy
   * @description Limpia las suscripciones activas y restablece el estado del modal al destruir el componente.
   */
  ngOnDestroy(): void {
    this.subscriptionS.unsubscribe();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.modal = 'modal';
  }
}
