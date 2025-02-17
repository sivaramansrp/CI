import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvisoPrivacidadService } from '../services/avisoPrivacidad.service';

@Component({
  selector: 'app-aviso-privacidad',
  templateUrl: './aviso-privacidad.component.html',
  styleUrls: ['./aviso-privacidad.component.css']
})
export class AvisoPrivacidadComponent implements OnInit {
  solicitudForm: FormGroup;
  parametroAvisoPrivacidad: string = '';

  constructor(
    private fb: FormBuilder,
    private avisoPrivacidadService: AvisoPrivacidadService
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarParametroAvisoPrivacidad();
  }

  private iniciarFormulario(): void {
    this.solicitudForm = this.fb.group({
      solicitud: this.fb.group({
        idSolicitud: [''],
        tramite: this.fb.group({
          numFolioTramite: ['']
        })
      })
    });
  }

  private cargarParametroAvisoPrivacidad(): void {
    this.avisoPrivacidadService.obtenerParametroAvisoPrivacidad()
      .subscribe(
        (dato: string) => {
          this.parametroAvisoPrivacidad = dato;
        },
        (error) => {
          console.error('Error al cargar el parámetro de aviso de privacidad', error);
        }
      );
  }
}