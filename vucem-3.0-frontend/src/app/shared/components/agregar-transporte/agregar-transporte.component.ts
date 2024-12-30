import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectCatalogosComponent } from '../select-catalogos/select-catalogos.component';
import { ServiciosExtraordinariosService } from './../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { TablaComponent } from '../tabla/tabla.component';
import { Catalogo } from '../../../core/models/5701/catalogos.model';
import * as CONSTANTES from '../../constantes/formularios-transportes.enums';
import { CampoForm } from '../../../core/models/shared/forms-model';
import { InputFechaComponent } from "../input-fecha/input-fecha.component";
@Component({
  selector: 'agregar-transporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectCatalogosComponent,
    TablaComponent,
    InputFechaComponent
],
  templateUrl: './agregar-transporte.component.html',
  styleUrl: './agregar-transporte.component.scss',
})
export class AgregarTransporteComponent {
  datos_tipos_transporte!: CatalogosSelect;

  FormTransporte!: FormGroup;
  tipo_transporte!: Catalogo;
  campos_formulario!: Array<CampoForm>;

  constructor(
    private fb: FormBuilder,
    private sExtraordinarios: ServiciosExtraordinariosService
  ) {
    this.crearFormTransporte();
  }

  crearFormTransporte() {
    this.FormTransporte = this.fb.group({});
  }

  tipoTransporte(e: Catalogo) {
    this.tipo_transporte = e;
  }

  crearFormulario() {
    this.campos_formulario = CONSTANTES.CARRETERO;
    console.log(this.campos_formulario);

    this.agregarCamposAlForm(this.campos_formulario);
    console.log(this.FormTransporte);
  }

  agregarCamposAlForm(campos: Array<CampoForm>) {
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

  ngOnInit() {
    this.getTiposTransporte();
  }

  getTiposTransporte() {
    this.sExtraordinarios
      .getCatalogos('cat-tipo-transporte.json')
      .subscribe((resp) => {
        if (resp.code === 200) {
          const tipos_solicitud = resp.data;
          this.datos_tipos_transporte = {
            labelNombre: 'Tipo de transporte',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: tipos_solicitud,
          };

          console.log(this.datos_tipos_transporte);
        }
      });
  }
}
