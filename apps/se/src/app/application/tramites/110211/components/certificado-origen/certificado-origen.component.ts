import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { Modal } from 'bootstrap';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { Observable } from 'rxjs';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';

@Component({
  selector: 'app-certificado-origen',
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.css',
})
export class CertificadoOrigenComponent implements OnInit, AfterViewInit {

  estado: Catalogo[] = []

  pais: Catalogo[] = []

  disponiblesDatos: Mercancia[] = []

  operador: boolean = true

  datosSeleccionados!: Mercancia

  modalInstance!: Modal;

  tablaSeleccionEvent: boolean = false;

  datosTabla$: Observable<Mercancia[]> | undefined;

  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;

  constructor(
        private readonly fb: FormBuilder, 
        private camCertificadoService : CamCertificadoService,
        private store : camCertificadoStore,
        private query : camCertificadoQuery
    ){
      // Constructor logic can be added here if needed
    }

    ngOnInit(): void {
      this.estadoOpcion();
      this.paisOpcion();
      this.conseguirDisponiblesDatos();
      this.datosTabla$ = this.query.selectmercanciaTabla$;
    }

    estadoOpcion(): void {
      this.camCertificadoService.obtenerMenuDesplegable('estados.json').subscribe({
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

  conseguirDisponiblesDatos(): void {
    this.camCertificadoService.obtenerTablaDatos('disponibles-datos.json').subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response)) {
          this.disponiblesDatos = response
        } 
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
      }
    });
  }

  obtenerDatosFormulario(e: unknown): void {
    this.store.setFormCertificado(e as { [key: string]: string | number | boolean | object | undefined });
  }

  tipoEstadoSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }

  tipoSeleccion(estado: Catalogo): void {
    this.store.setBloque([estado]);
  }

  abrirModificarModal(disponiblesDatos: Mercancia): void {
    this.datosSeleccionados = disponiblesDatos;
    this.store.setFormMercancia({ ...disponiblesDatos });
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  cerrarModificarModal(): void {
    if (this.modalInstance) {
      this.tablaSeleccionEvent = true;
      this.modalInstance.hide();
    }
  }

  ngAfterViewInit(): void {
    // Inicializa el modal de modificación
    if (this.modifyModal) {
      this.modalInstance = new Modal(this.modifyModal.nativeElement);
    }
  }
}
