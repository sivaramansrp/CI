import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import {
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

// eslint-disable-next-line @nx/enforce-module-boundaries
import radioJson from 'libs/shared/theme/assets/json/260401/radioSiNo.json';

import { MANIFIESTOS_DECLARACION } from '../../constantes/aviso-de-funcionamiento.enum';

import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';
@Component({
  selector: 'app-manifiestos-representante-seccion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    FormsModule,
  ],
  templateUrl: './manifiestos-representante-seccion.component.html',
  styleUrl: './manifiestos-representante-seccion.component.scss',
})
export class ManifiestosRepresentanteSeccionComponent implements OnInit , OnDestroy {
  private destroy$ = new Subject<void>();
  informacionConfidencialRadioOption = radioJson;
  constructor(private fb: FormBuilder,
    private representanteStore:DatosDelSolicituteSeccionStateStore,
    private representanteQuery: DatosDelSolicituteSeccionQuery,
  ) {}
  manifiestosRepresentanteForm!: FormGroup;
  ngOnInit() :void{
    this.manifiestosText = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.manifiestosRepresentanteForm = this.fb.group({
  representanteRfc: ['', Validators.required],
      manifests: ['', Validators.required],
      informacionConfidencialRadio: ['', Validators.required],
      representanteNombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
    });

     // Load the state into the form
     this.representanteQuery.select().pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.manifiestosRepresentanteForm.patchValue(state);
    });

    // Update the store whenever the form changes
    this.manifiestosRepresentanteForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.representanteStore.update(value);
    });
  }

  manifiestosText: string = '';
  buscarRepresentanteRfc(): void {
    const RFC =
      this.manifiestosRepresentanteForm.get('representanteRfc')?.value;
    if (RFC) {
      this.manifiestosRepresentanteForm.patchValue({
        representanteNombre: 'EUROFOODS DE MEXICO',
        apellidoPaterno: 'GONZALEZ',
        apellidoMaterno: 'PINAL',
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
