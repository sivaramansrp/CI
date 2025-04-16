import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from "@ng-mf/data-access-user";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModificacionGoceInmueble, TableDataNgTable } from '../../models/avisomodify.model';
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
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputRadioComponent, AlertComponent, TableComponent, CatalogoSelectComponent],
  templateUrl: './modificacionGoceInmueble.component.html',
})
export class ModificacionGoceInmuebleComponent implements OnInit, AfterViewInit, OnDestroy {
  modificacionGoceForm!: FormGroup;
  radioOptions = [
    {
      "label": "Domicilio nuevo",
      "value": "DomicilioNuevo"
    },
    {
      "label": "Modificar domicilio",
      "value": "ModificarDomicilio"
    }

  ];
  messageNac = `En caso de modificar las partes contratantes en la documentación con la que acreditó el legal uso y goce del domicilio, se tendrá que incluir un escrito libre en el apartado de Anexar requisitos, mediante el tipo de documento "Otros" que detalle los cambios realizados.`

  mostrarGridNuevo: boolean = false;
  mostrarGridModificado: boolean = false;

  ModificarModelInstance!: Modal;
  ModificarRecordModelInstance!: Modal;
  modalDomiciliosInmuebleNuevoInstance!: Modal

  public gridDomiciliosModificados!: TableData;

  public gridMostrarGridModificado: { tableHeader: string[]; tableBody: string[] } | undefined;



  tableHeader: string[] = [];
  tableBody: TableBodyItem[] = [];

  gridDomiciliosModificadosHeader:string[] = [];

  mostrarGridNuevoHeader = [
    'idInmueble', 'Domicilio', 'Código Postal', 'Entidad federativa', 'cveEntidad', 'Alcaldía o Municipio', 'cveMunicipio', 'Tipo de Documento con el que se acredita el uso y goce', 'cveTipoDoc', 'Fecha inicio de vigencia', 'Fecha fin vigencia', 'Observaciones'
  ]
  modificacionPartesHeader = ['RFC', 'Nombre', 'Carácter de']
  modificacionPartesData: { tbodyData: string[] }[] = [{ tbodyData: [], },];
  fraccionArancelariaData = [
    {
      "id": 1,
      "descripcion": "ENSENADA"
    }
  ]
  cveTipoDocData = [
    {
      "id": 1,
      "descripcion": "contrato de compra"
    }
  ]

  gridDomiciliosModificadosData: { tbodyData: string[] }[] = [{ tbodyData: [], },];

  mostrarGridNuevoHeaderData: { tbodyData: string[] }[] = [{ tbodyData: [], },];

  entidadFederativa!: Catalogo[];

  fraccionArancelaria: Catalogo[] = this.fraccionArancelariaData;

  cveTipoDoc: Catalogo[] = this.cveTipoDocData;

  @ViewChild('ModificarModel', { static: false }) ModificarModel!: ElementRef;
  @ViewChild('ModificarRecordModel', { static: false }) ModificarRecordModel!: ElementRef;
  @ViewChild('modalDomiciliosInmuebleNuevo', { static: false }) modalDomiciliosInmuebleNuevo!: ElementRef;

  direccionGrid!: FormGroup;

  modificacionPartes: Array<{ rfc: string; nombre: string; caracter: string }> = [];

  private destroy$: Subject<void> = new Subject<void>();

  modificacionGoceInmueble!: ModificacionGoceInmueble;

  constructor(private fb: FormBuilder,
    private AvisoModifyService: AvisoModifyService,
    private store: Tramite32301Store,
    private Tramite32301Query: Tramite32301Query
  ) {
    // Initialize the form here if needed
    this.getGridDomiciliosModificados()
  }
  ngOnInit(): void {
    this.modificacionGoceForm = this.fb.group({
      ideGenerica2: ['', Validators.required]
    });

    this.initializeForm();
    this.getEntidadFederativa();
    this.getGridMostrarGridModificado()
  }
  getEntidadFederativa(): void {
    this.AvisoModifyService
      .getEntidadFederativa()
      .subscribe((resp) => {
        this.entidadFederativa = Object.assign([], resp);
      });
  }
  getGridDomiciliosModificados(): void {
    this.AvisoModifyService
      .getGridDomiciliosModificados()
      .subscribe((res:TableDataNgTable) => {
        this.gridDomiciliosModificadosHeader = res.tableHeader;
        this.gridDomiciliosModificadosData = res.tableBody;
      });
  }
  getGridMostrarGridModificado(): void {
    this.AvisoModifyService
      .getGridMostrarGridModificado()
      .subscribe((resp:TableDataNgTable) => {
        this.mostrarGridNuevoHeader = resp.tableHeader;
       this.mostrarGridNuevoHeaderData = resp.tableBody

      });
  }

  ngAfterViewInit(): void {
    if (this.ModificarModel?.nativeElement) {
      this.ModificarModelInstance = new Modal(this.ModificarModel.nativeElement);
    }
    if (this.ModificarRecordModel?.nativeElement) {
      this.ModificarRecordModelInstance = new Modal(this.ModificarRecordModel.nativeElement);
    }

    if (this.modalDomiciliosInmuebleNuevo?.nativeElement) {
      this.modalDomiciliosInmuebleNuevoInstance = new Modal(this.modalDomiciliosInmuebleNuevo.nativeElement);
    }


  }
  private initializeForm(): void {
    this.direccionGrid = this.fb.group({
      idAviInmueble: [''],
      direccion: ['', [Validators.required, Validators.maxLength(250)]],
      codigoPostal: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^\d{5}$/)]],
      cveEntidad: ['', Validators.required],
      cveMunicipio: ['', Validators.required],
      cveTipoDoc: ['', Validators.required],
      fechaInicioAnterior: ['', Validators.required],
      fechaFinAnterior: ['', Validators.required],
      fechaInicioActual: ['', Validators.required],
      fechaFinActual: ['', Validators.required],
      rfcPartesC: ['', [Validators.required, Validators.maxLength(13), Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/)]],
      rfcPartesCons: [{ value: '', disabled: true }],
      nombrePartesCons: [{ value: '', disabled: true }],
      caracterDeCons: ['', [Validators.required, Validators.maxLength(30)]],
      observaciones: ['', [Validators.maxLength(500)]]
    });
  }
  verificaRadioTipoSem(): void {
    const VALOR = this.modificacionGoceForm.get('ideGenerica2')?.value;
    this.openModificarModel();
    if (VALOR === 'ModificarDomicilio') {
      this.openModificarModel();
      this.mostrarGridNuevo = false;
      this.mostrarGridModificado = true;
      // No 'required' class manipulation needed as Angular handles form validations
    } else if (VALOR === 'DomicilioNuevo') {

      this.mostrarGridNuevo = true;
      this.mostrarGridModificado = false;
      // No 'required' class manipulation needed as Angular handles form validations
    } else {
      this.mostrarGridNuevo = false;
      this.mostrarGridModificado = false;
    }
  }

  abrirModalDomiciliosNvo(): void {
    this.openModalDomiciliosInmuebleNuevoModel()
  }

  cargarDatosRfcPartesC(): void {
    const RFC_PARTES_C = this.direccionGrid.get('rfcPartesC')?.value;
    this.direccionGrid.patchValue({
      rfcPartesCons: RFC_PARTES_C,
      nombrePartesCons: "EuroFoods De Maxico Gonza",
    });
  }
  limpiaCamposParteC(): void {
    this.direccionGrid.patchValue({
      rfcPartesC: '',
      rfcPartesCons: '',
      nombrePartesCons: '',
      caracterDeCons: ''
    });
  }
  agregarParteC(): void {
    const NUEVO_PARTE = {
      rfc: this.direccionGrid.get('rfcPartesCons')?.value,
      nombre: this.direccionGrid.get('nombrePartesCons')?.value,
      caracter: this.direccionGrid.get('caracterDeCons')?.value
    };
    if (NUEVO_PARTE.rfc && NUEVO_PARTE.nombre && NUEVO_PARTE.caracter) {
      this.modificacionPartes = [...Object.values(NUEVO_PARTE)]
      this.modificacionPartesData[0].tbodyData.push(...Object.values(NUEVO_PARTE))
      this.limpiaCamposParteC();
    } else {
      // Handle validation errors, possibly display a message to the user
    }
  }
  eliminarParteC(): void {
    if (this.modificacionPartes.length > 0) {
      this.modificacionPartesData[0].tbodyData.pop();
    }
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  getValorStore(): void {
    this.Tramite32301Query.selectModificacionGoceInmueble$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.modificacionGoceInmueble = state as unknown as ModificacionGoceInmueble;
        const NEW_DATU = Object.values(this.modificacionGoceInmueble)
        const TBODY_DATA = { tbodyData: NEW_DATU.map(String) }
        this.mostrarGridNuevoHeaderData.push(TBODY_DATA)
      });

  }


  guardarDomInmuebleNvo(): void {
    this.store.setModificacionGoceInmueble(this.direccionGrid.value);
    // selectModificacionGoceInmueble
    this.Tramite32301Query.select()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    if (this.direccionGrid.valid) {
      // this.store.setModificacionGoceInmueble(this.direccionGrid.value);
    } else {
      this.direccionGrid.markAllAsTouched();
    }
    this.closeModalDomiciliosInmuebleNuevoModel();
  }

  cerrarDialogoDomInmuebleNvo(): void {
    this.closeModalDomiciliosInmuebleNuevoModel();
  }
  openModificarModel(): void {
    if (this.ModificarModelInstance) {
      this.ModificarModelInstance.show();
    }
  }
  openModalDomiciliosInmuebleNuevoModel(): void {
    if (this.modalDomiciliosInmuebleNuevoInstance) {
      this.modalDomiciliosInmuebleNuevoInstance.show();
    }
  }
  closeModalDomiciliosInmuebleNuevoModel(): void {
    if (this.modalDomiciliosInmuebleNuevoInstance) {
      this.modalDomiciliosInmuebleNuevoInstance.hide();
      this.getValorStore();
    }
  }

  openModificarRecordModel(): void {
    if (this.ModificarRecordModelInstance) {
      this.ModificarRecordModelInstance.show();
    }
  }
  closeModificarModel(): void {
    if (this.ModificarModelInstance) {
      this.ModificarModelInstance.hide();
    }
  }
  closeModificarRecordModel(): void {
    if (this.ModificarRecordModelInstance) {
      this.ModificarRecordModelInstance.hide();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
