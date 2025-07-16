import { ANALISIS_DE_RIESGO, AUDITORIAS_INTERNAS, PLANES_DE_CONTINGENCIA, POLITICAS_DE_SEGURIDAD } from '../../constantes/constantes32613.enum';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'planeacion-de-la-seguridad',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent
  ],
  templateUrl: './planeacion-de-la-seguridad.component.html',
  styleUrl: './planeacion-de-la-seguridad.component.scss',
})
export class PlaneacionDeLaSeguridadComponent implements AfterViewInit {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  public analisisDeRiesgoFormData = ANALISIS_DE_RIESGO;

  public politicasDeSeguridadFormData = POLITICAS_DE_SEGURIDAD;

  public auditoriasInternasFormData = AUDITORIAS_INTERNAS;

  public planesDeContingenciaFormData = PLANES_DE_CONTINGENCIA;

  public planeacionSeguridadForm: FormGroup = new FormGroup({
    analisisDeRiesgoFormGroup: new FormGroup({}),
    politicasDeSeguridadFormGroup:  new FormGroup({}),
    auditoriasInternasFormGroup:  new FormGroup({}),
    planesDeContingenciaFormGroup:  new FormGroup({}),
  });

  /** Este getter devuelve el grupo de formularios anidado llamado `analisisDeRiesgoFormGroup`*/
  get analisisDeRiesgoFormGroup(): FormGroup {
    return this.planeacionSeguridadForm.get('analisisDeRiesgoFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `politicasDeSeguridadFormGroup`*/
  get politicasDeSeguridadFormGroup(): FormGroup {
    return this.planeacionSeguridadForm.get('politicasDeSeguridadFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `auditoriasInternasFormGroup`*/
  get auditoriasInternasFormGroup(): FormGroup {
    return this.planeacionSeguridadForm.get('auditoriasInternasFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `planesDeContingenciaFormGroup`*/
  get planesDeContingenciaFormGroup(): FormGroup {
    return this.planeacionSeguridadForm.get('planesDeContingenciaFormGroup') as FormGroup;
  }

  public templateMap: Record<string, TemplateRef<unknown>> = {}; 

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.templateMap = {
        customSection1: this.customTemplate1
      };
    });
  }

  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    //
  }
}
