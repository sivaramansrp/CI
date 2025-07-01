import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { RegistroService } from '../../services/registro.service';


/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  })
export class PasoUnoComponent implements OnInit,OnDestroy {
   /**
   * Evento para comunicar al componente padre si se está cargando un archivo.
   */
  @Output() archivo = new EventEmitter<boolean>();
  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativa!: { data: string } | null;
   /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   */
  indice: number = 1;
 /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si existen datos de respuesta del servidor para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;
  /**
   * Constructor del componente.
   * @param registro Servicio para obtener datos de catálogos.
   */
  constructor(private registro: RegistroService, private consultaQuery: ConsultaioQuery) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  
  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el catálogo de entidades federativas y lo procesa.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }

    this.registro.getCatalogoById(21).subscribe((resp) => {
      this.entidadFederativa = resp;
      const DATA = JSON.parse(this.entidadFederativa.data);
      this.entidadFederativa = DATA?.domicilioFiscal?.entidadFederativa;
    });
  }
/**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
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
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
   /**
   * Emite un evento al componente padre indicando si se está cargando un archivo.
   * @param data Valor booleano que indica el estado de carga de archivo.
   */
  cargaArchivo(data: boolean): void {
    this.archivo.emit(data);
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela las suscripciones y libera recursos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}