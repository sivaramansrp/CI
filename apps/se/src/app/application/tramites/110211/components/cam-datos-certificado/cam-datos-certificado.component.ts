import { Component } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cam-datos-certificado',
  templateUrl: './cam-datos-certificado.component.html',
  styleUrl: './cam-datos-certificado.component.css',
})
export class CamDatosCertificadoComponent {

  idioma: boolean = true;

  idiomaDatos: Catalogo[] = []

  entidadFederativas: Catalogo[] = []

  representacionFederal: Catalogo[] = []

  constructor(
    private readonly fb: FormBuilder, 
    private camCertificadoService : CamCertificadoService
){
  // Constructor logic can be added here if needed
}

  ngOnInit(): void {
    this.idiomOpcion();
    this.entidadFederativasOpcion();
    this.representacionFederalOpcion();
  }

  idiomOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('idioma.json').subscribe({
      next: (data) => {
        this.idiomaDatos = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.idiomaDatos = [];
      }
    }
  );
  }


  entidadFederativasOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('entidadFederativas.json').subscribe({
      next: (data) => {
        this.entidadFederativas = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.entidadFederativas = [];
      }
    }
  );
  }

  representacionFederalOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('representacionFederal.json').subscribe({
      next: (data) => {
        this.representacionFederal = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.representacionFederal = [];
      }
    }
  );
  }
}
