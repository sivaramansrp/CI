/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../terceros-relacionados/terceros-relacionados.component';

@Component({
  selector: 'app-combinacion-requerida',
  templateUrl: './combinacion-requerida.component.html',
  standalone: true,
  imports: [SelectCatalogosComponent,TituloComponent,ReactiveFormsModule,CommonModule,TercerosRelacionadosComponent],
  styleUrl: './combinacion-requerida.component.scss'
})
export class CombinacionRequeridaComponent implements OnInit {

  public especie!: CatalogosSelect;
  public funcionZootecnica!: CatalogosSelect;
  public mercancia!: CatalogosSelect;
  public paisDestino!: CatalogosSelect;
  public nombreEstablecimiento!: CatalogosSelect;
  public tipoActividad!: CatalogosSelect;
  public aduanaSalida!: CatalogosSelect;
  public oisaSalida!: CatalogosSelect;
  public regimenMercancia!: CatalogosSelect;
  public paisOrigen!: CatalogosSelect;

  public formCombinacion!: FormGroup;
  
    constructor(private fb: FormBuilder,
                private validacionesService: ValidacionesFormularioService
    ) {
      this.crearFormCombinacion();
    }
  
    ngOnInit(): void {
      this.getEspecie();
      this.getFuncionZootecnica();
      this.getMercancia();
      this.getPaisDestino();
      this.getNombreEstablecimiento();
      this.getTipoActividad();
      this.getAduanaSalida();
      this.getOisaSalida();
      this.getRegimenMercancia();
      this.getPaisOrigen();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public isValid(field: string) {
      return this.validacionesService.isValid(this.formCombinacion,field);
    }

    /**
     * @description createFormMerge se utiliza para crear el formulario denominado formCombinacion
     * 
     */

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public crearFormCombinacion() {
      this.formCombinacion = this.fb.group({
        especie:[''],
        funcionZootecnica:[''],
        mercancia:[''],
        paisDestino:[''],
        nombreEstablecimiento:[''],
        tipoActividad:[''],
        otro: [''],
        aduanaSalida:[''],
        oisaSalida:[''],
        regimenMercancia:[''],
        paisOrigen:[''],
        fechaArribo:[''],
        puntoIngreso:['',[Validators.maxLength(200)]],
      });
    }
  
  /**
   * @description getPaisOrigen se utiliza para obtener los datos del menú desplegable de la opción de selección
   */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getPaisOrigen() {
      this.paisOrigen = {
        labelNombre: 'País de Origen',
        required: true,
        primerOpcion: 'MÉXICO (ESTADOS UNIDOS MEXICANOS)',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      };
    }
  
  /**
  * @description getRegimenMercancia se utiliza para obtener los datos del menú desplegable de la opción de selección
  */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getRegimenMercancia() {
      this.regimenMercancia = {
        labelNombre: 'Régimen al que se Destinará la Mercancía',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      };
    }
  
  /**
   * @description getOisaSalida se utiliza para obtener los datos del menú desplegable de la opción de selección
   */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getOisaSalida() {
      this.oisaSalida = {
        labelNombre: 'OISA de Salida',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      };
    }
  
  /**
   * @description getAduanaSalida se utiliza para obtener los datos del menú desplegable de la opción de selección
   */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getAduanaSalida() {
      this.aduanaSalida = {
        labelNombre: 'Aduana de Salida/Lugar de Embarque',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      };
    }
  

  /**
   * @description getTipoActividad se utiliza para obtener los datos del menú desplegable de la opción de selección
   */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getTipoActividad() {
      this.tipoActividad = {
        labelNombre: 'Tipo de Actividad del Establecimiento',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      };
    }

  /**
   * @description getNombreEstablecimiento se utiliza para obtener los datos del menú desplegable de la opción de selección
   */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getNombreEstablecimiento() {
      this.nombreEstablecimiento = {
        labelNombre: 'Nombre, Denominación o Razón Social',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
    }
  }

  /**
   * @description getPaisDestino se utiliza para obtener los datos del menú desplegable de la opción de selección
   */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getPaisDestino() {
      this.paisDestino = {
        labelNombre: 'País de destino',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      };
    }

  /**
   * @description getMercancia se utiliza para obtener los datos del menú desplegable de la opción de selección
   */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getMercancia() { 
      this.mercancia = { 
        labelNombre: 'Mercancía',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      }
    }

  /**
   * @description getEspecie se utiliza para obtener los datos del menú desplegable de la opción de selección
   */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getEspecie() {
      this.especie = {
        labelNombre: 'Especie',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      };
    }

    /**
     * @description getFuncionZootecnica se utiliza para obtener los datos del menú desplegable de la opción de selección
     */
  
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getFuncionZootecnica() {
      this.funcionZootecnica = {
        labelNombre: 'Función Zootécnica',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Opción 1',
          },
          {
            id: 2,
            descripcion: 'Opción 1',
          }
        ],
      };
    }
  
     // eslint-disable-next-line class-methods-use-this
     docSeleccionado(e: Catalogo): void {
      console.log(e);
    }

}
