import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablaAcciones, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';
import { AgregarAgenteComponent } from '../agregar-agente/agregar-agente.component';
import { AVISO_AGENTE_DE_TABLA, AvisoAgente } from '../../../../core/models/30505/aviso-modificacion.model';

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
   * Constructor de la clase AvisoAgenteComponent.
   * 
   * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param router Instancia de Router para la navegación entre rutas.
   * @param route Instancia de ActivatedRoute para acceder a información sobre la ruta actual.
   */
  constructor(private fb: FormBuilder,private router:Router, private route:ActivatedRoute) { 
    
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
    this.cargarDatos();
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
  cargarDatos(): void {
  
  }

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
  
}