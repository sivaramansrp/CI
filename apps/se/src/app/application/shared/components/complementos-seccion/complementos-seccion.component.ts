import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import {
  FORMA_COMPLIMENTOS_PROGRAMA,
  FORMA_COMPLIMENTOS_SOLICITUDE,
  FORMA_DATOS_GENERALES,
  FORMA_MODIFICACIONES_SOLICITUDE,
  FORMA_NACIONALIDAA_MAXICANA,
  FORMA_PERSONA_FISICA_FORM_DATA,
  FORMA_SI_NACIONALIDAA_MAXICANA,
  MANIFIESTOS_DECLARACION,
  OBLIGACIONES_FISCALES,
} from '../../constantes/complementos-seccion.enum';
import {
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { ComplementosSeccionService } from '../../services/complementos-seccion.service';

import { Subject, takeUntil } from 'rxjs';
import { NacionalidadMaxicana } from '../../models/complimentos-seccion.model';

@Component({
  selector: 'app-complementos-seccion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './complementos-seccion.component.html',
  styleUrls: ['./complementos-seccion.component.scss'],
})
export class ComplementosSeccionComponent implements OnDestroy, OnInit {
  constructor(private complementosSeccionService: ComplementosSeccionService,
    private fb: FormBuilder
  ) {}
  private destroy$ = new Subject<void>();
  accionistasRadio: NacionalidadMaxicana[] = [];
  tipoPersonaRadio: NacionalidadMaxicana[] = [];
  manifiestosText = MANIFIESTOS_DECLARACION.MANIFIESTOS;

  formaComplimentossolicitude: FormGroup = new FormGroup({});
  formaComplimentosPrograma: FormGroup = new FormGroup({});
  DatosGenerales: FormGroup = new FormGroup({});
  ObligacionesFiscales: FormGroup = new FormGroup({});
  formaModificaciones: FormGroup = new FormGroup({});
  formaAccionistas: FormGroup = new FormGroup({});
  formaNacionalidadMaxicana: FormGroup = new FormGroup({});
  public formaComplimentossolicitudeFormData = FORMA_COMPLIMENTOS_SOLICITUDE;
  public formaComplimentosProgramaFormData = FORMA_COMPLIMENTOS_PROGRAMA;
  public DatosGeneralesFormData = FORMA_DATOS_GENERALES;
  public ObligacionesFiscalesFormData = OBLIGACIONES_FISCALES;
  public formaModificacionesFormData = FORMA_MODIFICACIONES_SOLICITUDE;
  public formaNacionalidadMaxicanaFormData = FORMA_NACIONALIDAA_MAXICANA;
  public formaNacionalidadMaxicanaSiFormData = FORMA_SI_NACIONALIDAA_MAXICANA;
  public formaPersonaFisicaFormData = FORMA_PERSONA_FISICA_FORM_DATA;
//public formaAccionistasFormData = FORMA_AACIONISTAS;
activeTab: string = ''; // Tracks the currently active tab 
public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }
  
  ngOnInit(): void {
    this.formaAccionistas = this.fb.group({
      nacionalidadMexicana: ['No'], // FormControl for Nacionalidad mexicana
      tipoDePersona: ['Persona Moral'], // FormControl for Tipo de persona
    });
    this.getRadioJsonTipoPersona();
    this.getRadioJsonNacionalidad();
  }

  getRadioJsonNacionalidad(): void {
    this.complementosSeccionService
      .getNacionalidadMaxicanaData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: NacionalidadMaxicana[]) => {
        console.log('data', data);
        this.accionistasRadio = data;
      });
  }

  getRadioJsonTipoPersona(): void {
    this.complementosSeccionService
      .getTipoPersonaData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: NacionalidadMaxicana[]) => {
        console.log('data', data);
        this.tipoPersonaRadio = data;
      });
  }
  onRadioChange(): void {
    const nacionalidad = this.formaAccionistas.get('nacionalidadMexicana')?.value;
    const tipoPersona = this.formaAccionistas.get('tipoDePersona')?.value;
  console.log('tipoPersona', tipoPersona);
    if (nacionalidad === 'Si') {
      this.activeTab = 'Si';
    } else if (nacionalidad === 'No') {
      this.activeTab = 'No';
    } else if (tipoPersona === 'Persona fisica') {
      this.activeTab = 'Persona fisica';
    } else {
      this.activeTab = 'default'; // Default case
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
