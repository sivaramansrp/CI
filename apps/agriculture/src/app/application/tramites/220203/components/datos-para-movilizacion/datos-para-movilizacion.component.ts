import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportacionDeAcuiculturaService } from 'libs/shared/data-access-user/src/core/services/220203/importacion-de-acuicultura.service';

/**
 * @title Datos para la Movilización (Data for Mobilization)
 * @description Este componente gestiona la información relacionada con la movilización de la acuicultura.
 */
@Component({
  selector: 'app-datos-para-movilizacion',
  templateUrl: './datos-para-movilizacion.component.html',
  styleUrls: ['./datos-para-movilizacion.component.scss']
})
export class DatosParaMovilizacionComponent implements OnInit {
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService
  ) {
    this.formularioMovilizacion = this.fb.group({
      medioDeTransporte: ['', Validators.required],
      identificacionTransporte: ['IDTERR'],
      puntoVerificacion: ['', Validators.required],
      nombreEmpresaTransportista: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosPuntos(); // Call this method to load points data
  }

  /**
   * @description Obtiene los datos del catálogo de transporte.
   */
  obtenerCatalogosTransporte() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('transporte.json').subscribe((data => {
      this.transportes = data.data as Catalogo[];
    }));
  }

  /**
   * @description Obtiene los datos del catálogo de puntos de verificación.
   */
  obtenerCatalogosPuntos() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json').subscribe((data => {
      this.puntos = data.data as Catalogo[];
    }));
  }




}