import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, RespuestaCatalogos, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs';
import {FECHA_FINAL_110208,FECHA_INICIO_110208} from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum'

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.css',
})
export class CertificadoOrigenComponent implements OnInit {
  
  mostrarTercerOperador:boolean = false;

  formCertificado!: FormGroup

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param httpServicios Cliente HTTP para servicios API.
 
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly httpServicios: HttpClient,
  ) {
    // Dependencia inyectada para uso posterior
  }

  ngOnInit(): void {
    this.obtenerEstadoList()
    this.formCertificado = this.fb.group({
      entidadFederativa: ['',Validators.required],
      bloque:['',Validators.required],
      fraccionArancelariaForm:[''],
      registroProductoForm:[''],
      nombreComercialForm:[''],
      fechaInicio: [''],
      fechaFinal: [''],
      tercerOperador:['']
    });
  }

   /**
   * Lista de catálogos de estados.
   */
   estado: Catalogo[] = [];

   /**
      * Configuración de las fechas de inicio y fin.
      * @type {InputFecha}
      */
     public fechaInicioInput: InputFecha = FECHA_INICIO_110208;
     public fechaFinalInput: InputFecha = FECHA_FINAL_110208;


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
  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {

    this.formCertificado.get('fechaFinal')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaFinal')?.markAsUntouched();
  }
  /**
   * Cambia el valor de la fecha de inicio en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha.
   */
  public cambioFechaInicio(nuevo_valor: string): void {
    this.formCertificado.get('fechaInicio')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaInicio')?.markAsUntouched();
  }

  tercerOperador(){
    this.mostrarTercerOperador = true
  }


}
