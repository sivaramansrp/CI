import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PARTIDAS_TABLA, PartidasForma, PartidasInfo } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';

/**
 * Componente para gestionar las partidas de la mercancía.
 */
@Component({
  selector: 'app-partidas-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './partidas-de-la-mercancia.component.html',
  styleUrl: './partidas-de-la-mercancia.component.css',
})
export class PartidasDeLaMercanciaComponent implements OnInit, OnDestroy {
  /**
   * Configuración de las columnas de la tabla de partidas.
   */
  partidasTabla: ConfiguracionColumna<PartidasInfo>[] = PARTIDAS_TABLA;

  /**
   * Datos de la tabla de partidas obtenidos del servicio.
   */
  partidasTablaDatos: PartidasInfo[] = [];

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos del formulario de partidas obtenidos del servicio.
   */
  partidasFormDatos: PartidasForma[] = [];

  /**
   * Formulario reactivo para las partidas de la mercancía.
   */
  partidas!: FormGroup;

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param service Servicio para obtener los datos de las partidas.
   */
  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.obtenerTablaDatos();
    this.obtenerFormDatos();
    this.crearFormulario();
  }
  /**
   * Crea y configura un formulario reactivo para gestionar las partidas de la mercancía con campos deshabilitados.
   */
  crearFormulario():void{
    this.partidas = this.fb.group({
      usoEspecificoMercancia: [{ value: '', disabled: true }],
      justificacionBeneficio: [{ value: '', disabled: true }],
      observaciones: [{ value: '', disabled: true }],
      representacionFederal: [{ value: '', disabled: true }]
    });
  }

  /**
   * Obtiene los datos de la tabla de partidas desde el servicio.
   */
  obtenerTablaDatos(): void {
    this.service.obtenerTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.partidasTablaDatos = DATOS;
      });
  }

  /**
   * Obtiene los datos del formulario de partidas desde el servicio.
   */
  obtenerFormDatos(): void {
    this.service
      .obtenerPartidasFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.partidasFormDatos = data?.data;
        this.partidas.patchValue({
          usoEspecificoMercancia: this.partidasFormDatos[0].usoEspecificoMercancia,
          justificacionBeneficio: this.partidasFormDatos[0].justificacionBeneficio,
          observaciones: this.partidasFormDatos[0].observaciones,
          representacionFederal: this.partidasFormDatos[0].representacionFederal
        });
      });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Libera los recursos y destruye los observables activos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}