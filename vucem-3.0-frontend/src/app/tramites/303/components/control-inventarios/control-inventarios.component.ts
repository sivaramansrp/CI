import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Inventario } from '../../../../core/models/303/secciones.model';
import { TEXTOS } from '../../../../shared/constantes/303/texto.enum';

@Component({
  selector: 'control-inventarios',
  templateUrl: './control-inventarios.component.html',
  styleUrl: './control-inventarios.component.scss'
})
export class ControlInventariosComponent {
  modal: string = 'modal';
  TEXTOS = TEXTOS;
  inventarios: Array<Inventario> = [];
  @ViewChild('closeModal') closeModal!: ElementRef;
  formInventarios: FormGroup = this.fb.group({
      identificacion: ['', [Validators.required]],
      radicacion:['', [Validators.required]],
      conformeAnexo: ['', [Validators.required]],

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

    agregarInventario() {  
      if(!this.formInventarios.valid) {
        return;
      }
      const inventario = this.formInventarios.value;
      this.inventarios.push(inventario);
      this.formInventarios.reset();
      this.cerrarModal();
    }
}
