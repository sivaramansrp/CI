import { Component } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { camCertificadoStore } from '../../estados/cam-certificado.store';

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
    private camCertificadoService : CamCertificadoService,
    private store : camCertificadoStore
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

  obtenerDatosFormulario(e: unknown): void {
    this.store.setFormDatosCertificado(e as { [key: string]: string | number | boolean | object | undefined });
  }

  idiomaSeleccion(estado: Catalogo): void {
    this.store.setIdiomaSeleccion(estado);
  }

  entidadFederativaSeleccion(estado: Catalogo): void {
    this.store.setEntidadFederativaSeleccion(estado);
  }

  representacionFederalSeleccion(estado: Catalogo): void {
    this.store.setRepresentacionFederalDatosSeleccion(estado);
  }
}
