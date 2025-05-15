// fusion-o-escision.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FUSION_CONFIGURATION_TABLA, FusionEscision, TABLE_ID } from '../../models/aviso-modificacion.model'
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
// import { FusionOEscisionService } from 'path-to-service'; // Commented out as per instructions

@Component({
  selector: 'app-fusion-o-escision',
  templateUrl: './fusion-o-escision.component.html',
  styleUrl:'./fusion-o-escision.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TablaDinamicaComponent,TituloComponent],
  // providers: [FusionOEscisionService] // Commented out as per instructions
})
export class FusionOEscisionComponent implements OnInit {
  // Reactive Form Group
  formulario: FormGroup;

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

  constructor(private fb: FormBuilder,private router:Router,private route:ActivatedRoute  /*, private fusionOEscisionService: FusionOEscisionService */) {
    // Initialize the reactive form with flat FormControls to match the template's formControlName usage
    this.formulario = this.fb.group({
      'capacidadAlmacenamiento': ['', Validators.required],
      'numeroTotalCarros': ['', Validators.required],
      'cantidadBienes': ['', Validators.required],
      'fechaInspeccion': ['', Validators.required],
      'descripcionClobGenerica2': ['', Validators.required],
      'rfc': ['', Validators.required],
      'razonSocial': [{ value: '',disabled:true}, Validators.required],
      'numFolioTramite': [{ value: '', disabled: true }, Validators.required],
      'fechaInicioVigencia': [{ value: '', disabled: true }, Validators.required],
      'fechaFinVigencia': [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic can be added here
    // this.cargarDatosIniciales(); // Commented out as per instructions
  }

  // Method to hide 'Escision' related sections
  ocultarEscicion(): void {
    this.divCompletoVisible = false;
    this.dvMessageVisible = false;
    // Additional logic can be added here if necessary
  }

  // Method to show or hide the complete section based on selected option
  mostrarFusionOEscision(): void {
    const valor = this.formulario.get('numeroTotalCarros')?.value;
    if (valor === '1' || valor === '0'){
      this.divCompletoVisible = true;
      this.formulario.get('rfc')?.reset();
      this.formulario.get('razonSocial')?.reset();
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
    const valor = this.formulario.get('cantidadBienes')?.value;
    this.conCertificacionPrincipalVisible = (valor === '1');
    this.sinCertificacionPrincipalVisible = (valor === '0');

    if (!this.conCertificacionPrincipalVisible) {
      this.formulario.get('razonSocial')?.enable();
      // Reset related form controls if certification is not selected
      this.formulario.get('rfc')?.reset();
      this.formulario.get('razonSocial')?.reset();
      this.formulario.get('numFolioTramite')?.reset();
      this.formulario.get('fechaInicioVigencia')?.reset();
      this.formulario.get('fechaFinVigencia')?.reset();
    }
  }

  // Method to load persona fusion data based on RFC
  cargarDatosPersonaFusion(): void {
    const rfc = this.formulario.get('rfc')?.value;
    if (rfc) {
      // this.fusionOEscisionService.obtenerDatosPersona(rfc)
      //   .subscribe(
      //     datos => {
      //       this.formulario.patchValue({
      //         'personaFusionEscisionDTO.razonSocial': datos.razonSocial,
      //         'personaFusionEscisionDTO.numFolioTramite': datos.numFolioTramite,
      //         'personaFusionEscisionDTO.fechaInicioVigencia': datos.fechaInicioVigencia,
      //         'personaFusionEscisionDTO.fechaFinVigencia': datos.fechaFinVigencia
      //       });
      //     },
      //     error => {
      //       this.dvMessageVisible = true;
      //     }
      //   );

      // For now, since service calls are commented out, simulate data fetching
      // This is a placeholder and should be replaced with actual service call
      this.formulario.patchValue({
        'razonSocial': 'Empresa Ejemplo S.A. de C.V.',
        'numFolioTramite': '123456789',
        'fechaInicioVigencia': '2024-01-01',
        'fechaFinVigencia': '2024-12-31'
      });
      this.formulario.get('razonSocial')?.enable();
      this.formulario.get('numFolioTramite')?.enable();
      this.formulario.get('fechaInicioVigencia')?.enable();
      this.formulario.get('fechaFinVigencia')?.enable();
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

  // Additional methods can be added below as needed
}