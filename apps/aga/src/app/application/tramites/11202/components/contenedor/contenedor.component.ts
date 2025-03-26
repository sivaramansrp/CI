import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { DatosTramiteService } from 'libs/shared/data-access-user/src/core/services/11202/datos-tramite.service';
import preOperativo from 'libs/shared/theme/assets/json/11202/preOperativo.json';

import {TEXTOS_REQUISITOS } from '../../../../constantes/11202/retorno-contenedores.enum';
import { Contenedor11202State, Contenedor11202Store } from '../../../../core/estados/tramites/contenedor11202.store';
import { Contenedor11202Query } from '../../../../core/queries/contenedor11202.query';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.scss',
})
export class ContenedorComponent implements OnInit, OnDestroy {
  public contenedorState!: Contenedor11202State;
  TEXTOS = TEXTOS_REQUISITOS;
  /**
   * Lista de catálogos de Seleccione una opción.
   */
  options!: Catalogo[];

  
   /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
   datosTabla: any[] = [];
  


  radioOptions = preOperativo;
  private subscription: Subscription = new Subscription();
  private destroyNotifier$: Subject<void> = new Subject();

  solicitudForm!: FormGroup;
  isAdjuntarArchivoVisible: boolean = false;
  seccionAduanaaFechaVisible: boolean = false;
  seccionContenedorVisible: boolean = false;
  seccionContenedor: boolean = false;
  agregarTipoContenedorVisible: boolean = false;
  seccionExcelVisible: boolean = false;
  catalogAduanas: Catalogo[] = [];
  catalogContenedores: string[] = [];
  contenedores: any[] = [];
  archivoSeleccionado: string = '';
  cargarArchivoVisible: boolean = false;
  exceptionCaught: boolean = false;
  actionBean = { requiereGuardadoParcial: false };
  nonSelectionTextTipoContendor: string = 'Selecciona un valor';
  cargarArchivo: boolean = false;
  currentIdx: number = 0;

  showCargarArchivoTable: boolean = false;
  showArchivoSeleccionadoTable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private datosTramiteService: DatosTramiteService,
    private contenedorStore: Contenedor11202Store,
    private contenedorQuery: Contenedor11202Query
  ) {}

  /**
   * Método de ciclo de vida de Angular que se llama cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyNotifier$.next();
  }

  /**
   * Método de ciclo de vida de Angular que se llama cuando el componente se inicializa.
   */
  ngOnInit(): void {
    this.cargarCatalogAduanas();
    this.subscription.add(
      this.contenedorQuery.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.contenedorState = seccionState;
          })
        )
        .subscribe()
    );
    this.crearFormSolicitud();
    this.cargarCatalogContenedores();
    this.tabSeleccionado();
    this.loadDatosTablaData();
  }

  /**
   * Carga el catálogo de aduanas.
   */
  cargarCatalogAduanas(): void {
    this.datosTramiteService
      .getAduanas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]): void => {
        this.options = data as Catalogo[];
      });
  }

  /**
   * Carga el catálogo de contenedores.
   */
  cargarCatalogContenedores(): void {
    this.datosTramiteService
      .getContenedores()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Catalogo[]) => {
        this.options = data as Catalogo[];
      });
  }

  /**
   * Muestra los campos según el tipo de búsqueda seleccionado.
   */
  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    if (TIPO_BUSQUEDA === 'Contenedor') {
      this.seccionContenedorVisible = false;
      this.seccionContenedor = true;
      this.seccionAduanaaFechaVisible = true;
      this.cargarArchivoVisible = false;
      this.seccionExcelVisible = false;
      this.cargarArchivo = true;
    } else if (TIPO_BUSQUEDA === 'Archivo CSV') {
      this.seccionExcelVisible = true;
      this.seccionAduanaaFechaVisible = true;
      this.seccionContenedorVisible = true;
      this.seccionContenedor = false;
      this.cargarArchivo = true;
    } else {
      this.seccionAduanaaFechaVisible = false;
      this.seccionContenedorVisible = false;
      this.seccionExcelVisible = false;
    }
  }

  /**
   * Limpia los campos del formulario.
   */
  limpiarCampos(): void {
    this.solicitudForm.reset();
    this.contenedores = [];
    this.archivoSeleccionado = '';
    this.exceptionCaught = false;
  }

  /**
   * Captura los datos del formulario y los envía.
   */
  datosCaptura(): void {
    if (this.solicitudForm.valid) {
      this.datosTramiteService
        .submitSolicitud(this.solicitudForm.value)
        .subscribe(
          (response) => {
            this.exceptionCaught = false;
          },
          (error) => {
           
            this.exceptionCaught = true;
          }
        );
    } else {
      this.exceptionCaught = true;
    }
  }

  /**
   * Agrega un nuevo contenedor al grid.
   */
  agregarAGrid(): void {
    const NUEVO_CONTENEDOR = {
      tipoContenedor: this.datosContenedor.get('tipoContenedor')?.value,
      digito: this.solicitudForm.get('digitoDeControl')?.value,
      aduana: this.datosGenerales.get('aduana')?.value,
      inicialesContenedor: this.datosContenedor.get('inicialesContenedor')
        ?.value,
      numeroContenedor: this.datosContenedor.get('numeroContenedor')?.value,
    };

    if (NUEVO_CONTENEDOR.aduana) {
      this.contenedores.push(NUEVO_CONTENEDOR);

      this.solicitudForm.patchValue({
        contenedores: '',
        digitoDeControl: '',
      });
    } else {
      this.exceptionCaught = true;
    }
  }

  /**
   * Adjuntar archivo CSV y parsear su contenido.
   */
  adjuntarArchivo(): void {
    const FILE_INPUT = document.getElementById(
      'archivoSeleccionado'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.parseCSV(TEXT);
        this.showArchivoSeleccionadoTable = true;
      };
      READER.readAsText(FILE);
    }
  }

  /**
   * Cargar archivo CSV y parsear su contenido.
   */
  parseCSV(csv: string): void {
    const LINES = csv.split('\n').filter((line) => line.trim() !== '');
    const HEADERS = LINES[0].split(',');
    const HEADER_MAP: { [key: string]: string } = {
      Aduana: 'aduana',
      'Iniciales del equipo': 'inicialesEquipo',
      'Tipo de equipo': 'tipoEquipo',
      'N�mero de equipo': 'numeroEquipo',
      'D�gito Verificador': 'digitoVerificador',
      'Fecha Ingreso': 'fechaIngreso',
      Vigencia: 'vigencia',
      'Estado de constancia': 'estadoConstancia',
      'Existe en VUCEM': 'existeEnVUCEM',
      'Id constancia': 'idConstancia',
      'N�mero manifiesto': 'numeroManifiesto',
      'Id solicitud': 'idSolicitud',
      'Fecha inicio': 'fechaInicio',
    };
    const DATA = LINES.slice(1)
      .map((line) => {
        const VALUES = line.split(',');
        const OBJ: any = {};
        HEADERS.forEach((header, index) => {
          const KEY = HEADER_MAP[header.trim()] || header.trim();
          OBJ[KEY] = VALUES[index]?.trim();
        });
        return OBJ;
      })
      .filter((artículo) => Object.values(artículo).some((value) => value));
    this.datosTabla = DATA;
  }

  /**
   * Cargar archivo CSV y parsear su contenido.
   */
  Archivo(): void {
    const FILE_INPUT = document.getElementById(
      'cargarArchivo'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.parseCSV(TEXT);
        this.showCargarArchivoTable = true;
      };
      READER.readAsText(FILE);
    }
  }
  /**
   * Abre el modal para cancelar el trámite.
   */
  openModalCancelarTramite(): void {
    this.solicitudForm.reset();
    this.contenedores = [];
    this.archivoSeleccionado = '';
    this.exceptionCaught = false;
  }

  /**
   * Selecciona la pestaña activa basada en el índice almacenado en localStorage.
   */
  tabSeleccionado(): void {
    const CURRENT_IDX = localStorage.getItem('currentIdx');
    if (CURRENT_IDX !== null) {
      this.currentIdx = +CURRENT_IDX;
    }
  }

  /**
   * Cancela la selección del radio button.
   */
  cancelarRadioButton(): void {
    this.solicitudForm.get('tipoBusqueda')?.setValue('');
    this.mostrarCampos();
  }

  /**
   * Muestra el campo para agregar tipo de contenedor.
   */
  mostrarTIpoContenedor(): void {
    this.agregarTipoContenedorVisible = true;
  }

  /**
   * Crea el formulario de solicitud.
   */
  crearFormSolicitud(): void {
    this.solicitudForm = this.fb.group({
      idSolicitud: [this.contenedorState?.idSolicitud],
      tipoBusqueda: [this.contenedorState?.tipoBusqueda, Validators.required],

      datosGenerales: this.fb.group({
        aduana: [this.contenedorState?.aduana],
      }),

      datosContenedor: this.fb.group({
        inicialesContenedor: [this.contenedorState?.inicialesContenedor],
        numeroContenedor: [this.contenedorState?.numeroContenedor],
        tipoContenedor: [this.contenedorState?.tipoContenedor],
      }),
    });

    this.mostrarCampos();
       this.solicitudForm.get('tipoBusqueda')?.valueChanges.subscribe((value) => {
      this.setValoresStore(
        this.solicitudForm,
        'tipoBusqueda',
        'setTipoBusqueda'
      );
      this.mostrarCampos();
    });
  }

  
  loadDatosTablaData(): void {
    this.datosTramiteService.getDatosTableData().pipe(takeUntil(this.destroyNotifier$)).subscribe((data) => {
      this.datosTabla = data;
    });
  }

  /**
   * Establece los valores en el store.
   * @param form El formulario del cual se obtienen los valores.
   * @param campo El campo del formulario.
   * @param metodoNombre El nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Contenedor11202Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.contenedorStore[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Obtiene el formulario de datos generales.
   */
  get datosGenerales(): FormGroup {
    return this.solicitudForm.get('datosGenerales') as FormGroup;
  }

  /**
   * Obtiene el formulario de datos del contenedor.
   */
  get datosContenedor(): FormGroup {
    return this.solicitudForm.get('datosContenedor') as FormGroup;
  }
}
