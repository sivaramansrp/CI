import { Catalogo } from '@ng-mf/data-access-user';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

import { Subject, takeUntil } from 'rxjs';
import { FormularioMovilizacion } from '../../models/220203/importacion-de-acuicultura.module';
/**
 * @title Datos para la Movilización (Data for Mobilization)
 * @description Este componente gestiona la información relacionada con la movilización de la acuicultura.
 */
@Component({
  selector: 'app-datos-para-movilizacion',
  templateUrl: './datos-para-movilizacion.component.html',
  styleUrls: ['./datos-para-movilizacion.component.scss']
})
export class DatosParaMovilizacionComponent implements OnInit, OnDestroy {
  /**
   * @description Lista de opciones de transporte.
   */
  transportes: Catalogo[] = [];

  /**
   * @description Lista de puntos de verificación.
   */
  puntos: Catalogo[] = [];

  /**
   * @description Formulario para los datos de movilización.
   */
  formularioMovilizacion: FormGroup;

  private destroyNotifier$ = new Subject<void>();
  /**
   * @description Constructor del componente.
   * @param fb Servicio para construir formularios.
   * @param importacionDeAcuiculturaServices Servicio para obtener datos de catálogos.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService
  ) {
    this.formularioMovilizacion = this.fb.group({
      medioDeTransporte: ['', Validators.required],
      identificacionTransporte: ['IDTERR'],
      puntoVerificacion: [''],
      nombreEmpresaTransportista: ['', Validators.required]
    });
  }

  /**
   * @description Método del ciclo de vida que se ejecuta cuando el componente se inicializa.
   */
  ngOnInit(): void {
    this.formularioMovilizacion.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((changes) => {
        this.verificarEstadoDelBoton();
      }, (error) => {
        console.error(error);
      });
    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosPuntos();
  }

  /**
   * @description Obtiene los datos del catálogo de transporte.
   */
  obtenerCatalogosTransporte() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('transporte.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.transportes = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Obtiene los datos del catálogo de puntos de verificación.
   */
  obtenerCatalogosPuntos() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.puntos = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }
  verificarEstadoDelBoton() {
    const DATOS = {
      dataParaMovilizacion: false,
    }
    if (this.formularioMovilizacion.valid) {
      DATOS.dataParaMovilizacion = true
    }
    this.importacionDeAcuiculturaServices.actualizarFormaValida(DATOS);
  }
  setValoresStore(
    form: FormGroup,
    campo: string,
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.importacionDeAcuiculturaServices.actualizarFormularioMovilizacion as (value: FormularioMovilizacion) => void)(
      VALOR
    );
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}