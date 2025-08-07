import { AlertComponent, ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { Component, Input } from '@angular/core';
import {Subject,map,takeUntil } from 'rxjs';
import { Solicitud } from '../../models/solicitud-pantallas.model';
import { TEXTOS } from '../../enums/texto-enum';

/**
 * Componente que representa los datos de la solicitud.
 */
@Component({
  selector: 'app-tab-solicitud-datos',
  standalone: true,
  imports: [ AlertComponent,TablaDinamicaComponent],
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss',
})
/**
 * Componente que representa los datos de la solicitud
 */
export class SolicitudDatosTabComponent {
  esFormularioSoloLectura:boolean=false;
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS
   */
  TEXTOS = TEXTOS;
  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (ampliado)
   */
  colapsable: boolean = true;
  /**
   * Recibe la lista de solicitudes como datos de fila de la tabla.
   */
  @Input() tablaFilaDatos: Solicitud[] = [];


  configuracionColumnaSolicitud: ConfiguracionColumna<Solicitud>[] = [
  {
    encabezado: 'Fecha de creación',
    clave: (solicitud) => solicitud.fechaCreacion,
    orden: 1
  },
  {
    encabezado: 'Mercancía',
    clave: (solicitud) => solicitud.mercancia,
    orden: 2
  },
  {
    encabezado: 'Cantidad',
    clave: (solicitud) => solicitud.cantidad,
    orden: 3
  },
  {
    encabezado: 'Proveedor',
    clave: (solicitud) => solicitud.proovedor,
    orden: 4
  }
];

constructor(private consultaioQuery: ConsultaioQuery){
     this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState)=>{
          this.esFormularioSoloLectura = seccionState.readonly; 
        })
      )
      .subscribe()
}

  /**
   * Alterna el panel plegable (expandir/contraer)
   */
  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }
}
