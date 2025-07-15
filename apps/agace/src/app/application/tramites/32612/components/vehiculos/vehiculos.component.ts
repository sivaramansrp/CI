import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_VEHICULOS } from '../../constants/texto-estatico.enum';
import { CONFIGURACION_ADUANAL_CUENTA, CONFIGURACION_ANEXE_PROCEDIMIENTO, CONFIGURACION_CONSERVARSE, CONFIGURACION_PROCEDIMIENTO, CONFIGURACION_SELLOS } from '../../constants/vehiculos.enum';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent {

  public textos = TEXTOS_ESTATICOS_VEHICULOS;
  public forma: FormGroup = new FormGroup({
    sellosFormGroup: new FormGroup({}),
    procedimientoFormGroup: new FormGroup({}),
    anexeElProcedimientoFormGroup: new FormGroup({}),
    aduanalCuentaFormGroup: new FormGroup({}),
    conservarseFormGroup: new FormGroup({})
  });

  public sellosDatos = CONFIGURACION_SELLOS;
  public procedimientoDatos = CONFIGURACION_PROCEDIMIENTO;
  public anexeProcedimientoDatos = CONFIGURACION_ANEXE_PROCEDIMIENTO;
  public aduanalCuentaDatos = CONFIGURACION_ADUANAL_CUENTA;
  public conservarseDatos = CONFIGURACION_CONSERVARSE;

  constructor() {}

  ngOnInit(): void {}

  get sellosFormGroup(): FormGroup {
    return this.forma.get('sellosFormGroup') as FormGroup;
  }

  get procedimientoFormGroup(): FormGroup {
    return this.forma.get('procedimientoFormGroup') as FormGroup;
  }
  get anexeElProcedimientoFormGroup(): FormGroup {
    return this.forma.get('anexeElProcedimientoFormGroup') as FormGroup;
  }
  get aduanalCuentaFormGroup(): FormGroup {
    return this.forma.get('aduanalCuentaFormGroup') as FormGroup;
  }
  get conservarseFormGroup(): FormGroup {
    return this.forma.get('conservarseFormGroup') as FormGroup;
  }



}
