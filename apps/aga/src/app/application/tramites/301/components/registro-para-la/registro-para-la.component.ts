import { Component, OnInit } from '@angular/core';

// Importación de constantes desde un archivo de enumeración
import { Aviso, Importante } from '@ng-mf/data-access-user';

// Modelos necesarios para este componente
import { Catalogo } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

// Componentes de la UI
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';

/**
 * Componente para el registro de productos relacionados con importaciones y exportaciones.
 * Presenta un formulario interactivo que permite registrar si un producto ha sido importado o exportado previamente.
 * Utiliza varios componentes reutilizables como alertas, botones y selectores.
 * 
 * @export
 * @class RegistroParaLaComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-registro-para-la',
  templateUrl: './registro-para-la.component.html',
  styleUrls: ['./registro-para-la.component.scss'], // Corregido de styleUrl a styleUrls
  imports: [AlertComponent, TituloComponent, CatalogoSelectComponent, BtnContinuarComponent],
  standalone: true
})
export class RegistroParaLaComponent implements OnInit {

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
   * 
   * @type {Importante}
   * @memberof RegistroParaLaComponent
   */
  public TEXTOS = Importante;

  /**
   * Constantes importadas desde el archivo de enumeración para los mensajes de advertencia.
   * 
   * @type {Aviso}
   * @memberof RegistroParaLaComponent
   */
  public ADVERTENCIA = Aviso;

  /**
   * Índice del paso actual en el formulario.
   * Inicialmente, se establece en 1. Este índice es utilizado para navegar entre los pasos del formulario.
   * 
   * @type {number}
   * @memberof RegistroParaLaComponent
   */
  indice: number = 1;

  /**
   * Objeto de tipo `CatalogosSelect` que representa las opciones del formulario de importaciones/exportaciones.
   * Este objeto es inicializado en el método `getRegistro()`.
   * 
   * @type {CatalogosSelect}
   * @memberof RegistroParaLaComponent
   */
  public registro!: Catalogo[];

  /**
   * Lista de pasos en el flujo del formulario.
   * Inicialmente está vacía, pero se llenará dependiendo de los datos de la aplicación.
   * 
   * @type {ListaPasosWizard[]}
   * @memberof RegistroParaLaComponent
   */
  pasos: ListaPasosWizard[] = [];

  /**
   * Objeto que contiene los datos del flujo de pasos del formulario.
   * Este objeto es utilizado para mostrar información relevante al usuario como el número de pasos,
   * el paso actual y los textos de los botones de navegación (anterior y siguiente).
   * 
   * @type {DatosPasos}
   * @memberof RegistroParaLaComponent
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // El número de pasos se obtiene dinámicamente de la lista `pasos`
    indice: this.indice, // Índice del paso actual en el formulario
    txtBtnAnt: 'Anterior', // Texto para el botón de retroceso
    txtBtnSig: 'Continuar', // Texto para el botón de siguiente
  };

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * Este método se encarga de obtener los datos necesarios para inicializar el formulario de registro,
   * incluyendo las opciones para el campo de importaciones/exportaciones.
   * 
   * @memberof RegistroParaLaComponent
   */
  ngOnInit(): void {
    this.getRegistro(); // Llama al método para obtener los datos de registro
  }

  /**
   * Inicializa el objeto `registro` con los datos predeterminados para el formulario.
   * Este método establece los valores iniciales para la etiqueta, las opciones de respuesta y si el campo es obligatorio.
   * 
   * @memberof RegistroParaLaComponent
   */
  public getRegistro(): void {
    this.registro = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];

    // Aquí deberías cargar los pasos reales del flujo de trabajo de tu aplicación
    this.pasos = []; // Llenar la lista `pasos` con los pasos correspondientes

    // Actualiza el número de pasos en el objeto `datosPasos` después de cargar la lista de pasos
    this.datosPasos.nroPasos = this.pasos.length;
  }

  /**
   * Método que maneja la selección de un documento.
   * Este método es un "placeholder" por ahora y puede ser extendido para manejar la lógica de selección de documentos.
   * 
   * @param {unknown} e - Evento o información del documento seleccionado.
   * @returns {void}
   * @memberof RegistroParaLaComponent
   */
  registroSeleccion(): void {
    // Este método puede ser extendido para manejar la lógica de selección de documentos
    return;
  }
}
