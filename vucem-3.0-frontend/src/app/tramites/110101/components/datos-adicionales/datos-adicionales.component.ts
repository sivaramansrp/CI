/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { PROTESTA } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';


/**
* Este componente se utiliza para mostrar la forma del datos adicionales. - 110101
*/
@Component({
  selector: 'app-datos-adicionales',
  templateUrl: './datos-adicionales.component.html',
  styleUrl: './datos-adicionales.component.scss',
  standalone: true,
  imports: [TituloComponent,
            CommonModule,
            AlertComponent,
            SelectCatalogosComponent,
            ReactiveFormsModule]
})
export class DatosAdicionalesComponent {

  public entidad!: CatalogosSelect;
  public representacion!: CatalogosSelect;
  public infoAlert = 'alert-info';
  TEXTOS = PROTESTA;
  public representacionFederalForm!: FormGroup;



  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(private fb: FormBuilder,
              private validacionesService: ValidacionesFormularioService) {
  }

  ngOnInit(): void {
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
  }

  /**
   * @description getEntidadFederativa se usa para obtener datos del menú desplegable
   * @returns Devuelve la entidad junto con los datos del menú desplegable
   */

  public getEntidadFederativa() {
    this.entidad = {
      labelNombre: 'Entidad federativa',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'SINALOA',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        }
      ],
    };
  }

    /**
   * @description getRepresentacionFederal se usa para obtener datos del menú desplegable
   * @returns Devuelve la representacion junto con los datos del menú desplegable
   */

  public getRepresentacionFederal() {
    this.representacion = {
      labelNombre: 'Representación federal',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'CULIACAN',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        }
      ],
    };
  }

  

  public docSeleccionado(e: Catalogo) {
    // this is a dynamic function once we get the api will implement it
    
  }

  public validarRepresentacionFederalIDCSECEROR_(e: Catalogo) {
    // this is a dynamic function once we get the api will implement it
  }

}
