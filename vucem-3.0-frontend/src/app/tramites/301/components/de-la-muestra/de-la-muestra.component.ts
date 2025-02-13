import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';

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
  imports: [ TituloComponent, SelectCatalogosComponent, ReactiveFormsModule,CatalogoSelectComponent],
  standalone: true
})
export class DeLaMuestraComponent implements OnInit {

  /** 
   * Objeto que contiene los datos del catálogo relacionados con la mercancía.
   * 
   * @type {CatalogosSelect}
   */
  public mercancia!: Catalogo[];

  /** 
   * Formulario reactivo que contiene los datos de la solicitud.
   * Incluye el campo obligatorio `folio` dentro de `datosImportadorExportador`.
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
   * - Crea el formulario reactivo `FormSolicitud` y lo inicializa con un campo obligatorio `folio`.
   */
  ngOnInit(): void {
    this.getMercancia();
    this.Informaciondela = this.fb.group({
      datosImportadorExportador: this.fb.group({
        folio: ['', Validators.required],
        mercancia: ['', Validators.required],
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
    this.mercancia = [ { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
   
    ];
  }
 

  mercanciaSeleccion(): void {
if(this.Informaciondela.get('datosImportadorExportador.mercancia')?.value === '2'){
  this.Informaciondela.get('datosImportadorExportador.folio')?.disable();
} else {
  this.Informaciondela.get('datosImportadorExportador.folio')?.enable();
}

}
}


