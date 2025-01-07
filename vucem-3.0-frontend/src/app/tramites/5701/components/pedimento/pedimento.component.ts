import { Component, computed, Input, input, output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { CommonModule } from '@angular/common';
import { SoloNumerosDirective } from '../../../../shared/directives/solo-numeros/solo-numeros.directive';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'c-pedimento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SharedModule],
  templateUrl: './pedimento.component.html',
  styleUrl: './pedimento.component.scss'
})
export class PedimentoComponent {
  @Input() validacion!: boolean;

  validaCampos = output<void>();

  pedimento: FormControl = new FormControl ('', [Validators.maxLength(7)]);



  constructor(private validacionesService : ValidacionesFormularioService){}

  get isValid() {
    return this.pedimento.errors && this.pedimento.touched;
  }


  ngOnChanges(changes: SimpleChanges) {
    if ( changes['validacion'] ) {
      this.validacion = changes['validacion'].currentValue;
      this.acciones();
    }
  }

  agregaPedimento() {
    this.validaCampos.emit();
  }

  acciones() {
    if (this.validacion) {
      console.log('Muestro la tabla');
    } else {


    }
  }






}
