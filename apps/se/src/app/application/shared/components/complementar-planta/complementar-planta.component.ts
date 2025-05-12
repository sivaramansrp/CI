import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { COMPLEMENTO_DE_PLANTA } from '../../constantes/complementar-planta.enum';
import { FECHA_DE_FIN_DE_VIGENCIA } from '../../constantes/complementar-planta.enum';
import { FECHA_DE_FIRMA } from '../../constantes/complementar-planta.enum';
import { Location } from '@angular/common';

/**
 * Componente para gestionar la información complementaria de planta.
 * @class ComplementarPlantaComponent
 */
@Component({
  selector: 'app-complementar-planta',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './complementar-planta.component.html',
  styleUrl: './complementar-planta.component.scss',
})
export class ComplementarPlantaComponent {
  /**
   * Constructor de la clase ComplementarPlantaComponent.
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador.
   */
  constructor(private ubicaccion: Location) {
    //El constructor requiere inyección de dependencias, pero se ha mantenido vacío debido a una regla de ESLint.
  }
  /**
   * Configuración de la fecha de firma.
   * @property {InputFecha} fetchaDeFirma
   */
  fetchaDeFirma: InputFecha = FECHA_DE_FIRMA;

  /**
   * Configuración de la fecha de fin de vigencia.
   * @property {InputFecha} fetchaDeFinDeVigencia
   */
  fetchaDeFinDeVigencia: InputFecha = FECHA_DE_FIN_DE_VIGENCIA;

  /**
   * Opciones disponibles para mercancía programa.
   * @property {Array} permaneceraMercanciaProgramaOptions
   */
  permaneceraMercanciaProgramaOptions = [];

  /**
   * Opciones disponibles para documentos.
   * @property {Array} documentoOptions
   */
  documentoOptions = [];

  /**
   * Tipo de selección para la tabla de complemento de planta.
   * @property {TablaSeleccion} complecomplementoDePlantaTableSelection
   */
  complecomplementoDePlantaTableSelection = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de encabezados para la tabla de complemento de planta.
   * @property {any} complementoDePlantaEncabezado
   */
  complementoDePlantaEncabezado = COMPLEMENTO_DE_PLANTA;

  /**
   * Datos para la tabla de complemento de planta.
   * @property {Array} complementoDePlantaDatos
   */
  complementoDePlantaDatos = [];

  /**
   * Vuelve a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regrasar(): void {
    this.ubicaccion.back();
  }
}
