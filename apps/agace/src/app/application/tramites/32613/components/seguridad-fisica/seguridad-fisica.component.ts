import { ACCESO_EN_PUERTAS, ALUMBRADO, APARATOS, BARDAS_PERIMETRALES, CONTROL_DE_LLAVES, ESTACIONAMIENTOS, INSTALACIONES, SISTEMAS_DE_ALARMA } from '../../constantes/constantes32613.enum';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'seguridad-fisica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent
  ],
  templateUrl: './seguridad-fisica.component.html',
  styleUrl: './seguridad-fisica.component.scss',
})
export class SeguridadFisicaComponent implements AfterViewInit {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  public instalacionesFormData = INSTALACIONES;

  public accesosEnPuertasFormData = ACCESO_EN_PUERTAS;

  public bardasPerimetralesFormData = BARDAS_PERIMETRALES;

  public estacionamientosFormData = ESTACIONAMIENTOS;

  public controlDeLlavesFormData = CONTROL_DE_LLAVES;

  public alumbradoFormData = ALUMBRADO;

  public aparatosFormData = APARATOS;

  public sistemasDeAlarmaFormData = SISTEMAS_DE_ALARMA;

  public seguridadFisicaForm: FormGroup = new FormGroup({
    instalacionesFormGroup: new FormGroup({}),
    accesosEnPuertasFormGroup: new FormGroup({}),
    bardasPerimetralesFormGroup: new FormGroup({}),
    estacionamientosFormGroup: new FormGroup({}),
    controlDeLlavesFormGroup: new FormGroup({}),
    alumbradoFormGroup: new FormGroup({}),
    aparatosFormGroup: new FormGroup({}),
    sistemasDeAlarmaFormGroup: new FormGroup({}),
  })

  /** Este getter devuelve el grupo de formularios anidado llamado `instalacionesFormGroup`*/
  get instalacionesFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('instalacionesFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `accesosEnPuertasFormGroup`*/
  get accesosEnPuertasFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('accesosEnPuertasFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `bardasPerimetralesFormGroup`*/
  get bardasPerimetralesFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('bardasPerimetralesFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `estacionamientosFormGroup`*/
  get estacionamientosFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('estacionamientosFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `controlDeLlavesFormGroup`*/
  get controlDeLlavesFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('controlDeLlavesFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `alumbradoFormGroup`*/
  get alumbradoFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('alumbradoFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `aparatosFormGroup`*/
  get aparatosFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('aparatosFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `sistemasDeAlarmaFormGroup`*/
  get sistemasDeAlarmaFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('sistemasDeAlarmaFormGroup') as FormGroup;
  }

  public templateMap: Record<string, TemplateRef<unknown>> = {}; 

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.templateMap = {
        customSection1: this.customTemplate1,
        customSection2: this.customTemplate2
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    //
  }
}
