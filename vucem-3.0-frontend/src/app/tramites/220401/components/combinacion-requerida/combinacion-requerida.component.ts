/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-combinacion-requerida',
  templateUrl: './combinacion-requerida.component.html',
  standalone: true,
  imports: [SelectCatalogosComponent,TituloComponent,ReactiveFormsModule,CommonModule],
  styleUrl: './combinacion-requerida.component.scss'
})
export class CombinacionRequeridaComponent {

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

    public isValid(field: string) {
      return this.validacionesService.isValid(this.formCombinacion,field);
    }

    public crearFormCombinacion() {
      this.formCombinacion =  this.fb.group({
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
  
    public docSeleccionado(e: Catalogo) {
      console.log(e);
    }

}
