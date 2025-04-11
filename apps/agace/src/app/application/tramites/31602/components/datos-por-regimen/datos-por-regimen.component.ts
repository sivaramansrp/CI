import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IMPORTACION_TEMPORAL, INDIQUE_SI_REALIZA } from '../../constantes/datos-por-regimen.enum';
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
  public indiqueSiFormDatos = INDIQUE_SI_REALIZA;
  public importacionTemporalDatos = IMPORTACION_TEMPORAL;

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

  public onImportacionesCambio(value: string | number): void {
    this.valorSeleccionado = value;
  }


}
