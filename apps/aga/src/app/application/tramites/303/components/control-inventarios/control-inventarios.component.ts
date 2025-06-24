import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventario } from '@ng-mf/data-access-user';
import { TEXTOS_303 } from '@ng-mf/data-access-user';

@Component({
  selector: 'control-inventarios',
  templateUrl: './control-inventarios.component.html',
  styleUrl: './control-inventarios.component.scss'
})
export class ControlInventariosComponent {
  modal: string = 'modal';
  TEXTOS = TEXTOS_303;
  inventarios: Array<Inventario> = [];
  @ViewChild('closeModal') closeModal!: ElementRef;
  formInventarios: FormGroup = this.fb.group({
      identificacion: ['', [Validators.required]],
      radicacion:['', [Validators.required]],
      conformeAnexo: ['', [Validators.required]],

  });
    constructor(private fb: FormBuilder,
    ) {}
  
    abrirModal(): void {
      this.modal = 'show';
    }
  
    cerrarModal(): void { 
      this.closeModal.nativeElement.click();
      
    }

    agregarInventario(): void {  
      if(!this.formInventarios.valid) {
        return;
      }
      const INVENTARIO = this.formInventarios.value;
      this.inventarios.push(INVENTARIO);
      this.formInventarios.reset();
      this.cerrarModal();
    }
}
