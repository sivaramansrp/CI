import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import fusionOEscision from 'libs/shared/theme/assets/json/32301/fusionOEscision.json';
import { AlertComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from "@ng-mf/data-access-user";
import { TableComponent } from '@ng-mf/data-access-user';
import { TablePaginationComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { AvisoModifyService } from '../../services/aviso-modify.service';

import { PersonaFusionEscisionDTO } from '../../models/avisomodify.model';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fusion-oescision',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent, TituloComponent, InputRadioComponent, TableComponent, TablePaginationComponent],
  templateUrl: './fusionOEscision.component.html',
})
export class FusionOEscisionComponent implements OnInit {
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
      private Tramite32301Query:Tramite32301Query) {}
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

    initializeForm(){
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
      
      const valor = this.formulario.get('capacidadAlmacenamiento')?.value;
     if(valor == 'fusion2')
     {
      this.fusionradioOptions.pop()
     
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

    mostrarFusionOEscision(){
      const valor = this.formulario.get('numeroTotalCarros')?.value;
    this.divCompletoVisible = valor === '1' || valor === '0';
      this.fusionOescisionTitulo = valor == 1 ? 'Datos de las empresas fusionadas' : 'Datos de las empresas escindidas';
      this.subFusionOescisionTitulo = valor == 1 ? 'Datos de las empresas fusionadas':'Datos de las empresas escindidas';
      this.labelFechaFusionOscision = valor == 1 ? 'Fecha en que surte efecto la fusión' : 'Fecha en que surte efecto la escisión'
      console.log(valor,":eve")
    }
    
    mostrarCertificacionFusionada(ismodel?:string): void {
      // Implement logic to show certification-related sections
      const cantidadBienes = this.formulario.get('cantidadBienes')?.value;
      this.conCertificacionPrincipalVisible = cantidadBienes === '1' ? true : false;
  if(ismodel =='isModel'){
    const modelcantidadBienes = this.modelFormulario.get('mCantidadBienes')?.value;
    this.sinCertificacionPrincipalVisible = modelcantidadBienes === '1' ? true : false ;
  }
      
    }

  
    
    // Removed duplicate initializeForm method

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
                console.log(this.PersonaFusionEscisionDTO)
                this.mpersonaFusionEscisionDTO.patchValue(this.PersonaFusionEscisionDTO)
              })
        
                 
    }

    get personaFusionEscisionDTO(): FormGroup {
      return this.formulario.get('personaFusionEscisionDTO') as FormGroup;
    }
    get mpersonaFusionEscisionDTO(): FormGroup {
      return this.modelFormulario.get('personaFusionEscisionDTO') as FormGroup;
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

    eliminarPersona(): void {
      // this.fusionOEscisionService.eliminarPersona();
      // Placeholder implementation
    }

    abrirModalFusionEscision(): void {

      if (this.ModificarFusionEscisionInstance) {
        this.ModificarFusionEscisionInstance.show();
      }
      // this.fusionOEscisionService.abrirModalFusionEscision();
      // Placeholder implementation
    }

    abrirModalModificarFusionEscision(): void {

      // this.fusionOEscisionService.abrirModalModificarFusionEscision();
      // Placeholder implementation
    }
    closeFusionEscisionModal(){
      if (this.ModificarFusionEscisionInstance) {
        this.ModificarFusionEscisionInstance.hide();
        this.Tramite32301Query.selectpersonaFusionEscisionDTO$
        .pipe(takeUntil(this.destroy$))
        .subscribe(state => {
          this.PersonaFusionEscisionDTO = state as unknown as PersonaFusionEscisionDTO;
          console.log(state)
          // const tbodyData = { tbodyData: }
          //this.gridFusionEscisionData = tbodyData
          const newDatu = Object.values(state)
          const tbodyData = { tbodyData: newDatu.map(String) }
          this.gridFusionEscisionData.pop()
          this.gridFusionEscisionData.push(tbodyData)
          console.log(this.gridFusionEscisionData)
        })
      }
    }
    closeCorrectamenteModel(){
      if (this.correctamenteModelInstance) {
        this.correctamenteModelInstance.hide();
      }
    }
    openCorrectamenteModel(){
      if (this.correctamenteModelInstance) {
        this.correctamenteModelInstance.show();
      }
    }
    

}
