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
  solicitudForm!: FormGroup;
  showAdjuntarArchivo: boolean = false;
  showSeccionAduanaaFecha: boolean = false;
  showSeccionContenedor: boolean = false;
  showSeccionNoManifiesto: boolean = false;
  showCargarArchivoTable: boolean = false;
  showArchivoSeleccionadoTable: boolean = false;
  showSeccionExcel: boolean = false;
  mostrarMensaje: boolean = false;
  mensajeCamposObligatorios: string = '* Campos obligatorios';
  aduanaList: Aduanas[] = [];
  contenedores: Contenedores[] = [];
  requiereGuardadoParcial: boolean = false;
  currentIdx: number = 0;
  @Input() catalogoList: Catalogo[] = [];
  transporteList: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };
  aduana: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };
  // Define the data to be displayed in the dynamic table
  datosTabla = [
    {
      inicialesEquipo: 'BBZM',
      numeroEquipo: 1098765,
      digitoVerificador: 4,
      tipoEquipo: 'AC',
      aduana: 430,
      fechaIngreso: '2024-03-13',
      vigencia: '2025-03-13',
      estadoConstancia: 'Válido',
      existeEnVUCEM: 'Sí',
      idConstancia: 'CONST12345',
      numeroManifiesto: 'MANI67890',
      idSolicitud: 'SOLICITUD001',
      fechaInicio: '2024-03-01',
    },
  ];

  /**
   * Obtener el valor de la instrucción e inicializar la variable
   */
  TEXTOS = TEXTOS;

  /**
   * Estado de la solicitud.
   */
  public solicitud11201State!: Solicitud11201State;

  /**
   * Sujeto para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario principal de la solicitud.
   */
  // checkboxForm!: FormGroup;

  amount: number = 328.5;
  public encabezadoDeTabla: ConfiguracionColumna<DatosDelContenedor>[] = [
    { encabezado: '', clave: (item) => item.id, orden: 1 },
    { encabezado: 'Iniciales del equipo', clave: (item) => item.inicialesEquipo, orden: 1 },
    { encabezado: 'Número de equipo', clave: (item) => item.numeroEquipo, orden: 2 },
    { encabezado: 'Dígito Verificador', clave: (item) => item.digitoVerificador, orden: 3 },
    { encabezado: 'Tipo de equipo', clave: (item) => item.tipoEquipo, orden: 4 },
    { encabezado: 'Aduana', clave: (item) => item.aduana, orden: 5 },
    { encabezado: 'Fecha Ingreso', clave: (item) => item.fechaIngreso, orden: 6 },
    { encabezado: 'Vigencia', clave: (item) => item.vigencia, orden: 7 },
    { encabezado: 'Estado de constancia', clave: (item) => item.estadoConstancia, orden: 8 },
    { encabezado: 'Existe en VUCEM', clave: (item) => item.existeEnVUCEM, orden: 9 },
    { encabezado: 'Id constancia', clave: (item) => item.idConstancia, orden: 10 },
    { encabezado: 'Número manifiesto', clave: (item) => item.numeroManifiesto, orden: 11 },
    { encabezado: 'Id solicitud', clave: (item) => item.idSolicitud, orden: 12 },
    { encabezado: 'echa inicio', clave: (item) => item.fechaInicio, orden: 13 }
  ];
  public datosDelContenedor: DatosDelContenedor[] = [];

  abiertoModeloDatos: string = '';
  modalRef?: BsModalRef | null;
  @ViewChild('plantillademodelo') plantillaDeModelo!: TemplateRef<Element>;
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
    this.initializeForm();
    this.cargarCatalogos();
    this.tabSeleccionado();
    this.fetchgetTransporteList();
    this.fetchAduanaList();
  }

  initializeForm(): void {
    this.solicitudForm = this.fb.group({
      tipoBusqueda: [this.solicitud11201State?.tipoBusqueda, Validators.required],
      aduana: [this.solicitud11201State?.aduana, Validators.required],
      fechaIngreso: [this.solicitud11201State?.fechaIngreso, Validators.required],
      inicialesContenedor: [this.solicitud11201State?.inicialesContenedor, [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9]+$')]],
      numeroContenedor: [this.solicitud11201State?.numeroContenedor, [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      digitoDeControl: [this.solicitud11201State?.digitoDeControl, [Validators.maxLength(1), Validators.pattern('^[0-9]$')]],
      contenedores: [this.solicitud11201State?.contenedores, Validators.required],
      tipoTransporte: ['', Validators.required],
      dropdown: [this.solicitud11201State.dropdown, Validators.required],
      numManifiesto: [
        this.solicitud11201State.numManifiesto,
        [Validators.required, Validators.maxLength(50)],
      ],
      aduanaDropdown: [
        this.solicitud11201State.aduanaDropdown,
        Validators.required,
      ],
      archivoSeleccionado: [this.solicitud11201State?.archivoSeleccionado, Validators.required],
      individualCheckbox: this.fb.array(
        this.solicitud11201State?.individualCheckbox
      ),
      amount: [this.amount, Validators.required],
      fechaDeIngreso: [
        this.solicitud11201State?.fechaDeIngreso,
        Validators.required,
      ],
      commonCheckbox: [this.solicitud11201State?.commonCheckbox],
    });
    this.mostrarCampos();
    this.solicitudForm
      .get('inicialesContenedor')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const SANITIZED = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
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
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const SANITIZED = value.replace(/[^a-zA-Z0-9]/g, '');
          this.solicitudForm
            .get('numeroContenedor')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(this.solicitudForm, 'numeroContenedor', 'setNumeroContenedor');
        }
      });
    this.solicitudForm
      .get('digitoDeControl')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const SANITIZED = value.replace(/[^0-9]/g, '');
          this.solicitudForm
            .get('digitoDeControl')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(this.solicitudForm, 'digitoDeControl', 'setDigitoDeControl');
        }
      });
    // Escuchar cambios en tipoBusqueda para mostrar secciones
    this.solicitudForm.get('tipoBusqueda')?.valueChanges.subscribe(() => {
      this.setValoresStore(this.solicitudForm, 'tipoBusqueda', 'setTipoBusqueda');
      this.mostrarCampos();
    });

    // Escuchar cambios en tipoTransporte
    this.solicitudForm.get('aduana')?.valueChanges.subscribe(() => {
      this.setValoresStore(this.solicitudForm, 'aduana', 'setAduana');
      this.solicitudForm.get('fechaIngreso')?.setValue(moment().format('YYYY-MM-DD'));
      this.setValoresStore(this.solicitudForm, 'fechaIngreso', 'setFechaIngreso');
    });
  }

  /**
   * Obtener el array de checkboxes individuales
   */
  get individualCheckbox(): FormArray {
    return this.solicitudForm.get('individualCheckbox') as FormArray;
  }

  /**
   * Establecer valores en el store del trámite
   * @param form Formulario reactivo
   * @param campo Nombre del campo
   * @param metodoNombre Nombre del método en el store
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite11201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite11201Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  cargarCatalogos(): void {
    // Cargar catálogo de contenedores
    this.datosTramiteService.getContenedores().subscribe(
      (data) => {
        this.contenedores = data.data;
      },
    );
  }

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

  isValid(field: string): boolean {
    const VALIDATIONRESULT = this.validacionesService.isValid(
      this.solicitudForm,
      field
    );
    return VALIDATIONRESULT === null ? false : VALIDATIONRESULT;
  }

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
    const LINES = csv.split('\n');
    const HEADERS = LINES[0].split(',');
    const DATA = LINES.slice(1).map((line) => {
      const VALUES = line.split(',');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const OBJ: any = {};
      HEADERS.forEach((header, index) => {
        OBJ[header.trim()] = VALUES[index]?.trim() || '';
      });
      return OBJ;
    });
    this.datosTabla = DATA;
  }

  enviarManifiesto(): void {
    this.solicitudForm.markAllAsTouched();
    if (
      this.solicitudForm.get('numManifiesto')?.valid &&
      this.solicitudForm.get('dropdown')?.valid
    ) {
      this.mostrarMensaje = true;
    }
  }

  esPago(): void {
    if (this.solicitudForm.valid) {
      // Implementar lógica de pago y envío del formulario
      this.datosTramiteService.submitSolicitud().subscribe(
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
      // Implementar lógica para establecer la pestaña activa basada en currentIdx
      // Si se usa una librería de pestañas, establecer el índice activo según corresponda
    }
  }

  cancelarRadioButton(): void {
    // Resetear botones de radio y campos relacionados
    this.solicitudForm.get('tipoBusqueda')?.setValue('');
    this.limpiarCampos();
  }

  agregarSolicitud(): void {
    // const SOLICITUDDATA = this.solicitudForm.value;
    this.datosTramiteService.agregarSolicitud().subscribe(
      (response) => {
        // Manejar éxito, posiblemente refrescar la grilla o mostrar mensaje
        if (response?.success) {
          response.datos.id = this.datosDelContenedor.length + 1;
          this.datosDelContenedor.push(response.datos);
          (this.tramite11201Store.setDelContenedor as (value: DatosDelContenedor[]) => void)(this.datosDelContenedor);
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

  private fetchgetTransporteList(): void {
    this.datosTramiteService
      .getTransporteList('transporteList')
      .subscribe((response) => {
        this.catalogoList = response.data;
      });
  }

  private fetchAduanaList(): void {
    this.datosTramiteService
      .getAduanaList('aduanaList')
      .subscribe((response) => {
        this.aduanaList = response.data;
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
      this.individualCheckbox.controls[index].setValue(TARGET.checked);
    }
    this.setValoresStore(
      this.solicitudForm,
      'individualCheckbox',
      'setIndividualCheckbox'
    );
  }

  /**
   * Alternar el estado de todos los checkboxes basados en el estado del checkbox "Seleccionar todo"
   * @param event Evento de cambio del checkbox "Seleccionar todo"
   */
  toggleAllCheckboxes(event: Event): void {
    const CHECKED = (event.target as HTMLInputElement).checked;
    this.individualCheckbox.controls.forEach((control) =>
      control.setValue(CHECKED)
    );
    this.setValoresStore(
      this.solicitudForm,
      'commonCheckbox',
      'setCommonCheckbox'
    );
  }

  abiertoModelo(datos: string): void {
    this.abiertoModeloDatos = datos;
    this.modalRef = this.modalService.show(this.plantillaDeModelo, { id: 1, class: 'modal-sm' });
  }

  continuar(): void {
    this.continuarEvento.emit('');
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}