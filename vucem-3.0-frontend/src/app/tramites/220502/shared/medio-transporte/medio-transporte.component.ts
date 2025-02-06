import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { MERCANCIATABLADATA } from '../../../../core/models/220502/solicitud-pantallas.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';

@Component({
  selector: 'app-medio-transporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    SelectCatalogosComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './medio-transporte.component.html',
  styleUrl: './medio-transporte.component.scss',
})
export class MedioTransporteComponent implements OnInit, OnDestroy {
  @Input() controlKey: string = '';
  @Input() mercanciaTableData: MERCANCIATABLADATA;
  @Input() mediodetransporte!: CatalogosSelect;
  parentContainer = inject(ControlContainer);
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    if (this.controlKey) {
      this.parentFormGroup.addControl(
        this.controlKey,
        new FormGroup({
          transporteIdMedio: new FormControl('', [Validators.required]),
          identificacionTransporte: new FormControl('', [Validators.maxLength(30)]),
          esSolicitudFerros: new FormControl('', [Validators.required]),
          totalDeGuiasAmparadas: new FormControl('', [])
        })
      );
    }
  }

  selecctionMediodetransporte(e) {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        transporteIdMedio: e.descripcion,
      });
    }
  }

  ngOnDestroy() {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }
}
