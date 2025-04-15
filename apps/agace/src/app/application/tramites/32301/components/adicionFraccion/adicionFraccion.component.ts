import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

import { AlertComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from "@ng-mf/data-access-user";
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TablePaginationComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, Catalogo, CrosslistComponent } from '@ng-mf/data-access-user';

import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Modal } from 'bootstrap';
import adicianFraccionOption from 'libs/shared/theme/assets/json/32301/adicianFraccionOption.json';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SELECCION } from '../../constantes/importador-exportador.enum';

import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';

@Component({
  selector: 'app-adicion-fraccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent, InputRadioComponent, TableComponent, TablePaginationComponent, CatalogoSelectComponent, CrosslistComponent],
  templateUrl: './adicionFraccion.component.html',
})
export class AdicionFraccionComponent {
  declaracionForm!: FormGroup;
  declaracionFormModel!: FormGroup;
  cargaManualForm!: FormGroup;
  divBtnCargaMVisible: boolean = false;
  messageFraccion: string =  'Deberás adjuntar el listado de fracciones arancelarias señaladas en la descripción de las actividades relacionadas con los procesos productivos o presentación de servicios, exhibido en tu solicitud de inscripción.'
  radioOptions = adicianFraccionOption;
  gridFraccionesHeader = ['Fracción declarada', 'Actividad relacionada', 'Correlación fracción actual', 'Descripción fracción actual', 'NICO', 'Descripción del NICO', 'UMT', 'Pa&iacute;s de origen']

  selectRangoDias: any[] = [];

  botonField = [
    {
      btnNombre: 'Agregar',
      class: 'btn-primary',
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar todo',
      class: 'btn-default',
      funcion: () => this.agregar(SELECCION.SELECT_ALL),
    },
    {
      btnNombre: 'Remover',
      class: 'btn-danger',
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Remover todo',
      class: 'btn-default',
      funcion: () => this.quitar(SELECCION.SELECT_ALL),
    },
  ];
  
  cveNicoModOptions =[
    {
      "id": -1,
      "descripcion": "Selecciona un valor"
    }
  ]
  unidadMedidaModOption =[
    {
      "id": -1,
      "descripcion": "Seleccione"
    },
    {
      "id": 1,
      "descripcion": "Proceso"
    },
    {
      "id": 2,
      "descripcion": "Servicio"
    },
    {
      "id": 3,
      "descripcion": "Ambos"
    }
  ]
  activRelProcModOption =[
    {
      "id": -1,
      "descripcion": "Seleccione"
    },
    {
      "id": 1,
      "descripcion": "Proceso"
    },
    {
      "id": 2,
      "descripcion": "Servicio"
    },
    {
      "id": 3,
      "descripcion": "Ambos"
    }
  ]
  cveFraccionCorrelacionModOption = [
    {
      "id": -1,
      "descripcion": "Selecciona un valor"
    }
  ]
  totalItems: number = 0;
  itemsPerPage: number = 1;
  currentPage: number = 1;

  fechasSeleccionadas: Catalogo[] = [];

  fechasDatos: Catalogo[] = [];

  fecha: FormControl = new FormControl('');

  fechaSeleccionada: FormControl = new FormControl('');
  private subscriptions: Subscription[] = [];
  
  cveNicoMod: Catalogo[] = this.cveNicoModOptions;
  unidadMedidaMod: Catalogo[] = this.unidadMedidaModOption;
  activRelProcMod: Catalogo[] = this.activRelProcModOption;
  cveFraccionCorrelacionMod: Catalogo[] = this.cveFraccionCorrelacionModOption;
  public miembroDeLaEmpresaBodyData: unknown[] = [];

  cargaMasivaFrModalInstance!:Modal;
  CargaMasivaFralertaModelInstance!:Modal;
  fraccionesModelInstance!:Modal;

  @ViewChild('cargaMasivaFrModal', { static: false }) cargaMasivaFrModal!: ElementRef;
  @ViewChild('CargaMasivaFralertaModel', { static: false }) CargaMasivaFralertaModel!: ElementRef;
  @ViewChild('fraccionesModel', { static: false }) fraccionesModel!: ElementRef;

  private destroy$: Subject<void> = new Subject<void>();
  constructor(private fb: FormBuilder, private AvisoModifyService: AvisoModifyService, private store: Tramite32301Store, private query: Tramite32301Query) {
    this.declaracionForm = this.fb.group({
      tipoCarga: [''],
      booleanGenerico: [''],
      descripcionGenerica3: [''],
      idSolicitud: [''],
      labelFraccionesAgregadas: [''],
      idCarga: ['']
    });
  }



  ngOnInit(): void {
 
    this.declaracionFormModel = this.fb.group({
      archivoProceso: [''],
      registrosProcesoCargados: [{ value: '', disabled: true }]
    });
    this.cargaManualForm = this.fb.group({
      txtfraccionDeclCert:['', Validators.required, Validators.maxLength(8)],
      activRelProc:['-1',Validators.required],
      txtDescripcionMercancia:['', Validators.required],
      cveFraccionCorrelacion:['-1',Validators.required],
      unidadMedida:['-1',Validators.required ],
      nico:['',Validators.required],
      txtDescripcionNico:[''],
      sPaisBloqueOrigen:[[], Validators.required],
      sPaisBloqueDestino:[[],Validators.required]
    })
  
    this.subscriptions.push(
      this.query.selectFechasSeleccionadas$.subscribe((fechas) => {
        // this.fechasSeleccionadas = fechas ?? [];
      })
    );
  }
  
  agregar(tipo: string) {
    if (tipo === SELECCION.SELECT_ALL) {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const FECHA_VALOR = this.fecha.value;
      const SELECTEDFECHA = this.fechasDatos.find(
        (fecha) => fecha.id === FECHA_VALOR
      );
      if (SELECTEDFECHA) {
        this.fechasSeleccionadas.push(SELECTEDFECHA);
        this.fechasDatos = this.fechasDatos.filter(
          (fecha) => fecha.id !== FECHA_VALOR
        );
      }
    }
    // this.store.setFechasSeleccionadas(this.fechasSeleccionadas);
  }

  quitar(tipo: string = '') {
    if (tipo === SELECCION.SELECT_ALL) {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const FECHA_VALOR = this.fechaSeleccionada.value;
      const SELECTEDFECHA = this.fechasSeleccionadas.find(
        (fecha) => fecha.id === FECHA_VALOR
      );
      if (SELECTEDFECHA) {
        this.fechasDatos.push(SELECTEDFECHA);
        this.fechasSeleccionadas = this.fechasSeleccionadas.filter(
          (fecha) => fecha.id !== FECHA_VALOR
        );
      }
    }
    // this.store.setFechasSeleccionadas(this.fechasSeleccionadas);
  }

  ngAfterViewInit(): void {
    if (this.cargaMasivaFrModal?.nativeElement) {
          this.cargaMasivaFrModalInstance = new Modal(this.cargaMasivaFrModal.nativeElement);
        }  

        if (this.CargaMasivaFralertaModel?.nativeElement) {
          this.CargaMasivaFralertaModelInstance = new Modal(this.CargaMasivaFralertaModel.nativeElement);
        }  

        if (this.fraccionesModel?.nativeElement) {
          this.fraccionesModelInstance = new Modal(this.fraccionesModel.nativeElement);
        }  


        

        
  }
  

  rango_fechas(): void {
    this.AvisoModifyService.getSelectRangoDias()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data)
        // Actualizamos los valores del formulario con los datos obtenidos
        this.selectRangoDias = data;
      });
  }

  valorSeleccionadoTipoCarga(): void {
    const selectedValue = this.declaracionForm.get('idCarga')?.value;
    console.log('Valor seleccionado:', selectedValue);
    if (selectedValue === 'TIPCAR.MA') {
      this.divBtnCargaMVisible = false;
    }
    else if (selectedValue === 'TIPCAR.CM'){
      this.divBtnCargaMVisible = true;
    }
    // if (selectedValue === 'TIPCAR.MA') {
    //   this.divBtnCargaMVisible = false;
    //   this.gridManualVisible = true;
    //   this.gridMasivaVisible = false;
    // } else if (selectedValue === 'TIPCAR.CM') {
    //   this.divBtnCargaMVisible = true;
    //   this.gridManualVisible = false;
    //   this.gridMasivaVisible = true;
    // }
  }
  onItemsPerPageChange(itemsPerPage: any): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  onPageChange(page: any): void {
    this.currentPage = page;
    this.updatePagination();
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  vistaPreviaArchivoFraccionAjax(): void {
    // Implement the logic to view the preview of the fraction file
    // Currently commented out as per instructions
    // this.adicionFraccionService.viewPreviaArchivoFraccion();
  }

  eliminarFracciones(): void {
    // Implement the logic to delete fractions
    // Currently commented out as per instructions
    // this.adicionFraccionService.eliminarFracciones();
  }

  modificarFracciones(): void {
    // Implement the logic to modify fractions
    // Currently commented out as per instructions
    // this.adicionFraccionService.modificarFracciones();
  }

  modalAgregaCarga(): void {
    this.openfraccionesModelModel();
    // Implement the logic to open the modal to add a fraction
    // Currently commented out as per instructions
    // this.adicionFraccionService.openAgregaCargaModal();
  }
   abrirModalCargaMasivaFr(): void {
    this.openCargaMasivaFrModal();
  }

  cargarArchivoProcesosAjax(): void {
    this.openCargaMasivaFralertaModel()
    // TODO: Implementar la funcionalidad de cargarArchivoProcesosAjax
    // this.adicionProcesosService.cargarArchivo(this.form.get('archivoProceso')?.value).subscribe(
    //   response => {
    //     // Manejar éxito
    //   },
    //   error => {
    //     // Manejar error
    //   }
    // );
  }

  vistaPreviaArchivoProcesosAjax(): void {
    // TODO: Implementar la funcionalidad de vistaPreviaArchivoProcesosAjax
    // this.adicionProcesosService.vistaPrevia(this.form.get('archivoProceso')?.value).subscribe(
    //   response => {
    //     // Manejar éxito
    //   },
    //   error => {
    //     // Manejar error
    //   }
    // );
  }


  openCargaMasivaFrModal(){
    if (this.cargaMasivaFrModalInstance) {
      this.cargaMasivaFrModalInstance.show();
    }
  }

  closeCargaMasivaFrModal(){
    if (this.cargaMasivaFrModalInstance) {
      this.cargaMasivaFrModalInstance.hide();
    }
  }

  openCargaMasivaFralertaModel(){
    if (this.CargaMasivaFralertaModelInstance) {
      this.CargaMasivaFralertaModelInstance.show();
    }
  }

  closeCargaMasivaFralertaModel(){
    if (this.CargaMasivaFralertaModelInstance) {
      this.CargaMasivaFralertaModelInstance.hide();
    }
  }

  openfraccionesModelModel(){
    if (this.fraccionesModelInstance) {
      this.fraccionesModelInstance.show();
      this.rango_fechas();
    }
  }

  closefraccionesModelModel(){
    console.log(this.cargaManualForm.value)
    if (this.fraccionesModelInstance) {
      this.fraccionesModelInstance.hide();
    }
  }

}
