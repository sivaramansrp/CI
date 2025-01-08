import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
import { Catalogo } from '../../../core/models/5701/catalogos.model';
import * as CONSTANTES from '../../constantes/formularios-transportes.enums';
import { CampoForm } from '../../../core/models/shared/forms-model';
import { InputFechaComponent } from '../input-fecha/input-fecha.component';
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
export class AgregarTransporteComponent {
  @Input({ required: true }) tipo!: string;

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

    switch (this.tipo_transporte.id) {
      case 1:
        this.campos_formulario = CONSTANTES.CARRETERO;
        break;

      case 2:

        this.campos_formulario = CONSTANTES.FERROVIARIO;

        break;

      case 3:
        break;
      case 4:
        break;

      default:
        break;
    }


    this.agregarCamposAlForm(this.campos_formulario);
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
          const response = resp.data;
          const tipos_transporte: Array<Catalogo> = [];


          response.forEach((el) => {

            if (this.tipo == 'despacho') {

              if (el.id !== 3 && el.id !== 4) {
                tipos_transporte.push(el);
              }
            }
          });


          this.datos_tipos_transporte = {
            labelNombre: 'Tipo de transporte',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };

        }
      });
  }
}
