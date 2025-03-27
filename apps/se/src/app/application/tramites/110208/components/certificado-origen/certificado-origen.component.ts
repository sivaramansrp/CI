import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputFecha, InputFechaComponent, RespuestaCatalogos, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import {FECHA_FINAL_110208,FECHA_INICIO_110208} from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum'
import {
  NICO_TABLA,
  NicoInfo,
} from '@libs/shared/data-access-user/src/core/models/110208/certificado.model';
import { CargaDeMercanciasComponent } from '../cargaDeMercancias/cargaDeMercancias.component';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

export interface RespuestaTablaCertificado {
  /**
   * Código de respuesta.
   */
  code: number;
  /**
   * Datos de la tabla NICO.
   */
  data: NicoInfo[];
  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent,
    TablaDinamicaComponent,
    CargaDeMercanciasComponent
  ],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.css',
})
export class CertificadoOrigenComponent implements OnInit,OnDestroy {
  
  mostrarTercerOperador:boolean = false;

  formCertificado!: FormGroup

  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;

  /**
   * Datos cargados para la tabla NICO.
   */
  nicoTablaDatos: NicoInfo[] = [];

  private destroyed$ = new Subject<void>();

  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud110208State;
 
  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
 
   */
  constructor(
    private readonly fb: FormBuilder,
    private service: ValidarInicalmenteService,
    private tramite110208Store: Tramite110208Store,
    private tramite110208Query: Tramite110208Query
  ) {
    // Dependencia inyectada para uso posterior
  }

  ngOnInit(): void {
    this.tramite110208Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.obtenerEstadoList()
    this.obtenerTablaDatos()
    this.formCertificado = this.fb.group({
      entidadFederativa: [this.solicitudState?.entidadFederativa,Validators.required],
      bloque:[this.solicitudState?.bloque,Validators.required],
      fraccionArancelariaForm:[this.solicitudState?.fraccionArancelariaForm],
      registroProductoForm:[this.solicitudState?.registroProductoForm],
      nombreComercialForm:[this.solicitudState?.nombreComercialForm],
      fechaInicio: [this.solicitudState?.fechaInicio],
      fechaFinal: [this.solicitudState?.fechaFinal],
      tercerOperador:[this.solicitudState?.tercerOperador]
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
    this.service.obtenerEstadoList()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      const DATOS = data?.data;
      this.estado = DATOS;
    });
  }

  obtenerTablaDatos(): void {
    this.service.obtenerTablaDatosCertificado()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      const DATOS = data?.data;
      this.nicoTablaDatos = DATOS;
    });
  }
  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string,form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store): void {

    this.formCertificado.get('fechaFinal')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaFinal')?.markAsUntouched();
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: any) => void)(VALOR);
  }
  /**
   * Cambia el valor de la fecha de inicio en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha.
   */
  public cambioFechaInicio(nuevo_valor: string,form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store): void {
    this.formCertificado.get('fechaInicio')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaInicio')?.markAsUntouched();
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  tercerOperador(form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store):void{
    this.mostrarTercerOperador = true
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: any) => void)(VALOR);
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
