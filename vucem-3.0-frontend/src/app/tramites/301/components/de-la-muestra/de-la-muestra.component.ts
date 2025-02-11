import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';


/**
 * Componente `DeLaMuestraComponent`
 * 
 * Este componente se utiliza para gestionar una solicitud que incluye un formulario
 * relacionado con la toma de muestras de un producto. Proporciona una serie de 
 * funcionalidades, como la habilitación/deshabilitación de campos dependiendo de
 * la selección de un valor en un catálogo, la validación de formularios y la 
 * inicialización de un conjunto de datos relevantes.
 * 
 * @component
 * @example
 * <app-de-la-muestra></app-de-la-muestra>
 */
@Component({
  selector: 'app-de-la-muestra',
  templateUrl: './de-la-muestra.component.html',
  styleUrls: ['./de-la-muestra.component.scss'],
  imports: [AlertComponent, TituloComponent, SelectCatalogosComponent, ReactiveFormsModule],
  standalone: true
})
export class DeLaMuestraComponent implements OnInit {

  /** 
   * Objeto que contiene los datos del catálogo relacionados con la mercancía.
   * 
   * @type {CatalogosSelect}
   */
  public mercancia!: CatalogosSelect;

  /** 
   * Formulario reactivo que contiene los datos de la solicitud.
   * Incluye el campo obligatorio `follo` dentro de `datosImportadorExportador`.
   * 
   * @type {FormGroup}
   */
  Informaciondela!: FormGroup;

  /**
   * Constructor del componente `DeLaMuestraComponent`.
   * 
   * Inicializa el formulario a través del `FormBuilder` de Angular.
   * 
   * @param {FormBuilder} fb - Inyecta el servicio `FormBuilder` para la creación del formulario.
   */
  constructor(private fb: FormBuilder) { }

  /**
   * Método que se ejecuta cuando se selecciona un valor en el catálogo de la mercancía.
   * Dependiendo de si el valor seleccionado es "Sí" o "No", habilita o deshabilita
   * el campo `follo` del formulario.
   * 
   * @param {Object} e - El objeto que contiene la descripción del valor seleccionado.
   * @param {string} e.descripcion - Descripción de la opción seleccionada (puede ser "Sí" o "No").
   * 
   * @example
   * // Deshabilitar el campo `follo` si se selecciona "No"
   * component.docSeleccionado({ descripcion: 'No' });
   */
  public docSeleccionado(e: { descripcion: string }): void {
    if (e.descripcion === 'No') {
      this.Informaciondela.get('datosImportadorExportador.follo')?.disable();
    } else {
      this.Informaciondela.get('datosImportadorExportador.follo')?.enable();
    }
  }

  /**
   * Método placeholder para la validación del formulario.
   * Este método no tiene implementación actualmente, pero puede ser extendido
   * para realizar validaciones adicionales antes de enviar el formulario.
   * 
   * @returns {void} No retorna nada, ya que es un método sin lógica por el momento.
   */
  validarFormulario(): void {
    // Este método puede incluir lógica de validación en el futuro.
  }

  /**
   * Método del ciclo de vida `ngOnInit()` de Angular.
   * 
   * Este método se ejecuta una vez que el componente ha sido inicializado.
   * Realiza las siguientes acciones:
   * - Llama al método `getMercancia()` para inicializar el objeto `mercancia`.
   * - Crea el formulario reactivo `FormSolicitud` y lo inicializa con un campo obligatorio `follo`.
   */
  ngOnInit(): void {
    this.getMercancia();
    this.Informaciondela = this.fb.group({
      datosImportadorExportador: this.fb.group({
        follo: ['', Validators.required],
      }),
    });
  }

  /**
   * Método que inicializa el objeto `mercancia` con un conjunto de datos predeterminados.
   * Estos datos son utilizados para llenar el catálogo de opciones disponibles para el usuario,
   * que incluyen "Sí" y "No" como posibles respuestas a una pregunta sobre el registro de muestras.
   * 
   * @returns {void} No retorna nada, ya que solo inicializa el objeto `mercancia`.
   * 
   * @example
   * component.getMercancia();
   */
  public getMercancia(): void {
    this.mercancia = {
      labelNombre: '¿El producto al que hace referencia a esta solicitud ha sido previamente inscrito en el registro para la toma de muestras?',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Si',
        },
        {
          id: 2,
          descripcion: 'No',
        },
      ],
    };
  }
}
