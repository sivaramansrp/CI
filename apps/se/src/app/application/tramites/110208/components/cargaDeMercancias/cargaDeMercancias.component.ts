import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import {ALERTA_PARA} from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum'
import { MERCANCIA_TABLA, MercanciasInfo } from '@libs/shared/data-access-user/src/core/models/110208/certificado.model';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface RespuestaTabla {
  /**
   * Código de respuesta.
   */
  code: number;
  /**
   * Datos de la tabla NICO.
   */
  data: MercanciasInfo[];
  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

@Component({
  selector: 'app-carga-de-mercancias',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cargaDeMercancias.component.html',
  styleUrl: './cargaDeMercancias.component.css',
})
export class CargaDeMercanciasComponent implements OnInit{

  formMercancia!: FormGroup
  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  
  /**
   * Referencia al botón de cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
      private readonly httpServicios: HttpClient,
      private fb: FormBuilder
    ) {
      // Dependencia inyectada para uso posterior
    }

  ngOnInit(): void {
    this.obtenerTablaDatos()
    this.formMercancia = this.fb.group({
      fraccionArancelaria:[{value:'',disabled:true}],
      nombreComercial:[{value:'',disabled:true}],
      nombreTecnio:[{value:'',disabled:true}],
      nombreEnIngles:[{value:'',disabled:true}],
      criterioPara:[{value:'',disabled:true}]
    });
  }
  public alerta = ALERTA_PARA

  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIA_TABLA;

  mercanciasTablaDatos: MercanciasInfo[] = [];

  obtenerTablaDatos(): void {
    this.httpServicios
      .get<RespuestaTabla>('../../../../../assets/json/110208/mercancias-tabla.json')
      .subscribe((data): void => {
        this.mercanciasTablaDatos = data?.data;
      });
  }

  abrirDialogoMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Cierra el modal.
   * 
   * @returns {void}
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }
}
