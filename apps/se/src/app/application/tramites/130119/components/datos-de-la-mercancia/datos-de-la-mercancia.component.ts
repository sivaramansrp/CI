/**
 * Componente encargado de gestionar los datos de la mercancía.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import { Catalogo, ConsultaioQuery, InputFecha } from "@ng-mf/data-access-user";
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud/datos-de-la-solicitud.service';
import { FECHA } from '../../constants/aviso-importacion-maquinas.enum';
import { InputFechaComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite130119Query } from '../../estados/queries/tramite130119.query';
import { Tramite130119Store } from '../../estados/store/tramite130119.store';

/**
 * Componente encargado de gestionar los datos de la mercancía.
 */
@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule, InputFechaComponent],
  templateUrl: './datos-de-la-mercancia.component.html',
  styleUrl: './datos-de-la-mercancia.component.scss',
})
/**
 * Componente encargado de gestionar los datos de la mercancía.
 */
export class DatosDeLaMercanciaComponent implements OnInit, OnDestroy {

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  esSoloLectura!: boolean;
  /**
   * Fecha final de entrada.
   */
  fechaFinalInput: InputFecha = FECHA;

  /**
   * Formulario para los datos de la mercancía.
   * @type {FormGroup}
   */
  datosDeLaMercanciaForm!: FormGroup;

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Opciones de fracción arancelaria.
   * @type {Catalogo[]}
   */
  opcionesFraccionArancelaria!: Catalogo[];

  /**
   * Opciones de países.
   * @type {Catalogo[]}
   */
  pasises!: Catalogo[];

  /**
   * Constructor del componente DatosDeLaMercanciaComponent.
   * 
   * @param {FormBuilder} fb - El servicio FormBuilder proporcionado por Angular.
   * @param {DatosDeLaSolicitudService} service - El servicio para obtener los datos de la solicitud.
   * @param {Tramite130119Store} tramite130119Store - El store del trámite 130119.
   * @param {Tramite130119Query} tramite130119Query - La consulta del trámite 130119.
   */
  constructor(private fb: FormBuilder, private service: DatosDeLaSolicitudService, private tramite130119Store: Tramite130119Store, private tramite130119Query: Tramite130119Query,private consultaQuery: ConsultaioQuery) {
  
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene las opciones de fracción arancelaria, países y los valores del store.
   */
  ngOnInit(): void {
    this.inicializarFormulario()
  this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((estadoConsulta) => {
        this.esSoloLectura = estadoConsulta.readonly;
        this.habilitarDeshabilitarFormulario();
      });

   
    }
  /**
   * Inicializa el formulario para "Datos de la Mercancía" con sus controles y validadores.
   * También dispara la carga de fracciones arancelarias, países y valores desde el store.
   */
  inicializarFormulario(): void {
    this.datosDeLaMercanciaForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.pattern(/^(?!\s)(.*\S)?$/)]],
      fraccionArancelaria: ['', Validators.required],
      umt: [{ value: '', disabled: true }],
      cantidad: ['', [Validators.required, Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)]],
      valorFacturaUSD: ['', [Validators.required, Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)]],
      paisOrigen: ['', Validators.required],
      paisExportador: ['', Validators.required],
      numeroFactura: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9Ññ]+$/)]],
      fechaExpedicionFactura: ['', Validators.required],
      observaciones: ['', Validators.pattern(/^(?!\s)(.*\S)?$/)]
    });
    this.getFraccionArancelaria();
    this.getPasises();
    this.getValoresStore();
  }

  /**
   * Habilita o deshabilita el formulario según el estado de solo lectura.
   * Si es solo lectura, deshabilita todos los campos del formulario.
   * Si no, habilita todos los campos del formulario.
   */
  habilitarDeshabilitarFormulario(): void {
    if (this.esSoloLectura) {
      this.datosDeLaMercanciaForm.disable();
    } else {
      this.datosDeLaMercanciaForm.enable();
    }
  }
 
  
  /**
   * Obtiene las opciones de fracción arancelaria desde el servicio.
   */
  getFraccionArancelaria(): void {
    this.service.getFraccionArancelaria().pipe(
      takeUntil(this.destroyed$)).subscribe(
        (data) => {
          this.opcionesFraccionArancelaria = data;
        });
  }

  /**
   * Obtiene las opciones de países desde el servicio.
   */
  getPasises(): void {
    this.service.getPais().pipe(
      takeUntil(this.destroyed$)).subscribe(
        (data) => {
          this.pasises = data;
        }
      );
  }

  /**
   * Maneja el cambio de la fracción arancelaria.
   * Establece los valores en el store y actualiza el campo 'umt'.
   */
  onFraccionArancelariaChange(): void {
    this.setValoresStore(this.datosDeLaMercanciaForm, 'fraccionArancelaria');
    this.datosDeLaMercanciaForm.get('umt')?.setValue('Pieza');
    this.setValoresStore(this.datosDeLaMercanciaForm, 'umt');
  }
 
  /**
   * Establece los valores en el store.
   * @param {FormGroup} form - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite130119Store} metodoNombre - El nombre del método del store.
   */
  
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite130119Store.establecerDatos({[campo]: VALOR});
  }
  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite130119Query.selectTramite130119$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.datosDeLaMercanciaForm.patchValue({
            descripcion: seccionState.descripcion,
            fraccionArancelaria: seccionState.fraccionArancelaria,
            umt: seccionState.umt,
            cantidad: seccionState.cantidad,
            valorFacturaUSD: seccionState.valorFacturaUSD,
            paisOrigen: seccionState.paisOrigen,
            paisExportador: seccionState.paisExportador,
            numeroFactura: seccionState.numeroFactura,
            fechaExpedicionFactura: seccionState.fechaExpedicionFactura,
            observaciones: seccionState.observaciones
          });
        })
      )
      .subscribe();
  }

 /**
   * Método para cambiar la fecha final.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.datosDeLaMercanciaForm.patchValue({
      fechaExpedicionFactura: nuevo_valor,
    });
  this.setValoresStore(this.datosDeLaMercanciaForm,'fechaExpedicionFactura');
  }
  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}