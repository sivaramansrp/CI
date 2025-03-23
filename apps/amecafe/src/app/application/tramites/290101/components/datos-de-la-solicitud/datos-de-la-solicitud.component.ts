import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { InputRadioComponent } from '@libs/shared/data-access-user/src';

import { BENEFICIOS_SERVICIO } from '../../modelos/cafe-exportadores.model';
import { BODEGAS_SERVICIO } from '../../modelos/cafe-exportadores.model';
import { CAFE_EXPORTADORES } from '../../modelos/cafe-exportadores.model';
import { REGIONES_SERVICIO } from '../../modelos/cafe-exportadores.model';

import { beneficiosInfo } from '../../modelos/cafe-exportadores.model';
import { bodegasInfo } from '../../modelos/cafe-exportadores.model';
import { cafeExporacionInfo } from '../../modelos/cafe-exportadores.model';
import { RadioOpcion } from '../../modelos/cafe-exportadores.model';
import { regionesInfo } from '../../modelos/cafe-exportadores.model';

import { ProductoTablaServicios } from '../../servicios/regiones-compra.service';


@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputRadioComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para capturar los datos de la solicitud.
   * @type {FormGroup}
   */
  datosSolicitudForma!: FormGroup;

  /**
   * Opciones para el radio button de exención de pago.
   * @property {RadioOpcion[]} radioOptions
   */
  radioOptions: RadioOpcion[] = [
    {
      "label": "Sí",
      "value": "Si"
    },
    {
      "label": "No",
      "value": "no"
    }
  ];

  /**
   * Valor seleccionado en el radio button de exención de pago.
   * @property {string} valorSeleccionado
   */
  valorSeleccionado: string = 'no';

  /**
   * Tipo de selección de la tabla utilizando un radio button.
   * @type {TablaSeleccion}
   */
  tablaSeleccionRadio: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Tipo de selección de la tabla utilizando checkbox.
   * @type {TablaSeleccion}
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla para la lista de regiones.
   * Define las propiedades y formato de las columnas en la tabla de regiones.
   * @type {ConfiguracionColumna<regionesInfo>[]}
   */
  regionesTabla: ConfiguracionColumna<regionesInfo>[] = REGIONES_SERVICIO;

  /**
   * Datos de las regiones cargados en la tabla.
   * Contiene la información de las regiones asociadas al trámite.
   * @type {regionesInfo[]}
   */
  regionesTableDatos: regionesInfo[] = [];
  regionesCompraApiDatos: any[] = [];

  /**
   * Configuración de las columnas de la tabla para la lista de beneficios.
   * Define las propiedades y formato de las columnas en la tabla de beneficios.
   * @type {ConfiguracionColumna<beneficiosInfo>[]}
   */
  beneficiosTabla: ConfiguracionColumna<beneficiosInfo>[] = BENEFICIOS_SERVICIO;

  /**
   * Datos de los beneficios cargados en la tabla.
   * Contiene la información de los beneficios asociados al trámite.
   * @type {beneficiosInfo[]}
   */
  beneficiosTableDatos: beneficiosInfo[] = [];
  beneficiosApiDatos: any[] = [];

  /**
   * Configuración de las columnas de la tabla para la lista de bodegas.
   * Define las propiedades y formato de las columnas en la tabla de bodegas.
   * @type {ConfiguracionColumna<bodegasInfo>[]}
   */
  bodegasTabla: ConfiguracionColumna<bodegasInfo>[] = BODEGAS_SERVICIO;

  /**
   * Datos de las bodegas cargados en la tabla.
   * Contiene la información de las bodegas asociadas al trámite.
   * @type {bodegasInfo[]}
   */
  bodegasTableDatos: bodegasInfo[] = [];
  bodegasApiDatos: any[] = [];

  /**
   * Configuración de las columnas de la tabla para la lista de café de exportación.
   * Define las propiedades y formato de las columnas en la tabla de café de exportación.
   * @type {ConfiguracionColumna<cafeExporacionInfo>[]}
   */
  cafeExporacionTabla: ConfiguracionColumna<cafeExporacionInfo>[] = CAFE_EXPORTADORES;

  /**
   * Datos del café de exportación cargados en la tabla.
   * Contiene la información del café de exportación asociado al trámite.
   * @type {cafeExporacionInfo[]}
   */
  cafeExporacionTableDatos: cafeExporacionInfo[] = [];
  cafeExportacionApiDatos: any[] = [];

  /**
   * Suscripciones activas en el componente.
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructor de la clase.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {ProductoTablaServicios} productoTablaServicios - Servicio para obtener los datos de las tablas.
   */
  constructor(
    private fb: FormBuilder,
    private productoTablaServicios: ProductoTablaServicios
  ) { }

  /**
   * Método de inicialización del componente.
   * Configura el formulario reactivo y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.datosSolicitudForma = this.fb.group({
      claveDelPadron: [{ value: '', disabled: this.valorSeleccionado === 'no' }],
      exentoDePago: [this.valorSeleccionado]
    });

    const exentoDePagoSubscription = this.datosSolicitudForma.get('exentoDePago')?.valueChanges.subscribe((value) => {
      if (value === 'no') {
        this.datosSolicitudForma.get('claveDelPadron')?.disable();
      } else {
        this.datosSolicitudForma.get('claveDelPadron')?.enable();
      }
    });

    if (exentoDePagoSubscription) {
      this.subscriptions.push(exentoDePagoSubscription);
    }

    this.buscarDatos();
  }

  /**
   * Método para buscar y cargar los datos de las tablas.
   * Realiza una llamada al servicio para obtener los datos de regiones, beneficios, bodegas y café de exportación.
   */
  buscarDatos(): void {
    this.productoTablaServicios.obtenerDatos()
      .subscribe({
        next: (response: { regionesCompraApiDatos: regionesInfo[]; beneficiosApiDatos: beneficiosInfo[]; bodegasApiDatos: bodegasInfo[]; cafeExportacionApiDatos: cafeExporacionInfo[] }) => {
          if (response && Array.isArray(response.regionesCompraApiDatos) &&
            Array.isArray(response.beneficiosApiDatos) &&
            Array.isArray(response.bodegasApiDatos) &&
            Array.isArray(response.cafeExportacionApiDatos)) {
            this.regionesTableDatos = response.regionesCompraApiDatos;
            this.beneficiosTableDatos = response.beneficiosApiDatos;
            this.bodegasTableDatos = response.bodegasApiDatos;
            this.cafeExporacionTableDatos = response.cafeExportacionApiDatos;
          } else {
            console.error("La respuesta de la API no tiene el formato esperado: ", response);
          }
        },
        error: (error) => {
          console.error("Error al obtener datos: ", error);
        }
      });
  }

  /**
   * Método para limpiar las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
