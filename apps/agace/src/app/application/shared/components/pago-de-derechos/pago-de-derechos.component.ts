import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { PAGO_DE_DERECHOS } from '../../constants/pago-de-derechos.enum';

@Component({
  selector: 'pago-de-derechos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent {

  @Output() emitirCambioValor = new EventEmitter<{ campo: string; valor: string | number | object }>();
  
  public pagoDerechosForm: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
  });

  /** Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`*/
  get ninoFormGroup(): FormGroup {
    return this.pagoDerechosForm.get('ninoFormGroup') as FormGroup;
  }

  public pagoDerechosFormData = PAGO_DE_DERECHOS;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    //
  }

  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    this.emitirCambioValor.emit({
    campo: event.campo,
    valor: event.valor
    });
  }

  borrar(): void {
    this.pagoDerechosForm.reset();
  }

}
