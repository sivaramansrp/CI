import { AvisoAgente } from '../../../../core/models/30505/aviso-modificacion.model';
import { ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablaAcciones, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { AgregarAgenteComponent } from '../agregar-agente/agregar-agente.component';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { AVISO_AGENTE_DE_TABLA } from '../../../../core/enums/30505/aviso-de-modificacion.enum';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';
import { Tramite30505AgregarAgenteQuery } from '../../../../core/queries/tramite30505-agregar-agente.query';
import { Tramite30505AgregarAgenteStore } from '../../../../core/estados/tramites/tramite30505-agregar-agente.store';

/**
 * Componente encargado de gestionar el aviso de agente dentro del trámite 30505.
 * 
 * Este componente permite visualizar, agregar y administrar los avisos de agente,
 * mostrando la información en una tabla dinámica y utilizando formularios reactivos
 * para la captura y validación de datos.
 * 
 * @remarks
 * Utiliza módulos y componentes auxiliares como `TablaDinamicaComponent`, `TituloComponent`
 * y `AgregarAgenteComponent` para estructurar la interfaz de usuario.
 * 
 * @example
 * <app-aviso-agente></app-aviso-agente>
 */
@Component({
  selector: 'app-aviso-agente',
  templateUrl: './aviso-agente.component.html',
  styleUrls: ['./aviso-agente.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent,
    AgregarAgenteComponent
  ]
})
export class AvisoAgenteComponent implements OnInit {
  
  /**
   * Representa el formulario reactivo para la gestión de datos del agente.
   * Utiliza la clase FormGroup de Angular para agrupar y validar los controles del formulario.
   */
  formAgente!:FormGroup;

  /**
   * Nombre de la clase CSS utilizada para mostrar u ocultar el modal.
   * Por defecto, el valor es 'modal'.
   */
  modal: string = 'modal';

  /**
   * Arreglo que contiene los datos de los avisos de agente.
   * Cada elemento es una instancia de la interfaz AvisoAgente.
   */
  public avisoAgenteDatos:AvisoAgente[] = [];

  /**
   * Configuración de la tabla utilizada para mostrar los datos del aviso de agente.
   * 
   * Esta constante define la estructura, columnas y opciones de visualización
   * de la tabla en el componente de aviso de agente.
   * 
   * @see AVISO_AGENTE_DE_TABLA - Objeto de configuración importado que contiene los detalles de la tabla.
   */
  public AGENTE_CONFIGURATION_TABLA = AVISO_AGENTE_DE_TABLA;

  /**
   * Arreglo que contiene las acciones disponibles para la tabla.
   * Cada elemento representa una acción que puede realizar el usuario en la interfaz.
   * 
   * @type {TablaAcciones[]}
   */
  public acciones:TablaAcciones[] = [];

  /**
   * Notificador utilizado para destruir suscripciones y evitar fugas de memoria.
   * Se emite un valor cuando el componente es destruido, permitiendo que las suscripciones
   * se cancelen de manera segura utilizando el operador `takeUntil`.
   */
  public destroyNotifier$: Subject<void> = new Subject();

   /**
   * Arreglo que contiene los agentes seleccionados de tipo AvisoAgente.
   * 
   * @remarks
   * Esta propiedad almacena la lista de agentes que han sido seleccionados por el usuario
   * en el componente de aviso de agente.
   */
  selectedAgente : AvisoAgente[] = [];


  /**
   * Constructor de la clase AvisoAgenteComponent.
   * 
   * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param router Instancia de Router para la navegación entre rutas.
   * @param route Instancia de ActivatedRoute para acceder a información sobre la ruta actual.
   */
  constructor(private fb: FormBuilder,private router:Router, private route:ActivatedRoute,private tercerosService:TercerosRelacionadosService, private tramite30505Store: Tramite30505AgregarAgenteStore,
    private tramite30505Query: Tramite30505AgregarAgenteQuery,
    private ubicaccion : Location) { 
    
  }


  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Llama al método `cargarDatos()` para obtener y preparar los datos necesarios.
   * - Inicializa el formulario reactivo `formAgente` con los campos requeridos y sus validaciones.
   * 
   * @returns void
   */
  ngOnInit(): void {
    //this.cargarDatos();
    this.formAgente = this.fb.group({
        nombres: ['', [Validators.required]],
        segundoApellido:['', [Validators.required]],
        primerApellido: ['', [Validators.required]],
        tipoFigura: ['', [Validators.required]],
        patenteAutorizacion: ['', [Validators.required]],
        se: ['', [Validators.required]],
  
    });
  }

 
  /**
   * Carga los datos necesarios para el componente.
   * 
   * Este método se encarga de obtener y preparar la información requerida
   * para el funcionamiento del componente AvisoAgente.
   * 
   * @returns {void} No retorna ningún valor.
   */
  // cargarDatos(): void {
  
  // }

  /**
   * Navega a la ruta relativa '../agregar-agente' para agregar un nuevo agente de transporte.
   * Utiliza el enrutador de Angular para cambiar la vista actual.
   *
   * @remarks
   * Este método se utiliza cuando el usuario desea agregar un nuevo agente de transporte
   * desde el componente actual. La navegación es relativa a la ruta activa.
   */
  AgregarTransportias():void{
    this.router.navigate(['../agregar-agente'],{
      relativeTo:this.route

    });
  }

  /**
   * Maneja la selección de datos de agentes a partir de un evento.
   * 
   * @param evento - Un arreglo de objetos de tipo AvisoAgente que contiene los datos seleccionados del agente.
   * 
   * Si existen datos previos en `avisoAgenteDatos`, actualiza la propiedad `selectedAgente` con el evento recibido
   * y pasa esta información al servicio compartido `tercerosService` mediante el método `setAgente`.
   */
  getAgenteDatos(evento:AvisoAgente[]):void{
   if (this.avisoAgenteDatos?.length > 0) {
      this.selectedAgente = evento;
      this.tercerosService.setAgente(this.selectedAgente); // Pass data to the shared service
    }
  }

  /**
   * Elimina el agente seleccionado de la lista.
   *
   * Si hay al menos un agente seleccionado, llama al método `eliminarAgento`
   * del store `tramite30505Store` pasando el primer agente seleccionado.
   */
  eliminarAgente():void{
    if (this.selectedAgente.length > 0) {
      this.tramite30505Store.eliminarAgento(this.selectedAgente[0]);
    }
  }

  /**
   * Navega a la ruta relativa para modificar un agente.
   *
   * Utiliza el enrutador de Angular para redirigir al usuario a la pantalla de modificación de agente,
   * manteniendo el contexto de la ruta actual.
   */
   modificarAgente():void{
    this.router.navigate(['../modificar-agente'],{
        relativeTo: this.route,
      });
  }
}