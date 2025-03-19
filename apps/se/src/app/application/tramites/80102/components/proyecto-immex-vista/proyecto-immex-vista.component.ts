import { Component, OnDestroy,OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Catalogo } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { PROYECTO_IMMEX_CONFIG } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { PoryectoDatos } from '../../../../shared/models/nuevo-programa-industrial.model';
import { ProyectoImmexComponent } from '../../../../shared/components/proyecto-immex/proyecto-immex.component';
import { ProyectoImmexEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80102Query } from '../../estados/tramite80102.query';

@Component({
  selector: 'app-proyecto-immex-vista',
  standalone: true,
  imports: [CommonModule, ProyectoImmexComponent],
  templateUrl: './proyecto-immex-vista.component.html',
  styleUrl: './proyecto-immex-vista.component.scss',
})
export class ProyectoImmexVistaComponent implements OnInit, OnDestroy {
  public proyectoImmexDatos: PoryectoDatos = {
    fraccionArancelaria: '6465469',
    anexoDos: 'NO SENSIBLE',
    tipo: 'EXPORTACCION',
    umt: 'KILOGRAM',
    descripcion: 'TEST COMPLEMENTOR',
    tipoDeDocumente: '',
    fechaDeFirma: '',
    fechaDeVigencia: '',
    rfcTaxId: 0,
    razonSocial: ''
  }

  public documentoCatalogDatos: Catalogo[] = [
    {
      id: 0,
      descripcion: 'Cantrado De Maqula'
    }
  ]
  public proyectoImmexConfiguartion = {
       proyectoImmexSeleccionCheckBox: TablaSeleccion.CHECKBOX,
        proyectoImmexTabla: PROYECTO_IMMEX_CONFIG
    };

  public proyectoImmexTablaLista: ProyectoImmexEncabezado[] = [];

   /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
   private destroyNotifier$: Subject<void> = new Subject();

   constructor( private query: Tramite80102Query ) {
    //constructor vacío
  }

  ngOnInit():void{
    this.query.selectDatosParaNavegar$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datosParaNavegar) => {
         this.proyectoImmexDatos.descripcion=datosParaNavegar.ENCABEZADO_DESCRIPCION_COMERCIAL;
        });
}


  obtenerProyectoTablaDevolverLaLlamada(event: ProyectoImmexEncabezado[]): void{
    this.proyectoImmexTablaLista = event;
  }

      /**
     * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
     * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
     * @method ngOnDestroy
     */
      ngOnDestroy(): void {
        this.destroyNotifier$.next();
        this.destroyNotifier$.complete();
      }
  
}
