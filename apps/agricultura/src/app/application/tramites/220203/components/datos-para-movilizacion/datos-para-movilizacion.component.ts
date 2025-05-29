import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, Catalogo, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent, SolicitanteComponent, TableComponent, TercerosComponent, TituloComponent } from '@ng-mf/data-access-user';

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { Consulta, FormularioMovilizacion } from '../../models/220203/importacion-de-acuicultura.module';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

import { Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';


/**
 * @title Datos para la Movilización
 * @description Este componente gestiona la información relacionada con la movilización de la acuicultura.
 */
@Component({
  selector: 'app-datos-para-movilizacion',
  templateUrl: './datos-para-movilizacion.component.html',
  styleUrls: ['./datos-para-movilizacion.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    InputRadioComponent,
    InputCheckComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    CrosslistComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    TableComponent,
    SolicitanteComponent,
    TercerosComponent,
    AlertComponent,
    FirmaElectronicaComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DatosParaMovilizacionComponent implements OnInit, OnDestroy,AfterViewInit {

  /**
   * @description Lista de opciones de transporte obtenidas del catálogo.
   * @type {Catalogo[]}
   */
  transportes: Catalogo[] = [];

  /**
   * @description Lista de puntos de verificación obtenidos del catálogo.
   * @type {Catalogo[]}
   */
  puntos: Catalogo[] = [];

  /**
   * @description Formulario para los datos de movilización de acuicultura.
   * @type {FormGroup}
   */
  formularioMovilizacion!: FormGroup;
  formularioMovilizacionStore: FormularioMovilizacion = {} as FormularioMovilizacion

  private destroyNotifier$ = new Subject<void>();

   /**
   * @description Almacena la información de consulta, incluyendo el estado de solo lectura.
   * @type {Consulta}
   */
  consultaStore: Consulta = {} as Consulta

  /**
   * @description Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @description Constructor del componente.
   * @param {FormBuilder} fb Servicio para construir formularios reactivos.
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaServices Servicio para obtener datos de catálogos.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService
  ) {
    this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.formularioMovilizacionStore = datos.formularioMovilizacion
      this.consultaStore = datos.consulta;
    })
  }

  /**
   * @description Método del ciclo de vida que se ejecuta cuando el componente se inicializa.
   * Inicializa los cambios del formulario y obtiene los datos necesarios de los catálogos.
   */
  ngOnInit(): void {
    this.formularioMovilizacion = this.fb.group({
      medioDeTransporte: [this.formularioMovilizacionStore.medioDeTransporte || '', Validators.required],
      identificacionTransporte: [this.formularioMovilizacionStore.identificacionTransporte || ''],
      puntoVerificacion: [this.formularioMovilizacionStore.puntoVerificacion || ''],
      nombreEmpresaTransportista: [this.formularioMovilizacionStore.nombreEmpresaTransportista || '', Validators.required]
    });

    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosPuntos();
  }
ngAfterViewInit(): void {
   this.formularioMovilizacion.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((changes) => {
        this.verificarEstadoDelBoton();
      }, (error) => {
        console.error('Error en cambios de formulario:', error);
      });

    if(this.consultaStore.readonly){
        this.esFormularioSoloLectura = this.consultaStore.readonly;
      this.formularioMovilizacion.disable();
    }
    else{
      this.formularioMovilizacion.enable();
    }
}
  /**
   * @description Obtiene los datos del catálogo de transporte y los asigna a la lista de transportes.
   */
  obtenerCatalogosTransporte() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('transporte.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.transportes = data.data as Catalogo[];
      }, (error) => {
        console.error('Error al obtener datos de transporte:', error);
      });
  }

  /**
   * @description Obtiene los datos del catálogo de puntos de verificación y los asigna a la lista de puntos.
   */
  obtenerCatalogosPuntos() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.puntos = data.data as Catalogo[];
      }, (error) => {
        console.error('Error al obtener datos de puntos:', error);
      });
  }

  /**
   * @description Verifica si el formulario de movilización es válido y actualiza el estado del botón.
   */
  verificarEstadoDelBoton() {
    const DATOS = {
      dataParaMovilizacion: false,
    };
    if (this.formularioMovilizacion.valid) {
      DATOS.dataParaMovilizacion = true;
    }
    this.importacionDeAcuiculturaServices.actualizarFormaValida(DATOS);
  }

  /**
   * @description Establece los valores del formulario en el servicio correspondiente.
   * @param {FormGroup} form El formulario que contiene los valores a almacenar.
   * @param {string} campo El campo que se actualizará en el servicio.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
  ): void {
    const VALOR = this.formularioMovilizacion.value;
    (this.importacionDeAcuiculturaServices.actualizarFormularioMovilizacion as (value: FormularioMovilizacion) => void)(
      VALOR
    );
  }

  /**
   * @description Método del ciclo de vida que se ejecuta cuando el componente es destruido.
   * Limpia los recursos suscritos y detiene las emisiones de datos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
