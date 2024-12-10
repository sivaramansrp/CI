import { Component } from '@angular/core';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  public FormDocumento: FormGroup = this.fb.group({
    documento: ['']
  })
  tiposDocumentos: Array<Catalogo> = [];
  documentosSeleccionados: Array<Catalogo> = [];

  constructor(private fb: FormBuilder) {}
  agregarDocumento() {
    const documento = this.FormDocumento.get('documento')?.value;
    console.log(documento)


  }

  eliminar(i: number) {}
}
