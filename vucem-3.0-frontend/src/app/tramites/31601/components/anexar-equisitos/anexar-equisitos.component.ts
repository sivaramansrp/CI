import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import documentosTable from '../../../../../assets/json/31601/anexar.json'


/**
 * @Component - AnexarRequisitosComponent
 *
 * Este componente proporciona funcionalidad para adjuntar (anexar) los documentos requeridos.
 * Incluye un formulario con un desplegable para seleccionar un documento y un campo de entrada de archivo
 * para cargar un archivo relacionado con el documento seleccionado.
 */
@Component({
  selector: 'app-anexar-equisitos',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './anexar-equisitos.component.html',
  styleUrl: './anexar-equisitos.component.scss'
})
export class AnexarEquisitosComponent implements OnInit {
  /**
     *Formar grupo para el componente anexar-equisitos.
     * Este grupo de formulario se utiliza para administrar los controles del formulario y sus valores, 
     *validación y estatus del componente anexar-equisitos.
     */
  anexarForm!: FormGroup;
  /**
     * Relación de documentos del componente anexar-equisitos.
     * Esta lista se completa a partir de un archivo JSON externo.
     */
  documentos = documentosTable.documentos

  /**
     * Constructor para AnexarEquisitosComponent.
     * @param fb: instancia de FormBuilder utilizada para crear controles de formulario.
     */
  constructor(private fb: FormBuilder) {
  }
  /**
     * Enlace de ciclo de vida que se llama después de que se inicializan las propiedades vinculadas a datos de una directiva.
     * Inicializa el componente llamando al método `anexarEquisitosForm`.
     *
     */
  ngOnInit(): void {
    this.anexarEquisitosForm()
  }

  /**
     * Inicializa el grupo de formularios `anexarForm` con un único control de formulario `valorSeleccionado`.
     * El control de formulario se inicializa con una cadena vacía como valor predeterminado.
     *
     * @returns {nulo}
     */

  anexarEquisitosForm(): void {
    this.anexarForm = this.fb.group({
      valorSeleccionado: ['']
    });
  }
  /**
     * Maneja el evento de cambio de un elemento de entrada de archivo.
     * Actualiza el control del formulario 'valorSeleccionado' con el valor del archivo seleccionado.
     *
     * Evento @param: el objeto de evento del evento de cambio de entrada del archivo.
     */
  cambioDeArchivo(event: any): void {
    this.anexarForm.patchValue({ valorSeleccionado: event.target.value });
  }
}
