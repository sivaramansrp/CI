import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CONFIGURACION_DOMICILIOS } from '../../constantes/modificacion.enum';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { DomicilioInfo } from '../../models/plantas-consulta.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

@Component({
  selector: 'app-alta-planta',
  templateUrl: './alta-planta.component.html',
  styleUrls: ['./alta-planta.component.scss'],
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    TituloComponent,
    TablaDinamicaComponent,
    ComplementariaImmexComponent,
    ReactiveFormsModule,
  ],
  providers:[ModificacionSolicitudeService]
})
export class AltaPlantaComponent implements OnInit {
  formulario: FormGroup;
  /**
   * Lista de catálogos de estado.
   */
  estados: Catalogo[] = [];
  estado!: Catalogo;

  domicilios: DomicilioInfo[] = [];
  domiciliosSeleccionados: DomicilioInfo[] = [];
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;
  // Configuración de las columnas de la tabla utilizando el tipo DomicilioInfo
  configuracionTabla: ConfiguracionColumna<DomicilioInfo>[] =
    CONFIGURACION_DOMICILIOS;

  // Datos de ejemplo basados en la interfaz DomicilioInfo
  datos: DomicilioInfo[] = [];
  certificionForm!: FormGroup;
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private modificionService: ModificacionSolicitudeService 
  ) {

    this.formulario = this.fb.group({
      entidadFederativa: ['-1', Validators.required],
    });
    this.certificionForm = this.fb.group({
      certificion: [{ value: 'Si', disabled: true }],
    });
  }

  get formularioControl(): FormControl {
    return this.formulario.get('entidadFederativa') as FormControl;
  }

  ngOnInit(): void {
    this.cargarEstados();
  }

  cargarEstados(): void {
    this.modificionService
      .obtenerListaEstado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.estados = data;
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  buscarDomicilios(): void {

    const entidad = this.formularioControl?.value;

    if (entidad && entidad !== '-1') {
      this.modificionService.obtenerDomicilios(entidad).subscribe(
        (data: DomicilioInfo[]) => {
          this.datos = [...data];
        },
        (error) => {
          console.error('Error al buscar domicilios:', error);
        }
      );
    } else {
      // Manejar caso de selección inválida
      console.warn('Seleccione una entidad federativa válida.');
    }
  }

  seleccionarDomicilios(domicilios: DomicilioInfo): void {
    this.domiciliosSeleccionados = [{...domicilios}];
  }

  aplicarAccion(): void {
    this.domicilios = this.domiciliosSeleccionados;
  }

  eliminarPlantas(plantas: DomicilioInfo): void {
    if(!this.domiciliosSeleccionados.length) {
      return;
    }
    this.domiciliosSeleccionados = this.domiciliosSeleccionados.filter(
      (ele) => {
        return ele.id !== plantas.id;
      }
    );
  }
}
