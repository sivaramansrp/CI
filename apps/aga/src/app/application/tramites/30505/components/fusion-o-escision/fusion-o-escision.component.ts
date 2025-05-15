// fusion-o-escision.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { InputRadioComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FUSION_CONFIGURATION_TABLA, FusionEscision, TABLE_ID } from '../../models/aviso-modificacion.model'
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { AVISO_RADIO, FUSION_ESCISION_RADIO, SI_NO_RADIO } from '../../enums/aviso-de-modificacion.enum';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud30505Store,Solicitud30505State } from '../../estados/tramites30505.store';
import { Solicitud30505Query } from '../../estados/tramites30505.query';
// import { FusionOEscisionService } from 'path-to-service'; // Commented out as per instructions

@Component({
  selector: 'app-fusion-o-escision',
  templateUrl: './fusion-o-escision.component.html',
  styleUrl:'./fusion-o-escision.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TablaDinamicaComponent,TituloComponent,InputRadioComponent],
  // providers: [FusionOEscisionService] // Commented out as per instructions
})
export class FusionOEscisionComponent implements OnInit {
  // Reactive Form Group
  formulario!: FormGroup;

  // Visibility controls
  dvMessageVisible: boolean = false;
  divCompletoVisible: boolean = false;
  conCertificacionPrincipalVisible: boolean = false;
  sinCertificacionPrincipalVisible: boolean = false;
  
  // Data for the grid
  gridFusionEscisionData: FusionEscision[] = [];

  FUSION_CONFIGURATION_TABLA = FUSION_CONFIGURATION_TABLA;

  TablaSeleccion = TablaSeleccion;

  TableId:string = TABLE_ID;

  radioOpciones = AVISO_RADIO;

  fusionEscisionOpciones = FUSION_ESCISION_RADIO;

  fusionadaOpciones = SI_NO_RADIO;

  public destroyNotifier$: Subject<void> = new Subject();
  
  public AvisoState!: Solicitud30505State;

  constructor(private fb: FormBuilder,private router:Router,private route:ActivatedRoute,private tercerosService: TercerosRelacionadosService,public tramiteStore:Solicitud30505Store,public tramiteQuery:Solicitud30505Query) {
    // Initialize the reactive form with flat FormControls to match the template's formControlName usage
    
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario():void{
    this.tramiteQuery.selectSolicitud$
            .pipe(
              takeUntil(this.destroyNotifier$),
              map((seccionState) => {
                this.AvisoState = seccionState;
              })
            )
            .subscribe()
            
  this.formulario = this.fb.group({
      'capacidadAlmacenamiento': [this.AvisoState?.capacidadAlmacenamiento2, Validators.required],
      'numeroTotalCarros': [this.AvisoState?.numeroTotalCarros, Validators.required],
      'cantidadBienes': [this.AvisoState?.cantidadBienes, Validators.required],
      'fechaInspeccion': [this.AvisoState?.fechaInspeccion, Validators.required],
      'descripcionClobGenerica2': [this.AvisoState?.descripcionClobGenerica2, Validators.required],
      'rfc': [this.AvisoState?.rfcIdc, Validators.required],
      'razonSocial': [{ value: this.AvisoState?.razonSocial,disabled:true}, Validators.required],
      'razonSocialSC':[this.AvisoState?.razonSocialSC, Validators.required],
      'numFolioTramite': [{ value: this.AvisoState?.numFolioTramite, disabled: true }, Validators.required],
      'fechaInicioVigencia': [{ value: this.AvisoState?.fechaInicioVigencia, disabled: true }, Validators.required],
      'fechaFinVigencia': [{ value: this.AvisoState?.fechafinVigencia2, disabled: true }, Validators.required]
    });
  }

  // Method to hide 'Escision' related sections
  ocultarEscicion(): void {
    this.divCompletoVisible = false;
    this.dvMessageVisible = false;
    // Additional logic can be added here if necessary
  }

  mostrarFusionada():void{
    const DATOS = this.formulario.get('capacidadAlmacenamiento')?.value;
    this.tramiteStore.setAvisoDatos(DATOS,'capacidadAlmacenamiento2');
  }

  // Method to show or hide the complete section based on selected option
  mostrarFusionOEscision(): void {
    const VALOR = this.formulario.get('numeroTotalCarros')?.value;
    this.tramiteStore.setAvisoDatos(VALOR,'numeroTotalCarros');
    if (VALOR === '1' || VALOR === '0'){
      this.divCompletoVisible = true;
      this.formulario.get('rfc')?.reset();
      this.formulario.get('razonSocial')?.reset();
      this.formulario.get('razonSocialSC')?.reset();
      this.formulario.get('numFolioTramite')?.reset();
      this.formulario.get('fechaInicioVigencia')?.reset();
      this.formulario.get('fechaFinVigencia')?.reset();
      }
   else { 
        this.divCompletoVisible = false;

    }
  }

  // Method to show certification related sections based on selected option
  mostrarCertificacionFusionada(): void {
    const VALOR = this.formulario.get('cantidadBienes')?.value;
    this.tramiteStore.setAvisoDatos(VALOR,'cantidadBienes');
    this.conCertificacionPrincipalVisible = (VALOR === '1');
    this.sinCertificacionPrincipalVisible = (VALOR === '0');

    if (!this.conCertificacionPrincipalVisible) {
      this.formulario.get('razonSocial')?.reset();
      this.formulario.get('razonSocialSC')?.reset();
      this.formulario.get('numFolioTramite')?.reset();
      this.formulario.get('fechaInicioVigencia')?.reset();
      this.formulario.get('fechaFinVigencia')?.reset();
    }
  }

  // Method to load persona fusion data based on RFC
  cargarDatosPersonaFusion(): void {
    const RFC = this.formulario.get('rfc')?.value;
    if (RFC) {
      this.tercerosService.obtenerDatosPersona(RFC).pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe(
          (datos)=> {
            console.log(datos,"datos");
            this.formulario.patchValue({
              'razonSocial': datos.razonSocial,
              'numFolioTramite': datos.numFolioTramite,
              'fechaInicioVigencia': datos.fechaInicioVigencia,
              'fechaFinVigencia': datos.fechaFinVigencia
            });
            this.tramiteStore.setAvisoDatos(datos.razonSocial,'razonSocial'); 
            this.tramiteStore.setAvisoDatos(datos.numFolioTramite,'numFolioTramite');
            this.tramiteStore.setAvisoDatos(datos.fechaInicioVigencia,'fechaInicioVigencia');
            this.tramiteStore.setAvisoDatos(datos.fechaFinVigencia,'fechaFinVigencia2');
          },
          error => {
            this.dvMessageVisible = true;
          });
    } else {
      this.dvMessageVisible = true;
    }
  }

  // Method to open modal for adding fusion or escision
  abrirModalFusionEscision(): void {
   this.router.navigate(['../agregar-fusion-escision'],{
        relativeTo: this.route,
      });
  }

  // Method to delete a persona from the grid
  eliminarPersona(): void {
    // this.fusionOEscisionService.eliminarPersona();
    // Implement deletion logic here
  }

  // Method to open modal for modifying fusion or escision
  abrirModalModificarFusionEscision(): void {
    // this.fusionOEscisionService.abrirModalModificar();
    // Implement modal modification logic here
  }

  cambioRFC():void{
    const RFC = this.formulario.get('rfc')?.value;
    this.tramiteStore.setAvisoDatos(RFC,'rfc');
  }

  cambioFechaInspeccion():void{
    const FECHA_INSPECCION = this.formulario.get('fechaInspeccion')?.value;
    this.tramiteStore.setAvisoDatos(FECHA_INSPECCION,'razonSocial');
  }
  cambioRazonSocialSC():void{
    const RAZON_SOCIAL_SC = this.formulario.get('razonSocialSC')?.value;
    this.tramiteStore.setAvisoDatos(RAZON_SOCIAL_SC,'razonSocialSC');
  }
  cambioFolio():void{
    const FOLIO = this.formulario.get('descripcionClobGenerica2')?.value;
    this.tramiteStore.setAvisoDatos(FOLIO,'descripcionClobGenerica2');
  }
  cambioFechaInicio():void{
    const FECHA_INICIO = this.formulario.get('fechaInicioVigencia')?.value;
    this.tramiteStore.setAvisoDatos(FECHA_INICIO,'fechaInicioVigencia');
  }
  cambioFechaFin():void{
    const FECHA_FIN = this.formulario.get('fechaFinVigencia')?.value;
   this.tramiteStore.setAvisoDatos(FECHA_FIN,'fechaFinVigencia');
  } 

  ngOnDestroy():void{
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


  // Additional methods can be added below as needed
}