import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';

@Component({
  selector: 'app-responsable-inspeccion-en-punto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TituloComponent,
    SelectCatalogosComponent
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './responsable-inspeccion-en-punto.component.html',
  styleUrl: './responsable-inspeccion-en-punto.component.scss',
})
export class ResponsableInspeccionEnPuntoComponent
  implements OnInit, OnDestroy
{
  @Input() controlKey: string = '';
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  /**
   * Datos del catálogo de régimen de mercancía.
   */
  datosRegimenMercancia!: CatalogosSelect;

  /**
   * Régimen de mercancía seleccionado.
   */
  regimenMercanciaSeleccionada!: Catalogo;

  // constructor(private peximService: PeximService){}
  ngOnInit() {
    if (this.controlKey) {
      this.parentFormGroup.addControl(
        this.controlKey,
        new FormGroup({
          nombre: new FormControl('', [Validators.required]),
          primerapellido: new FormControl('', [Validators.required]),
          segyndoapellido: new FormControl('', [Validators.required]),
          mercancía: new FormControl('', [Validators.required]),
          tipocontenedor: new FormControl('', [Validators.required]),
        })
      );
    }
    this.getRegimenMercancia();
  }

  /**
   * Método para seleccionar el régimen de mercancía.
   * @param e Régimen de mercancía seleccionado.
   */
  regimenMercancia(e: Catalogo): void {
    this.regimenMercanciaSeleccionada = e;
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        tipocontenedor: e.descripcion,
      });
    }
  }

  /**
   * Método para obtener el catálogo de régimen de mercancía.
   */
  getRegimenMercancia(): void {
    this.datosRegimenMercancia = {
      labelNombre: 'Tipo contenedor:',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Tipo contenedor 1',
          tam: 'Tipo contenedor 1',
          dpi: 'Tipo contenedor 1',
        },
        {
          id: 2,
          descripcion: 'Tipo contenedor 2',
          tam: 'Tipo contenedor 2',
          dpi: 'Tipo contenedor 2',
        },
        {
          id: 3,
          descripcion: 'Tipo contenedor 3',
          tam: 'Tipo contenedor 3',
          dpi: 'Tipo contenedor 3',
        },
      ],
    };
  }

  ngOnDestroy() {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }
}
