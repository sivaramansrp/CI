import * as formData from '@libs/shared/theme/assets/json/140105/datos-del-formulario.json';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FacturasDisponiblesParaDevolver } from '../../models/cancelacion-de-certificados.model';
import { FacturasSeleccionadasParaDevolver } from '../../models/cancelacion-de-certificados.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REG_X } from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para realizar la búsqueda de folios, visualización de datos de facturas
 * y gestionar formularios relacionados con devoluciones y cancelaciones.
 */
@Component({
  selector: 'app-busqueda-folio',
  templateUrl: './busqueda-folio.component.html',
  styleUrl: './busqueda-folio.component.scss',
})
export class BusquedaFolioComponent implements OnInit, OnDestroy {

  /** Formulario para ingresar el monto a cancelar */
  public montoACancelarForm!: FormGroup;

  /** Formulario para mostrar los datos del certificado seleccionado para devolución */
  public devloverForm!: FormGroup;

  /** Formulario que captura la cantidad que se desea devolver */
  public cantidadADevolver!: FormGroup;

  /** Formulario que muestra los totales a devolver */
  public devolver!: FormGroup;

  /** Variable que indica si debe mostrarse el bloque de devolver facturas */
  public mostrarDevolverFacturas!: boolean;

  /** Variable que controla la visualización del formulario de búsqueda */
  public mostrarBusqueda!: boolean;

  /** Tipo de selección de filas para la tabla (checkbox) */
  tipoSeleccionSolicitud: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /** Lista de facturas disponibles para devolución */
  FacturasDisponiblesParaDevolverTabla: FacturasDisponiblesParaDevolver[] = [];

  /** Lista de facturas seleccionadas para devolver */
  FacturasSeleccionadasParaDevolverTabla: FacturasSeleccionadasParaDevolver[] = [];

  /** Configuración de columnas para la tabla de facturas disponibles */
  configuracionColumnasFacturasDisponiblesParaDevolver: ConfiguracionColumna<FacturasDisponiblesParaDevolver>[] = [
    { encabezado: 'Numero de factura', clave: (fila) => fila.numero_de_factura, orden: 1 },
    { encabezado: 'Importe inicial', clave: (fila) => fila.importe_inicial, orden: 2 },
  ];

  /** Configuración de columnas para la tabla de facturas seleccionadas */
  configuracionColumnasFacturasSeleccionadasParaDevolver: ConfiguracionColumna<FacturasSeleccionadasParaDevolver>[] = [
    { encabezado: 'Numero de factura', clave: (fila) => fila.numero_de_factura, orden: 1 },
    { encabezado: 'Importe inicial', clave: (fila) => fila.importe_inicial, orden: 2 },
    { encabezado: 'Saldo a devolver', clave: (fila) => fila.saldo_a_devolver, orden: 3 },
  ];

  /**
     * Notificador para destruir las suscripciones al destruir el componente.
     */
    public destroyNotifier$: Subject<void> = new Subject();

/**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente. Inyecta servicios necesarios y establece el formulario principal.
   * @param servicioDeMensajesService Servicio de mensajería compartido entre componentes
   * @param fb FormBuilder para crear los formularios reactivos
   */
  constructor(private servicioDeMensajesService: ServicioDeMensajesService, private fb: FormBuilder, private consultaQuery: ConsultaioQuery) {
    
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.establecerMontoACancelarForm();
        })
      )
      .subscribe();
  }

  /**
   * Hook de inicialización. Se suscribe a los mensajes emitidos desde el servicio compartido
   * para mostrar u ocultar formularios.
   */
  ngOnInit(): void {
    this.servicioDeMensajesService.devolverFacturasMensaje$.subscribe((mensaje) => {
      this.mostrarDevolverFacturas = mensaje;
      if (this.mostrarDevolverFacturas) {
        this.estableDevloverForm();
      }
    });

    this.servicioDeMensajesService.mensaje$.subscribe((mensaje) => {
      this.mostrarBusqueda = mensaje;
    });
  }

  /**
   * Método que se ejecuta al realizar una búsqueda.
   * Valida si el formulario de búsqueda es válido. Si no lo es, marca todos los campos como tocados.
   * Si es válido, emite mensajes para mostrar detalles del permiso.
   * 
   * @param event Evento que desencadena la acción
   */
  public agregarSelect(_event: Event): void {
    if (this.montoACancelarForm.invalid) {
      this.montoACancelarForm.markAllAsTouched();
      return;
    }
    this.servicioDeMensajesService.enviarMensaje(false);
    this.servicioDeMensajesService.establecerDatosDePermiso(true);
  }

  /**
   * Método que emite los mensajes necesarios para mostrar los detalles del permiso.
   * 
   * @param event Evento que desencadena la acción
   */
  public agregar(_event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(false);
    this.servicioDeMensajesService.establecerDatosDePermiso(true);
  }


  /**
   * Método que se ejecuta al cancelar la acción de búsqueda.
   * Emite un mensaje para ocultar el formulario de búsqueda.
   * 
   * @param event Evento que desencadena la cancelación
   */
  public cancelar(_event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(false);
  }

  /**
   * Inicializa el formulario para ingresar el monto a cancelar.
   * Aplica validaciones: requerido y solo números.
   */
  public establecerMontoACancelarForm(): void {
    this.montoACancelarForm = this.fb.group({
      monto: ['', [Validators.compose([Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)])]]
    });
  }

  /**
   * Inicializa los formularios necesarios para mostrar los detalles de devolución:
   * datos del certificado, cantidad a devolver y totales.
   */
  public estableDevloverForm(): void {
    this.devloverForm = this.fb.group({
      folioDelOficioDeCertificado: [{ value: '', disabled: true }],
      montoDisponible: [{ value: '', disabled: true }],
    });

    this.cantidadADevolver = this.fb.group({
      cantidad: [{ value: '', disabled: false }],
    });

    this.devolver = this.fb.group({
      totalDevolver: [{ value: '', disabled: true }],
      totalDevolverMetrosCuadrados: [{ value: '', disabled: true }],
    });
  }

  /**
   * Establece los valores en el formulario de detalles del permiso a partir de un JSON de datos.
   */
  public establecerFormularioDeDetallesDe(): void {
    this.devloverForm.patchValue(formData);
  }

  /**
   * Hook de destrucción del componente.
   * Limpia el estado relacionado con los datos del permiso en el servicio de mensajes.
   */
  ngOnDestroy(): void {
    this.servicioDeMensajesService.establecerDatosDePermiso(false);
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
