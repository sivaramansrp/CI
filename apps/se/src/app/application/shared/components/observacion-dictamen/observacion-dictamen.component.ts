import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

/** Interfaz que define la estructura de la observación de dictamen (datos Hardcodeados)*/
interface ObservacionDictamen {
  fechaGeneracion: string;
  fechaAtencion: string;
  generadaPor: string;
  estatus: string;
  detalle: string;
}

@Component({
  selector: 'app-observacion-dictamen',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent
],
  templateUrl: './observacion-dictamen.component.html',
  styleUrl: './observacion-dictamen.component.scss'
})

export class ObservacionDictamenComponent {

  /**
   * Inicializa el ObservacionDictamenComponent.
   * @param fb - FormBuilder utilizado para construir formularios reactivos.
   */
  constructor(private fb: FormBuilder) { }

  /** Datos de ejemplo para las observaciones de dictamen */
  public evaluarObservacionesDictamen: ObservacionDictamen[] = [
    {
      fechaGeneracion: '13/10/2025',
      fechaAtencion: '',
      generadaPor: '',
      estatus: 'Generada',
      detalle: 'Observación observada'
    }
  ];

  /**
   * Configuración de la tabla de observaciones del dictamen.
   *
   * Define las columnas que se mostrarán en la tabla de observaciones del dictamen,
   * incluyendo encabezado, clave de acceso a los datos y orden de despliegue.
   */
  public tablaObservacionesDictamen: ConfiguracionColumna<ObservacionDictamen>[] = [
    { encabezado: "Fecha de generación", clave: (e: ObservacionDictamen) => e.fechaGeneracion, orden: 1 },
    { encabezado: "Fecha de atención", clave: (e: ObservacionDictamen) => e.fechaAtencion, orden: 2 },
    { encabezado: "Generada por", clave: (e: ObservacionDictamen) => e.generadaPor, orden: 3 },
    { encabezado: "Estatus", clave: (e: ObservacionDictamen) => e.estatus, orden: 4 },
    { encabezado: "Detalle", clave: (e: ObservacionDictamen) => e.detalle, orden: 5 }
  ];
}

