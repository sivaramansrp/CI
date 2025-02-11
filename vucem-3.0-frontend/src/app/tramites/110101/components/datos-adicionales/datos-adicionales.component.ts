/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { PROTESTA } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';


/**
* Este componente se utiliza para mostrar la forma del datos adicionales. - 110101
*/
@Component({
  selector: 'app-datos-adicionales',
  templateUrl: './datos-adicionales.component.html',
  styleUrl: './datos-adicionales.component.scss',
  standalone: true,
  imports: [TituloComponent,
    CommonModule,
    AlertComponent,
    SelectCatalogosComponent,
    ReactiveFormsModule]
})
export class DatosAdicionalesComponent implements OnInit {

  /**
   * Representa la entidad seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'CatalogosSelect'.
   *
   * @property {CatalogosSelect} entidad - La entidad seleccionada.
   */
  public entidad!: CatalogosSelect;

  /**
   * Representa la representación seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'CatalogosSelect'.
   *
   * @property {CatalogosSelect} representacion - La representación seleccionada.
   */

  public representacion!: CatalogosSelect;
  /**
    * Una cadena que representa la clase CSS para una alerta de información.
    * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
    */
  public infoAlert = 'alert-info';
  /**
    * Una constante que contiene el valor del objeto 'PROTESTA'.
    * Se utiliza para almacenar datos adicionales relacionados con el componente.
    */
  TEXTOS = PROTESTA;
  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(private fb: FormBuilder,
    // eslint-disable-next-line no-empty-function
    private validacionesService: ValidacionesFormularioService) {
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
  }

  /**
   * Recupera y establece la información de la entidad federativa.
   * El objeto de entidad incluye el nombre de la etiqueta, el estado requerido, la opción predeterminada,
   * y un catálogo de opciones disponibles.
   *
   * @returns {void}
   */
  public getEntidadFederativa(): void {
    this.entidad = {
      labelNombre: 'Entidad federativa',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'SINALOA',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        }
      ],
    };
  }

  /**
   * Recupera y establece la información de la entidad federativa.
   * El objeto de entidad incluye el nombre de la etiqueta, el estado requerido, la opción predeterminada,
   * y un catálogo de opciones disponibles.
   *
   * @returns {void}
   */
  public getRepresentacionFederal(): void {
    this.representacion = {
      labelNombre: 'Representación federal',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'CULIACAN',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        }
      ],
    };
  }

  /**
  * Método para validar la representación federal.
  * @param _e - Objeto de tipo 'Catalogo'.
  * @returns {void}
  */
  // eslint-disable-next-line class-methods-use-this
  public docSeleccionado(_e: Catalogo): void {
    // this is a dynamic function once we get the api will implement it
  }

  /**
   * Método para validar la representación federal.
   * @param _e - Objeto de tipo 'Catalogo'.
   * @returns {void}
   */

  // eslint-disable-next-line class-methods-use-this
  public validarRepresentacionFederalIDCSECEROR_(_e: Catalogo): void {
    // this is a dynamic function once we get the api will implement it

  }
}
