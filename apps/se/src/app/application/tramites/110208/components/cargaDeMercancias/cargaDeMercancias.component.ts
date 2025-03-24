import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputFecha, InputFechaComponent, RespuestaCatalogos, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import {ALERTA_PARA, FECHA_DE_FACTURA} from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum'
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

export interface MercanciasFormInfo {
  fraccionArancelaria: string,
  nombreComercial: string,
  nombreTecnio: string,
  nombreEnIngles:string,
  criterioPara:string,
  marca:string,
  umc: string,
  cantidad: string,
  valorDeLa: string,
  complementoDescripcion:string,
  nFactura:string
}

export interface RespuestaDatos {
  /**
   * Código de respuesta.
   */
  code: number;
  /**
   * Datos de la tabla NICO.
   */
  data: MercanciasFormInfo[];
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
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent
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

  public fechaFacturaInput: InputFecha = FECHA_DE_FACTURA;

  constructor(
      private readonly httpServicios: HttpClient,
      private fb: FormBuilder
    ) {
      // Dependencia inyectada para uso posterior
    }

  ngOnInit(): void {
    this.obtenerTablaDatos()
    this.obtenerEstadoList()
    this.obtenerFormDatos()
    this.formMercancia = this.fb.group({
      fraccionArancelaria:[{value:'',disabled:true}],
      nombreComercial:[{value:'',disabled:true}],
      nombreTecnio:[{value:'',disabled:true}],
      nombreEnIngles:[{value:'',disabled:true}],
      criterioPara:[{value:'',disabled:true}],
      marca:[],
      umc:[],
      cantidad:['',Validators.required],
      valorDeLa:['',Validators.required],
      complementoDescripcion:['',Validators.required],
      nFactura:[]
    });
  }
  public alerta = ALERTA_PARA

  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIA_TABLA;

  mercanciasTablaDatos: MercanciasInfo[] = [];

  mercanciasFormaDatos: MercanciasFormInfo[] = []

  obtenerTablaDatos(): void {
    this.httpServicios
      .get<RespuestaTabla>('../../../../../assets/json/110208/mercancias-tabla.json')
      .subscribe((data): void => {
        this.mercanciasTablaDatos = data?.data;
      });
  }

  obtenerFormDatos(): void {
    this.httpServicios
      .get<RespuestaDatos>('../../../../../assets/json/110208/mercancia-datos.json')
      .subscribe((data): void => {
        this.mercanciasFormaDatos = data?.data;
        this.formMercancia.patchValue({
          fraccionArancelaria:this.mercanciasFormaDatos[0].fraccionArancelaria,
          nombreComercial:this.mercanciasFormaDatos[0].nombreComercial,
          nombreTecnio:this.mercanciasFormaDatos[0].nombreTecnio,
          nombreEnIngles:this.mercanciasFormaDatos[0].nombreEnIngles,
          criterioPara:this.mercanciasFormaDatos[0].criterioPara,
          marca:this.mercanciasFormaDatos[0].marca,
          umc:this.mercanciasFormaDatos[0].umc,
          cantidad:this.mercanciasFormaDatos[0].cantidad,
          valorDeLa:this.mercanciasFormaDatos[0].valorDeLa,
          complementoDescripcion:this.mercanciasFormaDatos[0].complementoDescripcion,
          nFactura:this.mercanciasFormaDatos[0].nFactura
        })
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
   /**
   * Lista de catálogos de estados.
   */
    estado: Catalogo[] = [];
  
   /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerEstadoList(): void {
    this.httpServicios
      .get<RespuestaCatalogos>('../../../../../assets/json/110208/seleccion.json')
      .subscribe((data): void => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }
  public cambioFechaFactura(nuevo_valor: string): void {
    this.formMercancia.get('fechaFactura')?.setValue(nuevo_valor);
    this.formMercancia.get('fechaFactura')?.markAsUntouched();
  }
}
