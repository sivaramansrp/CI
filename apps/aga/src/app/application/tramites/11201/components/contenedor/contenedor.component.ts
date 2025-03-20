import { Aduanas } from '@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Contenedores } from '@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model';
import { DatosDelContenedor } from '@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud11201State } from '../../../../estados/tramites/tramite11201.store';
import { Subject } from 'rxjs';
import { TEXTOS } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TemplateRef } from '@angular/core';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite11201Query } from '../../../../estados/queries/tramite11201.query';
import { Tramite11201Store } from '../../../../estados/tramites/tramite11201.store';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import moment from 'moment';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar la solicitud de contenedores.
 */
@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent
  ],
  providers: [BsModalService]
})
export class ContenedorComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Bandera para mostrar la sección de adjuntar archivo.
   */
  showAdjuntarArchivo: boolean = false;

  /**
   * Bandera para mostrar la sección de aduana y fecha.
   */
  showSeccionAduanaaFecha: boolean = false;

  /**
   * Bandera para mostrar la sección de contenedor.
   */
  showSeccionContenedor: boolean = false;

  /**
   * Bandera para mostrar la sección de número de manifiesto.
   */
  showSeccionNoManifiesto: boolean = false;

  /**
   * Bandera para mostrar la tabla de cargar archivo.
   */
  showCargarArchivoTable: boolean = false;

  /**
   * Bandera para mostrar la tabla de archivo seleccionado.
   */
  showArchivoSeleccionadoTable: boolean = false;

  /**
   * Bandera para mostrar la sección de Excel.
   */
  showSeccionExcel: boolean = false;

  /**
   * Bandera para mostrar el mensaje.
   */
  mostrarMensaje: boolean = false;

  /**
   * Mensaje de campos obligatorios.
   */
  mensajeCamposObligatorios: string = '* Campos obligatorios';

  /**
   * Lista de aduanas.
   */
  aduanaList: Aduanas[] = [];

  /**
   * Lista de contenedores.
   */
  contenedores: Contenedores[] = [];

  /**
   * Bandera para requerir guardado parcial.
   */
  requiereGuardadoParcial: boolean = false;

  /**
   * Índice actual.
   */
  currentIdx: number = 0;

  /**
   * Lista de catálogos.
   */
  @Input() catalogoList: Catalogo[] = [];

  /**
   * Lista de transporte.
   */
  transporteList: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Lista de aduanas.
   */
  aduana: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: any[] = [];

  /**
   * Obtener el valor de la instrucción e inicializar la variable.
   */
  TEXTOS = TEXTOS;

  /**
   * Estado de la solicitud.
   */
  public solicitud11201State!: Solicitud11201State;

  /**
   * Sujeto para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Monto de la solicitud.
   */
  amount: number = 328.5;

  /**
   * Configuración de las columnas de la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<DatosDelContenedor>[] = [
    { encabezado: '', clave: (artículo) => artículo.id, orden: 1 },
    { encabezado: 'Iniciales del equipo', clave: (artículo) => artículo.inicialesEquipo, orden: 1 },
    { encabezado: 'Número de equipo', clave: (artículo) => artículo.numeroEquipo, orden: 2 },
    { encabezado: 'Dígito Verificador', clave: (artículo) => artículo.digitoVerificador, orden: 3 },
    { encabezado: 'Tipo de equipo', clave: (artículo) => artículo.tipoEquipo, orden: 4 },
    { encabezado: 'Aduana', clave: (artículo) => artículo.aduana, orden: 5 },
    { encabezado: 'Fecha Ingreso', clave: (artículo) => artículo.fechaIngreso, orden: 6 },
    { encabezado: 'Vigencia', clave: (artículo) => artículo.vigencia, orden: 7 },
    { encabezado: 'Estado de constancia', clave: (artículo) => artículo.estadoConstancia, orden: 8 },
    { encabezado: 'Existe en VUCEM', clave: (artículo) => artículo.existeEnVUCEM, orden: 9 },
    { encabezado: 'Id constancia', clave: (artículo) => artículo.idConstancia, orden: 10 },
    { encabezado: 'Número manifiesto', clave: (artículo) => artículo.numeroManifiesto, orden: 11 },
    { encabezado: 'Id solicitud', clave: (artículo) => artículo.idSolicitud, orden: 12 },
    { encabezado: 'Fecha inicio', clave: (artículo) => artículo.fechaInicio, orden: 13 }
  ];

  /**
   * Datos del contenedor.
   */
  public datosDelContenedor: DatosDelContenedor[] = [];

  /**
   * Datos del modelo abierto.
   */
  abiertoModeloDatos: string = '';

  /**
   * Referencia al modal.
   */
  modalRef?: BsModalRef | null;

  /**
   * Plantilla del modal.
   */
  @ViewChild('plantillademodelo') plantillaDeModelo!: TemplateRef<Element>;

  /**
   * Evento para continuar.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private datosTramiteService: DatosTramiteService,
    private validacionesService: ValidacionesFormularioService,
    public tramite11201Store: Tramite11201Store,
    private tramite11201Query: Tramite11201Query,
    private modalService: BsModalService,
  ) {
    this.transporteList = {
      catalogos: [],
      labelNombre: 'Tipo de transporte',
      primerOpcion: 'Seleccione un valor',
    };
    this.aduana = {
      catalogos: [],
      labelNombre: 'Aduana/sección aduanera',
      primerOpcion: 'Seleccione un valor',
    };
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.tramite11201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitud11201State = {
            ...this.solicitud11201State,
            ...seccionState,
          };
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.cargarCatalogos();
    this.tabSeleccionado();
    this.fetchgetTransporteList();
    this.fetchAduanaList();
    this.loadDatosTablaData();
  }

  /**
   * Método de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario reactivo.
   */
  inicializarFormulario(): void {
    this.solicitudForm = this.fb.group({
      tipoBusqueda: [this.solicitud11201State?.tipoBusqueda, Validators.required],
      aduana: [this.solicitud11201State?.aduana, Validators.required],
      fechaIngreso: [this.solicitud11201State?.fechaIngreso, Validators.required],
      inicialesContenedor: [this.solicitud11201State?.inicialesContenedor, [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9]+$')]],
      numeroContenedor: [this.solicitud11201State?.numeroContenedor, [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      digitoDeControl: [this.solicitud11201State?.digitoDeControl, [Validators.maxLength(1), Validators.pattern('^[0-9]$')]],
      contenedores: [this.solicitud11201State?.contenedores, Validators.required],
      tipoTransporte: ['', Validators.required],
      menúDesplegable: [this.solicitud11201State.menúDesplegable, Validators.required],
      numManifiesto: [
        this.solicitud11201State.numManifiesto,
        [Validators.required, Validators.maxLength(50)],
      ],
      aduanaMenúDesplegable: [
        this.solicitud11201State.aduanaMenúDesplegable,
        Validators.required,
      ],
      archivoSeleccionado: [this.solicitud11201State?.archivoSeleccionado, Validators.required],
      individualCaja: this.fb.array(
        this.solicitud11201State?.individualCaja
      ),
      amount: [this.amount, Validators.required],
      fechaDeIngreso: [
        this.solicitud11201State?.fechaDeIngreso,
        Validators.required,
      ],
      commonCaja: [this.solicitud11201State?.commonCaja],
    });
    this.mostrarCampos();
    this.solicitudForm
      .get('inicialesContenedor')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
          this.solicitudForm
            .get('inicialesContenedor')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(
            this.solicitudForm,
            'inicialesContenedor',
            'setInicialesContenedor'
          );
        }
      });

    this.solicitudForm
      .get('numeroContenedor')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(/[^a-zA-Z0-9]/g, '');
          this.solicitudForm
            .get('numeroContenedor')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(this.solicitudForm, 'numeroContenedor', 'setNumeroContenedor');
        }
      });
    this.solicitudForm
      .get('digitoDeControl')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(/[^0-9]/g, '');
          this.solicitudForm
            .get('digitoDeControl')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(this.solicitudForm, 'digitoDeControl', 'setDigitoDeControl');
        }
      });
    // Escuchar cambios en tipoBusqueda para mostrar secciones
    this.solicitudForm.get('tipoBusqueda')?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe(() => {
      this.setValoresStore(this.solicitudForm, 'tipoBusqueda', 'setTipoBusqueda');
      this.mostrarCampos();
    });

    // Escuchar cambios en tipoTransporte
    this.solicitudForm.get('aduana')?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe(() => {
      this.setValoresStore(this.solicitudForm, 'aduana', 'setAduana');
      this.solicitudForm.get('fechaIngreso')?.setValue(moment().format('YYYY-MM-DD'));
      this.setValoresStore(this.solicitudForm, 'fechaIngreso', 'setFechaIngreso');
    });
  }

  /**
   * Obtener el array de checkboxes individuales.
   */
  get individualCaja(): FormArray {
    return this.solicitudForm.get('individualCaja') as FormArray;
  }

  loadDatosTablaData(): void {
    this.datosTramiteService.getDatosTableData().pipe(takeUntil(this.destroyNotifier$)).subscribe((data) => {
      this.datosTabla = data;
    });
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite11201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite11201Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Cargar catálogos de datos.
   */
  cargarCatalogos(): void {
    // Cargar catálogo de contenedores
    this.datosTramiteService.getContenedores().pipe(takeUntil(this.destroyNotifier$)).pipe(takeUntil(this.destroyNotifier$)).subscribe(
      (data) => {
        this.contenedores = data.data;
      },
    );
  }

  /**
   * Mostrar campos según el tipo de búsqueda seleccionado.
   */
  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    this.showAdjuntarArchivo = false;
    this.showSeccionAduanaaFecha = false;
    this.showSeccionContenedor = false;
    this.showSeccionNoManifiesto = false;
    this.showSeccionExcel = false;

    switch (TIPO_BUSQUEDA) {
      case 'Contenedor':
        this.showSeccionContenedor = true;
        this.showSeccionAduanaaFecha = true;
        break;
      case 'No. de Manifiesto':
        this.showSeccionNoManifiesto = true;
        break;
      case 'Archivo CSV':
        this.showAdjuntarArchivo = true;
        break;
      default:
        break;
    }
  }

  /**
   * Limpiar campos del formulario.
   */
  limpiarCampos(): void {
    this.solicitudForm.reset();
    // Resetear banderas y estados adicionales
    this.showAdjuntarArchivo = false;
    this.showSeccionAduanaaFecha = false;
    this.showSeccionContenedor = false;
    this.showSeccionNoManifiesto = false;
    this.showSeccionExcel = false;
    this.mostrarMensaje = false;
    // Deshabilitar controles específicos si es necesario
    this.solicitudForm.get('archivoSeleccionado')?.disable();
  }

  /**
   * Validar si un campo es válido.
   * @param field Nombre del campo.
   * @returns Verdadero si el campo es válido, falso en caso contrario.
   */
  isValid(field: string): boolean {
    const VALIDATIONRESULT = this.validacionesService.isValid(
      this.solicitudForm,
      field
    );
    return VALIDATIONRESULT === null ? false : VALIDATIONRESULT;
  }

  /**
   * Validar el dígito verificador y agregar la solicitud.
   */
  validarDigitoVerificador(): void {
    this.solicitudForm.markAllAsTouched();
    const ADUANA = this.solicitudForm.value.aduana;
    const FECHAINGRESO = this.solicitudForm.value.fechaIngreso;
    const INICIALESCONTENEDOR = this.solicitudForm.value.inicialesContenedor;
    const NUMEROCONTENEDOR = this.solicitudForm.value.numeroContenedor;
    const CONTENEDORES = this.solicitudForm.value.contenedores;
    if (INICIALESCONTENEDOR && NUMEROCONTENEDOR && ADUANA && CONTENEDORES && FECHAINGRESO) {
      this.agregarSolicitud();
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

  parseCSV(csv: string): void {
    const LINES = csv.split('\n').filter(line => line.trim() !== '');
    const HEADERS = LINES[0].split(',');
    const HEADER_MAP: { [key: string]: string } = {
      'Aduana': 'aduana',
      'Iniciales del equipo': 'inicialesEquipo',
      'Tipo de equipo':'tipoEquipo',
      'N�mero de equipo':'numeroEquipo',
      'D�gito Verificador':'digitoVerificador',
      'Fecha Ingreso':'fechaIngreso',
      'Vigencia':'vigencia',
      'Estado de constancia':'estadoConstancia',
      'Existe en VUCEM':'existeEnVUCEM',
      'Id constancia':'idConstancia',
      'N�mero manifiesto':'numeroManifiesto',
      'Id solicitud':'idSolicitud',
      'Fecha inicio':'fechaInicio'
    };
    const DATA = LINES.slice(1).map((line) => {
        const VALUES = line.split(',');
        const OBJ: { [key: string]: string } = {};
        HEADERS.forEach((header, index) => {
            const KEY = HEADER_MAP[header.trim()] || header.trim();
            OBJ[KEY] = VALUES[index]?.trim();
        });
        return OBJ;
    }).filter(artículo => Object.values(artículo).some(valor => valor));
    this.datosTabla = DATA;
}

  enviarManifiesto(): void {
    this.solicitudForm.markAllAsTouched();
    if (
      this.solicitudForm.get('numManifiesto')?.valid &&
      this.solicitudForm.get('menúDesplegable')?.valid
    ) {
      this.mostrarMensaje = true;
    }
  }

  esPago(): void {
    if (this.solicitudForm.valid) {
      // Implementar lógica de pago y envío del formulario
      this.datosTramiteService.submitSolicitud().pipe(takeUntil(this.destroyNotifier$)).subscribe(
        () => {
          // Manejar envío exitoso
        }
      );
    } else {
      this.mostrarMensaje = true;
    }
  }

  tabSeleccionado(): void {
    const CURRENT_IDX = localStorage.getItem('currentIdx');
    if (CURRENT_IDX !== null) {
      this.currentIdx = Number(CURRENT_IDX);
    }
  }

  cancelarRadioButton(): void {
    // Resetear botones de radio y campos relacionados
    this.solicitudForm.get('tipoBusqueda')?.setValue('');
    this.limpiarCampos();
  }

  agregarSolicitud(): void {
    this.datosTramiteService.agregarSolicitud().pipe(takeUntil(this.destroyNotifier$)).subscribe(
      (respuesta) => {
        // Manejar éxito, posiblemente refrescar la grilla o mostrar mensaje
        if (respuesta?.success) {
          respuesta.datos.id = this.datosDelContenedor.length + 1;
          this.datosDelContenedor.push(respuesta.datos);
          (this.tramite11201Store.setDelContenedor as (valor: DatosDelContenedor[]) => void)(this.datosDelContenedor);
          this.solicitudForm.patchValue({
            aduana: '',
            fechaIngreso: '',
            digitoDeControl: '',
            inicialesContenedor: '',
            numeroContenedor: '',
            contenedores: '',
          });
          this.solicitudForm.markAsUntouched();
          this.solicitudForm.markAsPristine();
        }
      }
    );
  }

  public fetchgetTransporteList(): void {
    this.datosTramiteService
      .getTransporteList('transporteList')
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
        this.catalogoList = respuesta.data;
      });
  }

  public fetchAduanaList(): void {
    this.datosTramiteService
      .getAduanaList('aduanaList')
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
        this.aduanaList = respuesta.data;
      });
  }

  /**
   * Manejar el cambio de estado de un checkbox individual
   * @param event Evento de cambio del checkbox
   * @param index Índice del checkbox
   */
  onCheckboxChange(event: Event, index: number): void {
    const TARGET = event.target as HTMLInputElement;
    if (TARGET) {
      this.individualCaja.controls[index].setValue(TARGET.checked);
    }
    this.setValoresStore(
      this.solicitudForm,
      'individualCaja',
      'setIndividualCaja'
    );
  }

  /**
   * Alternar el estado de todos los checkboxes basados en el estado del checkbox "Seleccionar todo"
   * @param event Evento de cambio del checkbox "Seleccionar todo"
   */
  alternarTodosLosCheckboxes(event: Event): void {
    const CHECKED = (event.target as HTMLInputElement).checked;
    this.individualCaja.controls.forEach((control) =>
      control.setValue(CHECKED)
    );
    this.setValoresStore(
      this.solicitudForm,
      'commonCaja',
      'setCommonCaja'
    );
  }

  abiertoModelo(datos: string): void {
    this.abiertoModeloDatos = datos;
    this.modalRef = this.modalService.show(this.plantillaDeModelo, { id: 1, class: 'modal-sm' });
  }

  continuar(): void {
    this.continuarEvento.emit('');
  }

}