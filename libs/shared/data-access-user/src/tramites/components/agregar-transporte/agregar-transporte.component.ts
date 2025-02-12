import * as CONSTANTES from '../../constantes/formularios-transportes.enums';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CampoForm } from '../../../core/models/shared/forms-model';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { CatalogosService } from '../../../core/services/shared/catalogos/catalogos.service';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from '../input-fecha/input-fecha.component';
import { SelectCatalogosComponent } from '../select-catalogos/select-catalogos.component';
@Component({
  selector: 'agregar-transporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectCatalogosComponent,
    InputFechaComponent,
  ],
  templateUrl: './agregar-transporte.component.html',
  styleUrl: './agregar-transporte.component.scss',
})
export class AgregarTransporteComponent implements OnInit {
  @Input({ required: true }) tipo!: string;

  datosTiposTransporte!: CatalogosSelect;

  FormTransporte!: FormGroup;
  tipoTransporteSeleccionado!: Catalogo;
  camposFormulario!: CampoForm[];

  constructor(
    private fb: FormBuilder,
    private catalogosServices: CatalogosService
  ) {
    this.crearFormTransporte();
  }

  ngOnInit():void {
    this.getTiposTransporte();
  }

  crearFormTransporte() {
    this.FormTransporte = this.fb.group({});
  }

  tipoTransporte(e: Catalogo) {
    this.tipoTransporteSeleccionado = e;
  }

  crearFormulario() {

    switch (this.tipoTransporteSeleccionado.id) {
      case 1:
        this.camposFormulario = CONSTANTES.CARRETERO;
        break;

      case 2:

        this.camposFormulario = CONSTANTES.FERROVIARIO;

        break;

      case 3:
        break;
      case 4:
        break;

      default:
        break;
    }


    this.agregarCamposAlForm(this.camposFormulario);
  }

  agregarCamposAlForm(campos: CampoForm[]) {
    campos.forEach((campo: CampoForm) => {
      this.FormTransporte.addControl(campo.campo, this.fb.control(''));
    });

    // Tipo de trasporte
    // 1 - Carretero
    // 2 - Ferroviario
    // 3 - Aereo
    // 4 - Maritimo
    // 5 - Peatonal
    // 6 - Otro
  }

  getTiposTransporte() {
    this.catalogosServices
      .getCatalogos('cat-tipo-transporte.json')
      .subscribe((resp) => {
        if (resp.code === 200) {
          const response = resp.data;
          const tiposTransporte: Catalogo[] = [];


          response.forEach((el) => {

            if (this.tipo == 'despacho') {

              if (el.id !== 3 && el.id !== 4) {
                tiposTransporte.push(el);
              }
            }
          });


          this.datosTiposTransporte = {
            labelNombre: 'Tipo de transporte',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };

        }
      });
  }
}
