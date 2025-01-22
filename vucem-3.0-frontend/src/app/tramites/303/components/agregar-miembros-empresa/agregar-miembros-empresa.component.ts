import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Miembro } from '../../../../core/models/303/secciones.model';

@Component({
  selector: 'agregar-miembros-empresa',
  templateUrl: './agregar-miembros-empresa.component.html',
  styleUrl: './agregar-miembros-empresa.component.scss'
})
export class AgregarMiembrosEmpresaComponent {
  modal: string = 'modal';
  miembros: Array<Miembro> = [];
  @ViewChild('closeModal') closeModal!: ElementRef;
  formMiembros: FormGroup = this.fb.group({
      tipoPersona:['', [Validators.required]],
      nombre: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
      caracter: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      tributar: ['', [Validators.required]],
      nombreEmpresa: ['', [Validators.required]],

  });
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  abrirModal() {
    this.modal = 'show';
  }

  cerrarModal() { 
    this.closeModal.nativeElement.click();
    
  }

  agregarMiembro() {
    if(!this.formMiembros.valid) {
      return;
    }
    const miembro = this.formMiembros.value;
    this.miembros.push(miembro);
    this.formMiembros.reset();
    this.cerrarModal();
  }
      

}
