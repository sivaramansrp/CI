import { CRITERIO_DE_SELECCION, REQUERIMIENTOS_EN_SEGURIDAD, REVISIONS_OF_COMMERCIAL_PARTNERS } from '../../constantes/constantes32613.enum';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'socios-comercials',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent
  ],
  templateUrl: './socios-comercials.component.html',
  styleUrl: './socios-comercials.component.scss',
})
export class SociosComercialsComponent {

  public criteriosDeSeleccionFormData = CRITERIO_DE_SELECCION;

  public requerimientosEnSeguridadFormData = REQUERIMIENTOS_EN_SEGURIDAD;

  public revisionesDelSocioComercialFormData = REVISIONS_OF_COMMERCIAL_PARTNERS;

  public sociosComericialsForm = new FormGroup({
    criteriosDeSeleccionFormGroup: new FormGroup({}),
    requerimientosEnSeguridadFormGroup: new FormGroup({}),
    revisionesDelSocioComercialFormGroup: new FormGroup({}),
  })

  /** Este getter devuelve el grupo de formularios anidado llamado `criteriosDeSeleccionFormGroup`*/
  get criteriosDeSeleccionFormGroup(): FormGroup {
    return this.sociosComericialsForm.get('criteriosDeSeleccionFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `requerimientosEnSeguridadFormGroup`*/
  get requerimientosEnSeguridadFormGroup(): FormGroup {
    return this.sociosComericialsForm.get('requerimientosEnSeguridadFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `revisionesDelSocioComercialFormGroup`*/
  get revisionesDelSocioComercialFormGroup(): FormGroup {
    return this.sociosComericialsForm.get('revisionesDelSocioComercialFormGroup') as FormGroup;
  }

  // eslint-disable-next-line class-methods-use-this
  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    //
  }
}
