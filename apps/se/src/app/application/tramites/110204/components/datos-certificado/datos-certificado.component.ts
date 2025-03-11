import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-certificado',
  imports: [TituloComponent,ReactiveFormsModule],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true
})
export class DatosCertificadoComponent implements OnInit {
  solicitudForm: FormGroup;
  actionBean: any; // Define a proper type based on your data model
  mostrarObservacionesCupo: boolean = false;
  mostrarLenguajeESP: boolean = false;
  mostrarLenguajeEUR: boolean = false;
  mostrarJustificacion: boolean = false;
  lenguajeESP: any[] = []; // Define a proper type based on your data
  lenguajeEUR: any[] = []; // Define a proper type based on your data

  constructor(
    private fb: FormBuilder,
    // private datosCertificadoService: DatosCertificadoService
  ) {
    this.solicitudForm = this.fb.group({
      'solicitud.blnJustificacionCertificado': [''],
      'solicitud.certificadoOrigen.observacionesCupo': [{ value: '', disabled: true }],
      'solicitud.certificadoOrigen.observaciones': [''],
      'solicitud.certificadoOrigen.precisa': [''],
      'solicitud.certificadoOrigen.presenta': [''],
      'solicitud.certificadoOrigen.lenguaje.clave': ['-1'],
      'solicitud.certificadoOrigen.requiereJustificacion': [false],
      'solicitud.certificadoOrigen.justificacionRequerimiento': [{ value: '', disabled: true }],
      'solicitud.unidadAdministrativaRepresentacionFederal.clave': ['']
    });
  }

  ngOnInit(): void {
    this.recuperarValores();
    this.initializeFormListeners();
  }

  recuperarValores(): void {
    // TODO: Implement the logic to retrieve and set initial values
    // Example:
    // this.datosCertificadoService.getDatos().subscribe(data => {
    //   this.actionBean = data;
    //   // Set form values and control visibility based on actionBean
    // });
  }

  habilitarCampoJustificacion(): void {
    const requiereJustificacion = this.solicitudForm.get('solicitud.certificadoOrigen.requiereJustificacion')?.value;
    if (requiereJustificacion) {
      this.solicitudForm.get('solicitud.certificadoOrigen.justificacionRequerimiento')?.enable();
      this.mostrarJustificacion = true;
    } else {
      this.solicitudForm.get('solicitud.certificadoOrigen.justificacionRequerimiento')?.disable();
      this.mostrarJustificacion = false;
    }
  }

  private initializeFormListeners(): void {
    // Listen to changes in 'solicitud.blnJustificacionCertificado' to show/hide related sections
    this.solicitudForm.get('solicitud.blnJustificacionCertificado')?.valueChanges.subscribe(value => {
      // TODO: Implement logic based on 'value'
      // Example:
      // this.mostrarSomeSection = value;
    });

    // Listen to changes in 'solicitud.certificadoOrigen.lenguaje.clave' if needed
    this.solicitudForm.get('solicitud.certificadoOrigen.lenguaje.clave')?.valueChanges.subscribe(value => {
      if (value) {
        this.mostrarLenguajeESP = true;
        this.mostrarLenguajeEUR = false;
      }
      //  else if (/* another condition based on value */) {
      //   this.mostrarLenguajeEUR = true;
      //   this.mostrarLenguajeESP = false;
      // } 
      else {
        this.mostrarLenguajeESP = false;
        this.mostrarLenguajeEUR = false;
      }
    });
  }
}