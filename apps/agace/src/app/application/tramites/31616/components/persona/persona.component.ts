import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { PERSONAS_TABLA, PersonasInfo } from '@libs/shared/data-access-user/src/core/models/31616/dato-comunes.model';
import { SolicitudDeRegistroInvocarService } from '../../services/solicitudDeRegistroInvocar/solicitud-de-registro-invocar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule,
    TablaDinamicaComponent,
    TituloComponent
  ],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css',
})
export class PersonaComponent implements OnInit,OnDestroy{
  
  /**
   * Configuración de las columnas de la tabla de mercancías.
   */
  personasTabla: ConfiguracionColumna<PersonasInfo>[] = PERSONAS_TABLA;

  /**
   * Datos de la tabla de mercancías.
   */
  personasTablaDatos: PersonasInfo[] = [];
  
  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private service: SolicitudDeRegistroInvocarService,
  
  ) {}
  
  ngOnInit(): void {
    this.obtenerTablaDatos()
  }

    /**
   * Obtiene los datos de la tabla de mercancías.
   */
    obtenerTablaDatos(): void {
      this.service.obtenerPersonaTablaDatos()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data) => {
          const DATOS = data?.data;
          this.personasTablaDatos = DATOS;
        });
    }

    
  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
