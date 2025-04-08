import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BotonAccionesTipos,
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import {
  Solicitud32502State,
  tramite32505Store,
} from '../../../../estados/tramites/trimite32505.store';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite32505Query } from '../../../../estados/queries/tramite32505.query';
import { map, Subject, takeUntil } from 'rxjs';
import { AvisoService } from '../../services/aviso.service';
import { CatalogoLista } from '../../models/avios-model';

import { TABLE_DATA } from '../../constants/avios-procesos.enum';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import { DatosAvisoService } from '../datosAviso/datosAviso.component';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CargaMasivaComponent,
  ],
  standalone: true,
})
export class AvisoComponent implements OnInit {
  isPopupOpen: boolean = false;
  datosDelVehiculo: boolean = false;

  openPopup() {
    this.isPopupOpen = true;
  }
  esManualAsivoAgregarClicked = false;

  TablaSeleccion = TablaSeleccion;

  botonAccionesTipos = BotonAccionesTipos;

  tableData = TABLE_DATA;

  /**
   * Referencia al elemento del modal para buscar mercancías.
   *
   * Se utiliza para abrir o cerrar el modal de búsqueda.
   */
  @ViewChild('datosAviso') datosAviso!: ElementRef;

  /**
   * Muestra el modal para cargar un archivo.
   *
   * Este método utiliza el modal de Bootstrap para mostrar el modal de carga de archivos.
   */
  datosDelAviso(): void {
    this.isPopupOpen = true;
    if (this.datosAviso) {
      const MODAL_INSTANCE = new Modal(this.datosAviso.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  /**
   * La función maneja las acciones del botón.
   * @param accione - Parámetro que tiene la acción de ser del tipo BotonAccionesTipos.
   */
  accionesBotones(accione: BotonAccionesTipos): void {
    switch (accione) {
      case BotonAccionesTipos.AGREGAR:
        this.esManualAsivoAgregarClicked = true;
        break;
      case BotonAccionesTipos.ELIMINAR:
        break;
      case BotonAccionesTipos.MODIFICAR:
        break;

      default:
        break;
    }
  }
  /**
   * Formulario para capturar datos adicionales relacionados con el registro.
   */
  aviosForm!: FormGroup;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32502State;

  /**
   * Sujeto para manejar la destrucción de observables.
   *
   * Se utiliza para evitar fugas de memoria al destruir el componente.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Opciones disponibles para los países.
   *
   * Contiene una lista de países que el usuario puede seleccionar.
   */
  optionsPais!: Catalogo[];

  optionsAnio!: Catalogo[];

  optionCilindros!: Catalogo[];
  optionCombustible!: Catalogo[];

  paisIssued!:Catalogo[] ;

  /**
   * @property {boolean} seccionContenedorVisible
   * Indicates whether the container section is visible.
   */
  datosDelAvisoVisible: boolean = false;

  datosCargaMasiva: boolean = false;

  constructor(
    private fb: FormBuilder,
    public store: tramite32505Store,
    public tramiteQuery: Tramite32505Query,
    private avisoService: AvisoService,
    private validacionesService: ValidacionesFormularioService
  ) {}
  /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Inicializa el componente.
   *
   * Este método configura los formularios y carga los datos iniciales necesarios para el Certificado de Origen.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.crearFormSolicitud();
    this.cargarPais();
    this.cargarAnio();
    this.mostrarCampos();
    this.mostrarCamposAviso();
    this.cargarCilindros();
    this.cargarCombustible();
   this.cargarPaisIssued();
  }

  /**
   * Obtiene el grupo de formulario 'adaceForm' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'adaceForm'.
   */
  get adaceForm(): FormGroup {
    return this.aviosForm.get('adaceForm') as FormGroup;
  }

  /**
   * Obtiene el campo 'adace' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'adace' del formulario 'adaceForm'.
   */
  get adace(): FormGroup {
    return this.aviosForm.get('adaceForm.adace') as FormGroup;
  }

  get pais(): FormGroup {
    return this.aviosForm.get('adaceForm.pais') as FormGroup;
  }

  get anio(): FormGroup {
    return this.aviosForm.get('adaceForm.anio') as FormGroup;
  }

  get tipoBusqueda(): FormGroup {
    return this.aviosForm.get('adaceForm.tipoBusqueda') as FormGroup;
  }

  get tipoBusquedaAviso(): FormGroup {
    return this.aviosForm.get('adaceForm.tipoBusquedaAviso') as FormGroup;
  }

  get folioTipo(): FormGroup {
    return this.aviosForm.get('adaceForm.folioTipo') as FormGroup;
  }

  get cilindros(): FormGroup {
    return this.aviosForm.get('adaceForm.cilindros') as FormGroup;
  }
  /**
   * Método para crear el formulario principal de la solicitud.
   */
  crearFormSolicitud(): void {
    this.aviosForm = this.fb.group({
      adaceForm: this.fb.group({
        adace: [this.solicitudState?.adace],
        pais: [this.solicitudState?.pais, [Validators.required]],
        anio: [this.solicitudState?.anio, [Validators.required]],
        tipoBusqueda: [this.solicitudState?.tipoBusqueda, Validators.required],
        tipoBusquedaAviso: [
          this.solicitudState?.tipoBusquedaAviso,
          Validators.required,
        ],
        folioTipo: [this.solicitudState?.folioTipo, Validators.required],
        numeroSerie: [this.solicitudState?.numeroSerie, [Validators.required]],
        numeroNIV: [this.solicitudState?.numeroNIV, [Validators.required]],
        anoModelo: [this.solicitudState?.anoModelo, [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        modelo: [this.solicitudState?.modelo, [Validators.required]],
        tipoVariante: [
          this.solicitudState?.tipoVariante,
          [Validators.required],
        ],
        cilindros: [this.solicitudState?.cilindros, [Validators.required]],
        puertas: [this.solicitudState?.puertas, [Validators.required]],
        combustible: [this.solicitudState?.combustible, [Validators.required]],
        propiedad: [this.solicitudState?.propiedad, [Validators.required]],
        nombreTitulo:[this.solicitudState?.nombreTitulo, [Validators.required]],
        paisEmitio:[this.solicitudState?.paisEmitio, [Validators.required]],
        provinciaEmision:[this.solicitudState?.provinciaEmision, [Validators.required]],
        procedencia:[this.solicitudState?.procedencia, [Validators.required]],
        vehiculoImportado:[this.solicitudState?.vehiculoImportado, [Validators.required]],
        exportacion:[this.solicitudState?.exportacion, [Validators.required]],
          
      }),

      datos: this.fb.group({}),
    });

    this.mostrarCampos();
    this.adaceForm.get('tipoBusqueda')?.valueChanges.subscribe((value) => {
      this.setValoresStore(this.adaceForm, 'tipoBusqueda', 'setTipoBusqueda');
      this.mostrarCampos();
    });

    this.adaceForm.get('tipoBusquedaAviso')?.valueChanges.subscribe((value) => {
      this.setValoresStore(
        this.adaceForm,
        'tipoBusquedaAviso',
        'setTipoBusquedaAviso'
      );
      this.mostrarCamposAviso();
    });
  }

  /**
   * Muestra los campos según el tipo de búsqueda seleccionado.
   */
  mostrarCamposAviso(): void {
    const AVISO_TIPO_BUSQUEDA = this.adaceForm.get('tipoBusquedaAviso')?.value;
    console.log('Tipo de busqueda:', AVISO_TIPO_BUSQUEDA);
    if (AVISO_TIPO_BUSQUEDA === 'Importación') {
      this.datosDelVehiculo = true;
    } else if (AVISO_TIPO_BUSQUEDA === 'Venta') {
    } else if (AVISO_TIPO_BUSQUEDA === 'Importación y venta') {
    } else {
    }
  }

  /**
   * Muestra los campos según el tipo de búsqueda seleccionado.
   */
  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.adaceForm.get('tipoBusqueda')?.value;
    console.log('Tipo de busqueda:', TIPO_BUSQUEDA);
    if (TIPO_BUSQUEDA === 'Manual') {
      this.datosDelAvisoVisible = true;
      this.datosCargaMasiva = false;
    } else if (TIPO_BUSQUEDA === 'Carga masiva') {
      this.datosDelAvisoVisible = false;
      this.datosCargaMasiva = true;
    } else {
    }
  }

  /**
   * Actualiza un valor en el store del trámite.
   *
   * Este método permite actualizar un valor específico en el store del trámite utilizando el formulario y el método correspondiente.
   *
   * @param {FormGroup} form - El formulario que contiene el valor a actualizar.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110217Store} metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof tramite32505Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Carga las opciones disponibles para los países.
   *
   * Este método obtiene las opciones de países desde el servicio `CertificadosOrigenService` y las asigna a `optionsPais` y `optionsTipoFactura`.
   */
  cargarPais(): void {
    this.avisoService
      .obtenerPais()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsPais = datos.datos;
        console.log(this.optionsPais);
      });
  }

  cargarAnio(): void {
    this.avisoService
      .obtenerAnio()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsAnio = datos.datos;
      });
  }

  cargarCilindros(): void {
    this.avisoService
      .obtenerCilindros()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionCilindros = datos.datos;
      });
  }

  cargarPaisIssued():void{
    this.avisoService
      .obtenerPaisIssued()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.paisIssued = datos.datos;
      });
  }

  cargarCombustible(): void {
    this.avisoService
      .obtenerCombustible()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionCombustible = datos.datos;
      });
  }

  

  /**
   * Limpia los observables al destruir el componente.
   *
   * Este método emite un valor en el `destroyNotifier$` y completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
