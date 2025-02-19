import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import documentosTable from '../../../../../assets/json/31601/anexar.json'
@Component({
  selector: 'app-anexar-equisitos',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './anexar-equisitos.component.html',
  styleUrl: './anexar-equisitos.component.scss'
})
export class AnexarEquisitosComponent implements OnInit {
  anexarForm: FormGroup;
  documentos = documentosTable.documentos

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.anexarEquisitosForm()
  }

  anexarEquisitosForm() {
    this.anexarForm = this.fb.group({
      valorSeleccionado: new FormControl('') 
    });
  }

  cambioDeArchivo(event: any): void {
    this.anexarForm.patchValue({ valorSeleccionado: event.target.value });
  }
}
