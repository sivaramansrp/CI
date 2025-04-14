import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DEPOSITO_FISCAL, ELABORACION, IMPORTACION_TEMPORAL, INDIQUE_SI_REALIZA, RECINTO_FISCALIZADO } from '../../constantes/datos-por-regimen.enum';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { ConceptosComponent } from '../conceptos/conceptos.component';


@Component({
  selector: 'app-datos-por-regimen',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    InputRadioComponent,
    ConceptosComponent
  ],
  templateUrl: './datos-por-regimen.component.html',
  styleUrl: './datos-por-regimen.component.scss',
})
export class DatosPorRegimenComponent implements OnInit {


  public importacionesForm!: FormGroup;
  public radioOpcions = radio_si_no;
  public valorSeleccionado: string | number = '';
  public indiqueSiForma: FormGroup = new FormGroup({
    importacionTemporalFormGroup: new FormGroup({})
  });
  public depositoFiscalForma: FormGroup = new FormGroup({
    depositoFiscalFormGroup: new FormGroup({})
  });
  public elaboracionForma: FormGroup = new FormGroup({
    elaboracionFormGroup: new FormGroup({})
  });
  public recintoForma: FormGroup = new FormGroup({
    recintoFiscalizadoFormGroup: new FormGroup({})
  });
  public indiqueSiFormDatos = INDIQUE_SI_REALIZA;
  public importacionTemporalDatos = IMPORTACION_TEMPORAL;
  public depositoFiscalDatos = DEPOSITO_FISCAL;
  public elaboracionDatos = ELABORACION;
  public recintoFiscalizadoDatos = RECINTO_FISCALIZADO;

  constructor(
    private fb: FormBuilder
  ) {
    //
  }

  ngOnInit(): void {
    this.importacionesForm = this.fb.group({
      importaciones: ['']
    });
  }

  get importacionTemporalFormGroup(): FormGroup {
    return this.indiqueSiForma.get('importacionTemporalFormGroup') as FormGroup;
  }

  get depositoFiscalFormGroup(): FormGroup {
    return this.depositoFiscalForma.get('depositoFiscalFormGroup') as FormGroup;
  }

  get elaboracionFormGroup(): FormGroup {
    return this.elaboracionForma.get('elaboracionFormGroup') as FormGroup;
  }

  get recintoFiscalizadoFormGroup(): FormGroup {
    return this.recintoForma.get('recintoFiscalizadoFormGroup') as FormGroup;
  }

  public onImportacionesCambio(value: string | number): void {
    this.valorSeleccionado = value;
  }


}
