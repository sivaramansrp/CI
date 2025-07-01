import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'; // Importa los decoradores y utilidades principales de Angular
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user'; // Importa interfaces y servicios personalizados
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa módulos de formularios de Angular
import { Subject, map, takeUntil } from 'rxjs'; // Importa utilidades de RxJS para manejo de observables
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes de Angular
import { DatosDelTramiteComponent } from '../../components/datos-del-tramite/datos-del-tramite.component'; // Importa el componente de datos del trámite
import { SolicitanteComponent } from '@ng-mf/data-access-user'; // Importa el componente de solicitante
import { Solicitud10301Service } from '../../services/solicitud10301.service'; // Importa el servicio de solicitud

/**
 * Componente que representa el paso uno del trámite.
 */
@Component({
  selector: 'paso-uno', // Selector del componente
  templateUrl: './paso-uno.component.html', // Ruta del archivo de plantilla HTML
  standalone: true, // Indica que es un componente standalone
  imports: [SolicitanteComponent, CommonModule, DatosDelTramiteComponent, FormsModule, ReactiveFormsModule] // Importa módulos y componentes necesarios
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false; // Indica si hay datos de respuesta del servidor

  private destroyNotifier$: Subject<void> = new Subject(); // Subject para manejar la destrucción de suscripciones
  public consultaState!: ConsultaioState; // Estado de la consulta

  constructor(
    private solicitud10301Service: Solicitud10301Service, // Servicio para manejar la solicitud
    private consultaQuery: ConsultaioQuery // Servicio para consultar el estado
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent; // Referencia al componente hijo Solicitante

  /**
   * Tipo de persona.
   */
  tipoPersona!: number; // Variable para almacenar el tipo de persona

  /**
   * Datos del formulario dinámico de la persona.
   */
  persona: FormularioDinamico[] = []; // Datos del formulario de persona

  /**
   * Datos del formulario dinámico del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = []; // Datos del formulario de domicilio fiscal

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1; // Índice de la pestaña activa

  ngOnInit(): void {
    // Se ejecuta al inicializar el componente
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$), // Se desuscribe al destruir el componente
      map((seccionState) => {
        this.consultaState = seccionState; // Asigna el estado de la consulta
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario(); // Si está en modo actualización, guarda los datos del formulario
    } else {
      this.esDatosRespuesta = true; // Si no, activa el modo de datos de respuesta
    }
  }

  guardarDatosFormulario(): void {
    // Método para guardar los datos del formulario
    this.solicitud10301Service
      .getDatosDeTrtamitelDoc().pipe(
        takeUntil(this.destroyNotifier$) // Se desuscribe al destruir el componente
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true; // Marca que hay datos de respuesta
          this.solicitud10301Service.actualizarEstadoFormulario(resp); // Actualiza el estado del formulario con la respuesta
        }
      });
  }

  /**
   * Selecciona la pestaña indicada por el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i; // Cambia el índice de la pestaña activa
  }

  ngOnDestroy(): void {
    // Se ejecuta al destruir el componente
    this.destroyNotifier$.next(); // Emite el evento de destrucción
    this.destroyNotifier$.complete(); // Completa el subject para limpiar suscripciones
  }
}
