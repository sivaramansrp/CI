import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { Catalogo, InputFecha } from '@libs/shared/data-access-user/src';
import { HttpErrorResponse } from '@angular/common/http';
import { FECHA } from '../../constantes/cam-certificado.module';

@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrl: './mercancia.component.css',
})
export class MercanciaComponent {

  mostrarAlerta: boolean = false;

  @Output() cerrarClicado = new EventEmitter();

  mercanciaForm!: FormGroup

  umc: Catalogo[] = []

  factura: Catalogo[] = []

  fechaFinalInput: InputFecha = FECHA;

  constructor(
      private readonly fb: FormBuilder, 
      private camCertificadoService : CamCertificadoService
  ){
    // Constructor logic can be added here if needed
  }

  ngOnInit(): void {
    this.umcOpcion();
    this.facturasOpcion();
    this.initActionFormBuild();
  }

  initActionFormBuild(): void {
    this.mercanciaForm = this.fb.group({
      fraccionArancelaria: [''],
      nombreComercialMercancia: [''],
      nombreTecnico: [''],
      nombreIngles: [''],
      criterioClasificacion: [''],
      cantidad: [
        '',Validators.required
      ],
      umc: [
        '',Validators.required
      ],
      valorMercancia: [
        '',Validators.required
      ],
      complementoClasificacion: [
        '',Validators.required
      ],
      numeroFactura: [
        '',Validators.required
      ],
      tipoFactura: [
        '',Validators.required
      ],

    })
  }

  cerrarModal(): void {
    // this.cerrarClicado.emit();
    this.mostrarAlerta = false;
  }

  activarModal(): void {
    this.mostrarAlerta = true;
  }

  umcOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('umc.json').subscribe({
      next: (data) => {
        this.umc = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.umc = [];
      }
    }
  );
  }

  facturasOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('factura.json').subscribe({
      next: (data) => {
        this.factura = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.factura = [];
      }
    }
  );
  }

}
