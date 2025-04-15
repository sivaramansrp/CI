import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertComponent, InputRadioComponent, TableComponent, TablePaginationComponent, TituloComponent } from "@ng-mf/data-access-user";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { PersonaFusionEscisionDTO } from '../../models/avisomodify.model';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import fusionOEscision from 'libs/shared/theme/assets/json/32301/fusionOEscision.json';

@Component({
  selector: 'app-fusion-oescision',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent, TituloComponent, InputRadioComponent, TableComponent, TablePaginationComponent],
  templateUrl: './fusionOEscision.component.html',
})
export class FusionOEscisionComponent implements OnInit, OnDestroy, AfterViewInit {
  formulario!: FormGroup;
  modelFormulario!: FormGroup;
  fusionOescisionTitulo!:string
  subFusionOescisionTitulo!:string
  labelFechaFusionOscision!:string
    radioOptions = fusionOEscision;
    conCertificacionPrincipalVisible: boolean = true;
  sinCertificacionPrincipalVisible: boolean = true;
  ModificarFusionEscisionInstance!:Modal;
  correctamenteModelInstance!:Modal;
  fechasSeleccionadas = []
    fusionradioOptions = [
      {
        "label": "Fusión",
        "value": "1"
      },
      {
        "label": "Escisión",
        "value": "0"
      }
     
    ]
   
    cantidadBienesOption = [
      {
        "label": "Sí",
        "value": '1'
      },
      {
        "label": "No",
        "value": '0'
      }
     
    ]
    gridFusionEscisionHeader = ['Registro Federal de Contribuyentes',
								'Denominaci\u00F3n o Raz\u00F3n Social',
								'Folio VUCEM de la ultima certificaci\u00F3n/renovaci\u00F3n',
								'Fecha de inicio de vigencia de la \u00DAltima certificaci\u00F3n/renovaci\u00F3n',
								'Fecha de fin de vigencia de la \u00DAltima certificaci\u00F3n/renovaci\u00F3n' ]

                gridFusionEscisionData:{ tbodyData: string[] }[] = [{ tbodyData: [],},];
    
                totalItems: number = 0;
                itemsPerPage: number = 1;
                currentPage: number = 1;

                public miembroDeLaEmpresaBodyData: unknown[] = [];
                
                divCompletoVisible: boolean = false;
                modalContent: string = '';

 @ViewChild('ModificarFusionEscisionModel', { static: false }) ModificarFusionEscisionModel!: ElementRef;
 @ViewChild('correctamenteModel', { static: false }) correctamenteModel!: ElementRef;

 PersonaFusionEscisionDTO!:PersonaFusionEscisionDTO
    constructor(private fb: FormBuilder, 
      private AvisoModifyService: AvisoModifyService,
      private store: Tramite32301Store,
      private Tramite32301Query:Tramite32301Query) {
        //constructor
      }
      private destroy$: Subject<void> = new Subject<void>();
    ngOnInit(): void {

      this.initializeForm();
    }

    ngAfterViewInit(): void {
  if (this.ModificarFusionEscisionModel?.nativeElement) {
        this.ModificarFusionEscisionInstance = new Modal(this.ModificarFusionEscisionModel.nativeElement);
      }
      if (this.correctamenteModel?.nativeElement) {
        this.correctamenteModelInstance = new Modal(this.correctamenteModel.nativeElement);
      }

      
    }

    initializeForm():void{
      this.formulario = this.fb.group({
        capacidadAlmacenamiento: [null, Validators.required],
        numeroTotalCarros: [null, Validators.required],
        cantidadBienes: [null, Validators.required],
        fechaInspeccion: [{ value: ''}],
        descripcionClobGenerica2: ['', Validators.required],
        personaFusionEscisionDTO:this.fb.group({
          rfc: [''],
          razonSocial: [{ value: '', disabled: true }],
          numFolioTramite: [{ value: '', disabled: true }],
          fechaInicioVigencia: [{ value: '', disabled: true }],
          fechaFinVigencia: [{ value: '', disabled: true }]
        })
      

      });
      this.modelFormulario = this.fb.group({

        mCantidadBienes: [null, Validators.required],
        personaFusionEscisionDTO:this.fb.group({
        rfc: [''],
        razonSocial: [{ value: '', disabled: true }],
        numFolioTramite: [{ value: '', disabled: true }],
        fechaInicioVigencia: [{ value: '', disabled: true }],
        fechaFinVigencia: [{ value: '', disabled: true }]
        })
      });
      
    }
 
    ocultarEscicion(): void {
      const VALOR = this.formulario.get('capacidadAlmacenamiento')?.value;
     if(VALOR === 'fusion2')
     {
      this.fusionradioOptions.pop();
     }
     else{
      this.fusionradioOptions = [
        {
          "label": "Fusión",
          "value": "1"
        },
        {
          "label": "Escisión",
          "value": "0"
        }
       
      ]
     }
      // Implement logic to hide escision-related sections
      
    }

    mostrarFusionOEscision():void{
      const VALOR = this.formulario.get('numeroTotalCarros')?.value;
    this.divCompletoVisible = VALOR === '1' || VALOR === '0';
      this.fusionOescisionTitulo = VALOR === 1 ? 'Datos de las empresas fusionadas' : 'Datos de las empresas escindidas';
      this.subFusionOescisionTitulo = VALOR === 1 ? 'Datos de las empresas fusionadas':'Datos de las empresas escindidas';
      this.labelFechaFusionOscision = VALOR === 1 ? 'Fecha en que surte efecto la fusión' : 'Fecha en que surte efecto la escisión'
    }
    
    mostrarCertificacionFusionada(ismodel?:string): void {
      // Implement logic to show certification-related sections
      const CANTIDAD_BIENES = this.formulario.get('cantidadBienes')?.value;
      this.conCertificacionPrincipalVisible = CANTIDAD_BIENES === '1' ? true : false;
  if(ismodel ==='isModel'){
    const MODELCANTIDAD_BIENES = this.modelFormulario.get('mCantidadBienes')?.value;
    this.sinCertificacionPrincipalVisible = MODELCANTIDAD_BIENES === '1' ? true : false ;
  }   
  }
    cargarDatosPersonaFusion(): void {
    this.AvisoModifyService
                  .cargarDatosPersonaFusion()
                  .pipe(
                    map((resp) => {
                      this.personaFusionEscisionDTO.patchValue(resp)
                      this.store.SetpersonaFusionEscisionDTO(resp);
                    })
                  ).subscribe();
   
    }
    ModelcargarDatosPersonaFusion():void{
      this.Tramite32301Query.selectpersonaFusionEscisionDTO$
              .pipe(takeUntil(this.destroy$))
              .subscribe(state => {
                this.PersonaFusionEscisionDTO = state as unknown as PersonaFusionEscisionDTO;
                this.mpersonaFusionEscisionDTO.patchValue(this.PersonaFusionEscisionDTO)
              })
    }

    get personaFusionEscisionDTO(): FormGroup {
      return this.formulario.get('personaFusionEscisionDTO') as FormGroup;
    }
    get mpersonaFusionEscisionDTO(): FormGroup {
      return this.modelFormulario.get('personaFusionEscisionDTO') as FormGroup;
    }

    onItemsPerPageChange(itemsPerPage: number): void {
      this.itemsPerPage = itemsPerPage;
      this.currentPage = 1;
      this.updatePagination();
    }
  
    onPageChange(page: number): void {
      this.currentPage = page;
      this.updatePagination();
    }
    updatePagination(): void {
      const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
      this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
        START_INDEX,
        START_INDEX + this.itemsPerPage
      );
    }

    // eliminarPersona(): void {
    //   // this.fusionOEscisionService.eliminarPersona();
    //   // Placeholder implementation
    // }

    abrirModalFusionEscision(): void {

      if (this.ModificarFusionEscisionInstance) {
        this.ModificarFusionEscisionInstance.show();
      }
      // this.fusionOEscisionService.abrirModalFusionEscision();
      // Placeholder implementation
    }

    // abrirModalModificarFusionEscision(): void {

    //   // this.fusionOEscisionService.abrirModalModificarFusionEscision();
    //   // Placeholder implementation
    // }
    closeFusionEscisionModal():void{
      if (this.ModificarFusionEscisionInstance) {
        this.ModificarFusionEscisionInstance.hide();
        this.Tramite32301Query.selectpersonaFusionEscisionDTO$
        .pipe(takeUntil(this.destroy$))
        .subscribe(state => {
          this.PersonaFusionEscisionDTO = state as unknown as PersonaFusionEscisionDTO;
          const NEW_DATU = Object.values(state)
          const TBODY_DATA = { tbodyData: NEW_DATU.map(String) }
          this.gridFusionEscisionData.pop()
          this.gridFusionEscisionData.push(TBODY_DATA)
        })
      }
    }
    closeCorrectamenteModel():void{
      if (this.correctamenteModelInstance) {
        this.correctamenteModelInstance.hide();
      }
    }
    openCorrectamenteModel():void{
      if (this.correctamenteModelInstance) {
        this.correctamenteModelInstance.show();
      }
    }
    
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
