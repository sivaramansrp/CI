import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-certificado-origen',
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.css',
})
export class CertificadoOrigenComponent {

  estado: Catalogo[] = []

  pais: Catalogo[] = []

  constructor(
        private readonly fb: FormBuilder, 
        private camCertificadoService : CamCertificadoService
    ){
      // Constructor logic can be added here if needed
    }

    ngOnInit(): void {
      this.estadoOpcion();
    }

    estadoOpcion(): void {
      this.camCertificadoService.obtenerMenuDesplegable('estado.json').subscribe({
            next: (data) => {
              this.estado = data as Catalogo[];
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error al obtener los datos:', error);
              this.estado = [];
            }
          }
        );
    }

    paisOpcion(): void {
      this.camCertificadoService.obtenerMenuDesplegable('pais.json').subscribe({
        next: (data) => {
          this.pais = data as Catalogo[];
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al obtener los datos:', error);
          this.pais = [];
        }
      }
    );
    }
}
