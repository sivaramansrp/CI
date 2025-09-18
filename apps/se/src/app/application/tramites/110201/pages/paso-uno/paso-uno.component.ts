import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de-origen/certificado-de-origen.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { RegistroService } from '../../services/registro.service';

/**
 * @component PasoUnoComponent
 * @description Componente Angular que gestiona el primer paso del asistente del trámite 110201
 * @author Sistema VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 * 
 * Este componente es responsable de:
 * - Gestionar las pestañas del primer paso del asistente (Solicitante, Certificado de Origen, Destinatario, Datos Certificado)
 * - Coordinar la validación de todos los formularios del paso uno
 * - Manejar la navegación entre las diferentes secciones del paso
 * - Emitir eventos de estado de carga de archivos al componente padre
 * - Gestionar el estado de consulta y la carga inicial de datos
 * - Integrar múltiples componentes hijo para formar un flujo completo
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  
  /** Evento que comunica al componente padre el estado de carga de archivos */
  @Output() archivo = new EventEmitter<boolean>();
  
  /** Datos del catálogo de entidades federativas obtenidos del servicio */
  entidadFederativa!: { data: string } | null;
  
  /** Identificador numérico del tipo de persona seleccionada en el formulario */
  tipoPersona!: number;

  /** Array de configuración para generar formularios dinámicos de datos personales */
  persona: FormularioDinamico[] = [];

  /** Array de configuración para generar formularios dinámicos de domicilio fiscal */
  domicilioFiscal: FormularioDinamico[] = [];

  /** Índice que controla qué pestaña está actualmente visible en el asistente */
  indice: number = 1;
  
  /** Subject utilizado para cancelar suscripciones observables al destruir el componente */
  public destroyNotifier$: Subject<void> = new Subject();

  /** Estado global de consulta obtenido desde el store para controlar modo lectura/edición */
  public consultaState!: ConsultaioState;

  /** Bandera que indica si existen datos de respuesta del servidor para precargar formularios */
  public esDatosRespuesta: boolean = false;
  
  /** Referencia al componente hijo SolicitanteComponent para acceso a sus métodos y propiedades */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  
  /** Referencia al componente hijo CertificadoDeOrigenComponent para validación y control */
  @ViewChild('CertificadoOrigen') certificadoOrigen!: CertificadoDeOrigenComponent;
  
  /** Referencia al componente hijo DatosCertificadoComponent para gestión de datos del certificado */
  @ViewChild('DatosCertificado') datosCertificado!: DatosCertificadoComponent;

  /** Referencia al componente hijo DestinatarioComponent para manejo de información del destinatario */
  @ViewChild('Destinatario') destinatario!: DestinatarioComponent;
  /**
   * Constructor del componente que inyecta las dependencias necesarias
   * @param registro - Servicio para obtener datos de catálogos desde la API
   * @param consultaQuery - Query para acceder al estado global de consulta
   */
  constructor(private registro: RegistroService, private consultaQuery: ConsultaioQuery) {
    // Constructor utilizado para inyección de dependencias sin lógica adicional
  }

  /**
   * Método del ciclo de vida OnInit que inicializa el componente y carga datos necesarios
   */
  ngOnInit(): void {
    this.registro.getCatalogoById(21).subscribe((resp) => {
      this.entidadFederativa = resp;
      const DATA = JSON.parse(this.entidadFederativa.data);
      this.entidadFederativa = DATA?.domicilioFiscal?.entidadFederativa;
    });

    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();

    Promise.resolve().then(() => {
      if (this.consultaState.update) {
        this.guardarDatosFormularios();
      } else {
        this.esDatosRespuesta = true;
      }
    });
  }
  
  /**
   * Carga datos desde el servicio y actualiza el estado de formularios con información persistida
   */
  guardarDatosFormularios(): void {
    this.registro
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.registro.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Valida todos los formularios del paso uno incluyendo solicitante, certificado, datos y destinatario
   * @returns true si todos los formularios son válidos, false en caso contrario
   */
  public validarFormularios(): boolean {
    let isValid = true;
    if (this.solicitante?.form) {
      if (this.solicitante.form.invalid) {
        this.solicitante.form.markAllAsTouched();
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.certificadoOrigen) {
      if (!this.certificadoOrigen.validarFormularios()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.datosCertificado) {
      if (!this.datosCertificado.validarFormulariosDatos()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.destinatario) {
      if (!this.destinatario.validarFormularios()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return isValid;
  }

  /**
   * Cambia la pestaña activa del asistente según el índice proporcionado
   * @param i - Índice numérico de la pestaña a activar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  
  /**
   * Emite evento al componente padre para comunicar el estado de carga de archivos
   * @param data - Booleano que indica si hay una operación de carga de archivo en progreso
   */
  cargaArchivo(data: boolean): void {
    this.archivo.emit(data);
  }
  
  /**
   * Método del ciclo de vida OnDestroy que limpia recursos y previene memory leaks
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}