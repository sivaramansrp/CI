import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ENTREGAS_DE_MENSAJERIA, IDENTIFICACION_DE_LOS_EMPLEADOS, PERSONAL_DE_SEGURIDAD } from '../../constantes/constantes32613.enum';
import { InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

@Component({
  selector: 'controles-de-acceso-fisica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent,
    InputRadioComponent
  ],
  templateUrl: './controles-de-acceso-fisica.component.html',
  styleUrl: './controles-de-acceso-fisica.component.scss',
})
export class ControlesDeAccesoFisicaComponent implements AfterViewInit {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  public personalDeSeguridadFormData = PERSONAL_DE_SEGURIDAD;

  public identificacionDeLosEmpleadosFormData = IDENTIFICACION_DE_LOS_EMPLEADOS;

  public entregasDeMensajeriaFormData = ENTREGAS_DE_MENSAJERIA;

  public controlesDeAccesoFormGroup: FormGroup = new FormGroup({
    personalDeSeguridadFormGroup: new FormGroup({}),
    identificacionDeLosEmpleadosFormGroup: new FormGroup({}),
    elRegistroDeVisitantes: new FormControl(''),
    entregasDeMensajeriaFormGroup: new FormGroup({}),
  })

  /** Este getter devuelve el grupo de formularios anidado llamado `personalDeSeguridadFormGroup`*/
  get personalDeSeguridadFormGroup(): FormGroup {
    return this.controlesDeAccesoFormGroup.get('personalDeSeguridadFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `identificacionDeLosEmpleadosFormGroup`*/
  get identificacionDeLosEmpleadosFormGroup(): FormGroup {
    return this.controlesDeAccesoFormGroup.get('identificacionDeLosEmpleadosFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `entregasDeMensajeriaFormGroup`*/
  get entregasDeMensajeriaFormGroup(): FormGroup {
    return this.controlesDeAccesoFormGroup.get('entregasDeMensajeriaFormGroup') as FormGroup;
  }

  public templateMap: Record<string, TemplateRef<unknown>> = {};

  /** Modelo para la opción de tipo sí/no representado como radio button */
  public sinoOpciones = [
    {
      "label": "Si",
      "value": 1
    },
    {
      "label": "No",
      "value": 2
    }
  ];

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.templateMap = {
        customSection1: this.customTemplate1,
        customSection2: this.customTemplate2
      };
    });
  }


  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    //
  }

  // eslint-disable-next-line class-methods-use-this
  cambioRegistroDeVisitantes(event: string | number): void {
    if (event) {
      // console.log(event);
    }
  }
}
