import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import documentosTable from '../../../../../assets/json/31601/anexar.json'


/**
 * @Component - AnexarRequisitosComponent
 *
 * This component provides functionality to attach (anexar) required documents.
 * It includes a form with a dropdown to select a document and a file input field
 * for uploading a file related to the selected document.
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
   * Form group for the anexar-equisitos component.
   * This form group is used to manage the form controls and their values, 
   * validation, and status for the anexar-equisitos component.
   */
  anexarForm!: FormGroup;
/**
   * List of documents for the anexar-equisitos component.
   * This list is populated from an external JSON file.
   */
  documentos = documentosTable.documentos

 /**
   * Constructor for AnexarEquisitosComponent.
   * @param fb - FormBuilder instance used to create form controls.
   */
  constructor(private fb: FormBuilder) {
  }
/**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by calling the `anexarEquisitosForm` method.
   *
   */
  ngOnInit(): void {
    this.anexarEquisitosForm()
  }

/**
   * Initializes the form group `anexarForm` with a single form control `valorSeleccionado`.
   * The form control is initialized with an empty string as its default value.
   *
   * @returns {void}
   */

  anexarEquisitosForm():void {
    this.anexarForm = this.fb.group({
      valorSeleccionado: [''] 
        });
  }
/**
   * Handles the change event of a file input element.
   * Updates the form control 'valorSeleccionado' with the selected file's value.
   *
   * @param event - The event object from the file input change event.
   */
  cambioDeArchivo(event: any): void {
    this.anexarForm.patchValue({ valorSeleccionado: event.target.value });
  }
}
