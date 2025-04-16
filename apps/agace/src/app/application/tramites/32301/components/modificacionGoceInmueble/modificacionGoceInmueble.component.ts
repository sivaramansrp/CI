import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TableComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ModificacionGoceInmueble,
  TableDataNgTable,
} from '../../models/avisomodify.model';
import { Subject, takeUntil } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
interface TableData {
  tableHeader: string[];
  tableBody: TableBodyItem[];
}
interface TableBodyItem {
  tbodyData: string[];
}
@Component({
  selector: 'app-modificacion-goce-inmueble',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    AlertComponent,
    TableComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './modificacionGoceInmueble.component.html',
})
export class ModificacionGoceInmuebleComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /** Formulario reactivo para la modificación del goce de inmueble */
  modificacionGoceForm!: FormGroup;

  /** Opciones para los radios de selección: "Domicilio nuevo" o "Modificar domicilio" */
  radioOptions = [
    {
      label: 'Domicilio nuevo',
      value: 'DomicilioNuevo',
    },
    {
      label: 'Modificar domicilio',
      value: 'ModificarDomicilio',
    },
  ];

  /** Mensaje de información para la modificación de partes contratantes */
  messageNac = `En caso de modificar las partes contratantes en la documentación con la que acreditó el legal uso y goce del domicilio, se tendrá que incluir un escrito libre en el apartado de Anexar requisitos, mediante el tipo de documento "Otros" que detalle los cambios realizados.`;

  /** Bandera para mostrar el grid de domicilios nuevos */
  mostrarGridNuevo: boolean = false;

  /** Bandera para mostrar el grid de domicilios modificados */
  mostrarGridModificado: boolean = false;

  /** Instancia del modal para modificar domicilio */
  ModificarModelInstance!: Modal;

  /** Instancia del modal para modificar registro de domicilio */
  ModificarRecordModelInstance!: Modal;

  /** Instancia del modal para el domicilio nuevo */
  modalDomiciliosInmuebleNuevoInstance!: Modal;

  /** Datos de la tabla de domicilios modificados */
  public gridDomiciliosModificados!: TableData;

  /** Encabezados y cuerpo de la tabla a mostrar en el grid modificado */
  public gridMostrarGridModificado:
    | { tableHeader: string[]; tableBody: string[] }
    | undefined;

  /** Encabezado de la tabla */
  tableHeader: string[] = [];

  /** Cuerpo de la tabla */
  tableBody: TableBodyItem[] = [];

  /** Encabezado para los domicilios modificados */
  gridDomiciliosModificadosHeader: string[] = [];

  /** Encabezado de la tabla de domicilios nuevos */
  mostrarGridNuevoHeader = [
    'idInmueble',
    'Domicilio',
    'Código Postal',
    'Entidad federativa',
    'cveEntidad',
    'Alcaldía o Municipio',
    'cveMunicipio',
    'Tipo de Documento con el que se acredita el uso y goce',
    'cveTipoDoc',
    'Fecha inicio de vigencia',
    'Fecha fin vigencia',
    'Observaciones',
  ];

  /** Encabezado de la tabla de partes modificadas */
  modificacionPartesHeader = ['RFC', 'Nombre', 'Carácter de'];

  /** Datos de las partes modificadas */
  modificacionPartesData: { tbodyData: string[] }[] = [{ tbodyData: [] }];

  /** Datos de las fracciones arancelarias */
  fraccionArancelariaData = [
    {
      id: 1,
      descripcion: 'ENSENADA',
    },
  ];

  /** Datos de los tipos de documento */
  cveTipoDocData = [
    {
      id: 1,
      descripcion: 'contrato de compra',
    },
  ];

  /** Datos de la tabla de domicilios modificados */
  gridDomiciliosModificadosData: { tbodyData: string[] }[] = [
    { tbodyData: [] },
  ];

  /** Datos para mostrar en la tabla de domicilios nuevos */
  mostrarGridNuevoHeaderData: { tbodyData: string[] }[] = [{ tbodyData: [] }];

  /** Catálogo de entidades federativas */
  entidadFederativa!: Catalogo[];

  /** Datos de las fracciones arancelarias */
  fraccionArancelaria: Catalogo[] = this.fraccionArancelariaData;

  /** Datos de los tipos de documento */
  cveTipoDoc: Catalogo[] = this.cveTipoDocData;

  /** Referencia al modal de modificar */
  @ViewChild('ModificarModel', { static: false }) ModificarModel!: ElementRef;

  /** Referencia al modal de modificar registro */
  @ViewChild('ModificarRecordModel', { static: false })
  ModificarRecordModel!: ElementRef;

  /** Referencia al modal de domicilio nuevo */
  @ViewChild('modalDomiciliosInmuebleNuevo', { static: false })
  modalDomiciliosInmuebleNuevo!: ElementRef;

  /** Formulario para manejar la dirección del inmueble */
  direccionGrid!: FormGroup;

  /** Lista de partes contratantes modificadas */
  modificacionPartes: Array<{ rfc: string; nombre: string; caracter: string }> =
    [];

  /** Sujeto para manejar la destrucción del componente */
  public destroy$: Subject<void> = new Subject<void>();

  /** Objeto que maneja el modelo de modificación del goce del inmueble */
  modificacionGoceInmueble!: ModificacionGoceInmueble;

  constructor(
    private fb: FormBuilder,
    private AvisoModifyService: AvisoModifyService,
    private store: Tramite32301Store,
    private Tramite32301Query: Tramite32301Query
  ) {
    // Inicializa el formulario si es necesario
    this.getGridDomiciliosModificados(); // Obtiene los domicilios modificados al iniciar el componente
  }

  ngOnInit(): void {
    // Inicializa el formulario reactivo
    this.modificacionGoceForm = this.fb.group({
      ideGenerica2: ['', Validators.required], // Campo obligatorio para la selección de tipo de modificación
    });

    this.initializeForm(); // Inicializa el formulario para la dirección
    this.getEntidadFederativa(); // Obtiene el catálogo de entidades federativas
    this.getGridMostrarGridModificado(); // Obtiene los datos de la tabla de domicilios modificados
  }

  /** Método para obtener las entidades federativas del servicio */
  getEntidadFederativa(): void {
    this.AvisoModifyService.getEntidadFederativa().subscribe((resp) => {
      this.entidadFederativa = Object.assign([], resp); // Asigna los datos al catálogo de entidades federativas
    });
  }

  /** Método para obtener los domicilios modificados del servicio */
  getGridDomiciliosModificados(): void {
    this.AvisoModifyService.getGridDomiciliosModificados().subscribe(
      (res: TableDataNgTable) => {
        this.gridDomiciliosModificadosHeader = res.tableHeader; // Asigna los encabezados de la tabla
        this.gridDomiciliosModificadosData = res.tableBody; // Asigna los datos de la tabla
      }
    );
  }

  /** Método para obtener los datos de la tabla que se muestra para la modificación */
  getGridMostrarGridModificado(): void {
    this.AvisoModifyService.getGridMostrarGridModificado().subscribe(
      (resp: TableDataNgTable) => {
        this.mostrarGridNuevoHeader = resp.tableHeader; // Asigna los encabezados para los domicilios nuevos
        this.mostrarGridNuevoHeaderData = resp.tableBody; // Asigna los datos de la tabla para domicilios nuevos
      }
    );
  }

  /** Inicializa las instancias de los modales después de que la vista está completamente cargada */
  ngAfterViewInit(): void {
    if (this.ModificarModel?.nativeElement) {
      this.ModificarModelInstance = new Modal(
        this.ModificarModel.nativeElement
      );
    }
    if (this.ModificarRecordModel?.nativeElement) {
      this.ModificarRecordModelInstance = new Modal(
        this.ModificarRecordModel.nativeElement
      );
    }

    if (this.modalDomiciliosInmuebleNuevo?.nativeElement) {
      this.modalDomiciliosInmuebleNuevoInstance = new Modal(
        this.modalDomiciliosInmuebleNuevo.nativeElement
      );
    }
  }

  /** Método para inicializar el formulario de dirección */
  private initializeForm(): void {
    this.direccionGrid = this.fb.group({
      idAviInmueble: [''],
      direccion: ['', [Validators.required, Validators.maxLength(250)]],
      codigoPostal: [
        '',
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(/^\d{5}$/),
        ],
      ],
      cveEntidad: ['', Validators.required],
      cveMunicipio: ['', Validators.required],
      cveTipoDoc: ['', Validators.required],
      fechaInicioAnterior: ['', Validators.required],
      fechaFinAnterior: ['', Validators.required],
      fechaInicioActual: ['', Validators.required],
      fechaFinActual: ['', Validators.required],
      rfcPartesC: [
        '',
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/),
        ],
      ],
      rfcPartesCons: [{ value: '', disabled: true }],
      nombrePartesCons: [{ value: '', disabled: true }],
      caracterDeCons: ['', [Validators.required, Validators.maxLength(30)]],
      observaciones: ['', [Validators.maxLength(500)]],
    });
  }

  /** Verifica el tipo de modificación seleccionada en el radio y muestra el modal correspondiente */
  verificaRadioTipoSem(): void {
    const VALOR = this.modificacionGoceForm.get('ideGenerica2')?.value;
    this.openModificarModel();
    if (VALOR === 'ModificarDomicilio') {
      this.openModificarModel();
      this.mostrarGridNuevo = false;
      this.mostrarGridModificado = true;
    } else if (VALOR === 'DomicilioNuevo') {
      this.mostrarGridNuevo = true;
      this.mostrarGridModificado = false;
    } else {
      this.mostrarGridNuevo = false;
      this.mostrarGridModificado = false;
    }
  }

  /** Abre el modal para agregar un domicilio nuevo */
  abrirModalDomiciliosNvo(): void {
    this.openModalDomiciliosInmuebleNuevoModel();
  }

  /** Carga los datos del RFC de las partes contratantes */
  cargarDatosRfcPartesC(): void {
    const RFC_PARTES_C = this.direccionGrid.get('rfcPartesC')?.value;
    this.direccionGrid.patchValue({
      rfcPartesCons: RFC_PARTES_C,
      nombrePartesCons: 'EuroFoods De Maxico Gonza',
    });
  }

  /** Limpia los campos relacionados con las partes contratantes */
  limpiaCamposParteC(): void {
    this.direccionGrid.patchValue({
      rfcPartesC: '',
      rfcPartesCons: '',
      nombrePartesCons: '',
      caracterDeCons: '',
    });
  }

  /** Agrega una nueva parte contratante a la lista */
  agregarParteC(): void {
    const NUEVO_PARTE = {
      rfc: this.direccionGrid.get('rfcPartesCons')?.value,
      nombre: this.direccionGrid.get('nombrePartesCons')?.value,
      caracter: this.direccionGrid.get('caracterDeCons')?.value,
    };
    if (NUEVO_PARTE.rfc && NUEVO_PARTE.nombre && NUEVO_PARTE.caracter) {
      this.modificacionPartes = [...Object.values(NUEVO_PARTE)];
      this.modificacionPartesData[0].tbodyData.push(
        ...Object.values(NUEVO_PARTE)
      );
      this.limpiaCamposParteC(); // Limpia los campos después de agregar la parte contratante
    } else {
      // Manejar posibles errores de validación, tal vez mostrar un mensaje de error
    }
  }

  /** Elimina la última parte contratante de la lista */
  eliminarParteC(): void {
    if (this.modificacionPartes.length > 0) {
      this.modificacionPartesData[0].tbodyData.pop();
    }
  }

  /** Método para establecer los valores en el store */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR); // Llama al método correspondiente en el store
  }

  /** Método para obtener los valores del store y actualizar la vista */
  getValorStore(): void {
    this.Tramite32301Query.selectModificacionGoceInmueble$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.modificacionGoceInmueble =
          state as unknown as ModificacionGoceInmueble;
        const NEW_DATU = Object.values(this.modificacionGoceInmueble);
        const TBODY_DATA = { tbodyData: NEW_DATU.map(String) };
        this.mostrarGridNuevoHeaderData.push(TBODY_DATA);
      });
  }

  /** Guarda los datos del domicilio nuevo en el store */
  guardarDomInmuebleNvo(): void {
    this.store.setModificacionGoceInmueble(this.direccionGrid.value); // Guarda los datos en el store
    this.Tramite32301Query.select().pipe(takeUntil(this.destroy$)).subscribe();
    if (this.direccionGrid.valid) {
      // this.store.setModificacionGoceInmueble(this.direccionGrid.value);
    } else {
      this.direccionGrid.markAllAsTouched(); // Marca todos los campos como tocados si no son válidos
    }
    this.closeModalDomiciliosInmuebleNuevoModel(); // Cierra el modal después de guardar
  }

  /** Cierra el modal del domicilio nuevo */
  cerrarDialogoDomInmuebleNvo(): void {
    this.closeModalDomiciliosInmuebleNuevoModel();
  }

  /** Abre el modal para modificar el domicilio */
  openModificarModel(): void {
    if (this.ModificarModelInstance) {
      this.ModificarModelInstance.show(); // Muestra el modal
    }
  }

  /** Abre el modal de domicilio nuevo */
  openModalDomiciliosInmuebleNuevoModel(): void {
    if (this.modalDomiciliosInmuebleNuevoInstance) {
      this.modalDomiciliosInmuebleNuevoInstance.show();
    }
  }

  /** Cierra el modal de domicilio nuevo */
  closeModalDomiciliosInmuebleNuevoModel(): void {
    if (this.modalDomiciliosInmuebleNuevoInstance) {
      this.modalDomiciliosInmuebleNuevoInstance.hide(); // Oculta el modal
      this.getValorStore(); // Actualiza la vista con los valores del store
    }
  }

  /** Abre el modal para modificar el registro */
  openModificarRecordModel(): void {
    if (this.ModificarRecordModelInstance) {
      this.ModificarRecordModelInstance.show();
    }
  }

  /** Cierra el modal de modificación */
  closeModificarModel(): void {
    if (this.ModificarModelInstance) {
      this.ModificarModelInstance.hide();
    }
  }

  /** Cierra el modal de modificación del registro */
  closeModificarRecordModel(): void {
    if (this.ModificarRecordModelInstance) {
      this.ModificarRecordModelInstance.hide();
    }
  }

  /** Maneja la destrucción del componente y la limpieza de observables */
  ngOnDestroy(): void {
    this.destroy$.next(); // Envía una señal para destruir los observables
    this.destroy$.complete(); // Completa el Subject para evitar memory leaks
  }
}
