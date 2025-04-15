import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

import { AlertComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from "@ng-mf/data-access-user";
import { TableComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, Catalogo } from '@ng-mf/data-access-user';

import { ModificacionGoceInmueble } from '../../models/avisomodify.model';

import gridDomiciliosModificados from 'libs/shared/theme/assets/json/32301/gridDomiciliosModificados.json';
import gridMostrarGridModificado from 'libs/shared/theme/assets/json/32301/gridMostrarGridModificado.json';

import tipoDomicilio from 'libs/shared/theme/assets/json/32301/tipoDomicilio.json';
import entidadFederativa from 'libs/shared/theme/assets/json/31601/entidadFederative.json';

import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modificacion-goce-inmueble',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, TituloComponent, InputRadioComponent, AlertComponent, TableComponent, CatalogoSelectComponent],
  templateUrl: './modificacionGoceInmueble.component.html',
})
export class ModificacionGoceInmuebleComponent implements OnInit {
  modificacionGoceForm!: FormGroup;
  radioOptions = tipoDomicilio;
  messageNac= `En caso de modificar las partes contratantes en la documentación con la que acreditó el legal uso y goce del domicilio, se tendrá que incluir un escrito libre en el apartado de Anexar requisitos, mediante el tipo de documento "Otros" que detalle los cambios realizados.`

  mostrarGridNuevo: boolean = false;
  mostrarGridModificado: boolean = false;
  
  ModificarModelInstance!: Modal;
  ModificarRecordModelInstance!: Modal;
  modalDomiciliosInmuebleNuevoInstance!:Modal

  public gridDomiciliosModificados = gridDomiciliosModificados

  public gridMostrarGridModificado = gridMostrarGridModificado

  gridDomiciliosModificadosHeader = [
    'Numero de aviso', 
    'Fecha de aviso',
    'Domicilio',
    'En su carácter de',
    'Código Postal',
 'Entidad federativa', 
  ];
  mostrarGridNuevoHeader=[
   'idInmueble', 'Domicilio','Código Postal','Entidad federativa','cveEntidad', 'Alcaldía o Municipio','cveMunicipio','Tipo de Documento con el que se acredita el uso y goce','cveTipoDoc', 'Fecha inicio de vigencia','Fecha fin vigencia', 'Observaciones'
  ]
  modificacionPartesHeader = ['RFC', 'Nombre', 'Carácter de']
  modificacionPartesData:{ tbodyData: string[] }[] = [{ tbodyData: [],},];
  fraccionArancelariaData =[
    {
      "id": 1,
      "descripcion": "ENSENADA"
    }
  ]
  cveTipoDocData =[
    {
      "id": 1,
      "descripcion": "contrato de compra"
    }
  ]
   
  gridDomiciliosModificadosData:{ tbodyData: string[] }[] = [{ tbodyData: [],},];
  
  mostrarGridNuevoHeaderData:{ tbodyData: string[] }[] = [{ tbodyData: [],},];

  entidadFederativa: Catalogo[] = entidadFederativa;

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
    private store: Tramite32301Store,
    private Tramite32301Query:Tramite32301Query
  ) {}
  ngOnInit(): void {
    this.modificacionGoceForm = this.fb.group({
      ideGenerica2: ['', Validators.required]
    });

    this.initializeForm();
    this.getgridDomiciliosModificados();
    this.getgridMostrarGridModificado();
  }

  public getgridDomiciliosModificados() {
    this.gridDomiciliosModificadosHeader = this.gridDomiciliosModificados.tableHeader;
    this.gridDomiciliosModificadosData = this.gridDomiciliosModificados.tableBody;
  }
  public getgridMostrarGridModificado(){
    this.mostrarGridNuevoHeader = this.gridMostrarGridModificado.tableHeader;
    this.mostrarGridNuevoHeaderData = this.gridMostrarGridModificado.tableBody;

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
    const valor = this.modificacionGoceForm.get('ideGenerica2')?.value;
    this.openModificarModel();
    if (valor === 'ModificarDomicilio') {
      this.openModificarModel();
      this.mostrarGridNuevo = false;
      this.mostrarGridModificado = true;
      // No 'required' class manipulation needed as Angular handles form validations
    } else if (valor === 'DomicilioNuevo') {
     
      this.mostrarGridNuevo = true;
      this.mostrarGridModificado = false;
      // No 'required' class manipulation needed as Angular handles form validations
    } else {
      this.mostrarGridNuevo = false;
      this.mostrarGridModificado = false;
    }
  }

  abrirModalDomiciliosNvo(){
    this.openModalDomiciliosInmuebleNuevoModel()
  }

  cargarDatosRfcPartesC(){
    const rfcPartesC = this.direccionGrid.get('rfcPartesC')?.value;
    this.direccionGrid.patchValue({
      rfcPartesCons: rfcPartesC,
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
  agregarParteC(tipo: string): void {
    const nuevoParte = {
      rfc: this.direccionGrid.get('rfcPartesCons')?.value,
      nombre: this.direccionGrid.get('nombrePartesCons')?.value,
      caracter: this.direccionGrid.get('caracterDeCons')?.value
    };
    if (nuevoParte.rfc && nuevoParte.nombre && nuevoParte.caracter) {
      this.modificacionPartes = [...Object.values(nuevoParte)]
      this.modificacionPartesData[0].tbodyData.push(...Object.values(nuevoParte))
      this.limpiaCamposParteC();
    } else {
      // Handle validation errors, possibly display a message to the user
    }
  }
  eliminarParteC(){
    if (this.modificacionPartes.length > 0) {
      this.modificacionPartesData[0].tbodyData.pop();
    }
  }

  setValoresStore(
    form: FormGroup,
    campo: any,
    metodoNombre: keyof Tramite32301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

    getValorStore(){
            this.Tramite32301Query.selectModificacionGoceInmueble$
              .pipe(takeUntil(this.destroy$))
              .subscribe(state => {
              this.modificacionGoceInmueble = state as unknown as ModificacionGoceInmueble;
                const newDatu = Object.values(this.modificacionGoceInmueble)
                const tbodyData = { tbodyData: newDatu.map(String) }
                this.mostrarGridNuevoHeaderData.push(tbodyData)
              });
            
    }
  

  guardarDomInmuebleNvo(){
    console.log('Modificación de domicilio guardada:', this.direccionGrid.value);
    this.store.setModificacionGoceInmueble(this.direccionGrid.value);
    // selectModificacionGoceInmueble
          this.Tramite32301Query.select()
            .pipe(takeUntil(this.destroy$))
            .subscribe(state => {
              console.log(state)
              // this.tipoDevAviso = state as unknown as TipoDevAviso;
             
            });
    if (this.direccionGrid.valid) {
      const formData = this.direccionGrid.value;
      console.log('Modificación de domicilio guardada:', formData);
    } else {
      this.direccionGrid.markAllAsTouched();
    }
    this.closeModalDomiciliosInmuebleNuevoModel();
  }

  cerrarDialogoDomInmuebleNvo(){
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
  closeModificarModel(){
    if (this.ModificarModelInstance) {
      this.ModificarModelInstance.hide();
    }
  }
  closeModificarRecordModel(){
    if (this.ModificarRecordModelInstance) {
      this.ModificarRecordModelInstance.hide();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
