import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_PRODUCTO_RADIO, OPCIONES_SOLICITUD_DE_RADIO } from '@libs/shared/data-access-user/src/core/enums/130301/modificacion.enum';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelTramite } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';

/**
 * Componente para gestionar los datos del trámite.
 */
@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.css',
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  /**
   * Opciones de botón de radio para la solicitud.
   */
  radioOpcions = OPCIONES_SOLICITUD_DE_RADIO;

  /**
   * Opciones de botón de radio para el producto.
   */
  productoRadioOpcions = OPCIONES_PRODUCTO_RADIO;

  /**
   * Formulario reactivo para los datos del trámite.
   */
  datosDelTramite!: FormGroup;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos del formulario obtenidos del servicio.
   */
  delTramiteFormDatos: DatosDelTramite[] = [];

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param service Servicio para obtener los datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.obtenerFormDatos();
    this.crearFormulario();
  }
  /**
   * Crea y configura un formulario reactivo para gestionar los datos del trámite con campos deshabilitados.
   */
  crearFormulario():void{
    this.datosDelTramite = this.fb.group({
      numeroFolioTramiteOriginal: [{ value: '', disabled: true }],
      solicitudOpcion: [{ value: '', disabled: true }],
      regimen: [{ value: '', disabled: true }],
      clasificacionDelRegimen: [{ value: '', disabled: true }],
      productoOpcion: [{ value: '', disabled: true }],
      descripcionMercancia: [{ value: '', disabled: true }],
      fraccionArancelaria: [{ value: '', disabled: true }],
      umt: [{ value: '', disabled: true }],
      cantidad: [{ value: '', disabled: true }],
      valorFactura: [{ value: '', disabled: true }],
    });
  }

  /**
   * Obtiene los datos del formulario desde el servicio.
   */
  obtenerFormDatos(): void {
    this.service
      .obtenerDelTramiteFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.delTramiteFormDatos = data?.data;
        this.datosDelTramite.patchValue({
          numeroFolioTramiteOriginal: this.delTramiteFormDatos[0].numeroFolioTramiteOriginal,
          solicitudOpcion: this.delTramiteFormDatos[0].solicitudOpcion,
          regimen: this.delTramiteFormDatos[0].regimen,
          clasificacionDelRegimen: this.delTramiteFormDatos[0].clasificacionDelRegimen,
          productoOpcion: this.delTramiteFormDatos[0].productoOpcion,
          descripcionMercancia: this.delTramiteFormDatos[0].descripcionMercancia,
          fraccionArancelaria: this.delTramiteFormDatos[0].fraccionArancelaria,
          umt: this.delTramiteFormDatos[0].umt,
          cantidad: this.delTramiteFormDatos[0].cantidad,
          valorFactura: this.delTramiteFormDatos[0].valorFactura,
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