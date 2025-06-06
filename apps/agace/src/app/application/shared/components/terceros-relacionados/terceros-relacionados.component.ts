import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { ENLACE_TABLA, EnlaceOperativo, PERSONAS_PARA,Personas } from '../../models/terceros-relacionados.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject,map,takeUntil } from 'rxjs';
import { TercerosRelacionadosState, TercerosRelacionadosStore } from '../../estados/stores/terceros-relacionados.store';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { REPRESENTANTE_LEGAL } from '../../constants/terceros-relacionados.enum';
import { TercerosRelacionadosQuery } from '../../estados/queries/terceros-relacionados.query';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

/**
 * Componente que representa la funcionalidad de "Terceros Relacionados".
 * Este componente maneja la visualización y gestión de terceros relacionados,
 * incluyendo formularios, tablas e interacciones con modales.
 */
@Component({
  selector: 'shared-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent, TablaDinamicaComponent, TituloComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit,OnDestroy {

  /**
   * Una instancia de FormGroup que representa la estructura del formulario para "representante legal".
   * Contiene un FormGroup anidado llamado `represtantanteLegalFormGroup` para gestionar
   * los controles del formulario relacionados con el representante legal.
   */
  public represtantanteLegalForma: FormGroup = new FormGroup({
    represtantanteLegalFormGroup: new FormGroup({})
  });

  /**
   * Una referencia a la instancia del modal creada utilizando el `BsModalService`.
   * Esta propiedad se utiliza para gestionar e interactuar con el cuadro de diálogo modal.
   * Puede ser indefinida si no hay ningún modal abierto actualmente.
   */
  modalRef?: BsModalRef;
  /**
   * Contiene los datos del representante legal.
   * Esta propiedad se inicializa con la constante `REPRESENTANTE_LEGAL`.
   */
  public represtantanteLegalDatos = REPRESENTANTE_LEGAL;
  /**
   * Representa el modo de selección con casillas de verificación para la tabla.
   * Esta propiedad se asigna con el valor de `TablaSeleccion.CHECKBOX`,
   * que probablemente corresponde a una constante o enumeración predefinida
   * que indica que se utilizan casillas de verificación para seleccionar filas en la tabla.
   */
  public checkbox = TablaSeleccion.CHECKBOX;
  /**
   * Configuración para la tabla que muestra los enlaces operativos.
   * Esta propiedad define la configuración de las columnas para la tabla
   * utilizando el tipo `ConfiguracionColumna` con `EnlaceOperativo` como tipo genérico.
   * La configuración se inicializa con la constante predefinida `ENLACE_TABLA`.
   */
  public configuracionTabla: ConfiguracionColumna<EnlaceOperativo>[] = ENLACE_TABLA;
  /**
   * Un arreglo de objetos `EnlaceOperativo` que representa enlaces operativos o datos relacionados.
   * Esta propiedad se utiliza para almacenar y gestionar los datos operativos asociados con el componente.
   */
  public enlaceOperativoDatos: EnlaceOperativo[] = [];
  /**
   * Un subject utilizado para notificar y completar cualquier suscripción activa cuando el componente es destruido.
   * Esto ayuda a prevenir fugas de memoria al garantizar que las suscripciones se limpien correctamente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Un grupo de formulario reactivo utilizado para gestionar y validar los datos
   * relacionados con la funcionalidad de "enlace operativo".
   * Este grupo de formulario se inicializa y configura con controles de formulario
   * específicos y validadores en otra parte del componente.
   */
  public enlaceOperativoForm!: FormGroup;
  /**
   * Un arreglo de objetos `Personas` que representa individuos o entidades relacionadas.
   * Esta propiedad se utiliza para almacenar y gestionar la lista de personas asociadas.
   */
  public personaParas: Personas[] = [];
  /**
   * Representa la configuración para la tabla de personas relacionadas.
   * Esta propiedad es un arreglo de configuraciones de columnas específicas para el tipo `Personas`.
   * Se inicializa con configuraciones predefinidas de `PERSONAS_PARA`.
   */
  public personasConfiguracionTabla: ConfiguracionColumna<Personas>[] = PERSONAS_PARA;
  /**
   * Representa el estado del proceso de importación de "Terceros Relacionados".
   * Esta propiedad se utiliza para gestionar y rastrear el estado de los datos relacionados con terceros.
   */
  public importacionstate!: TercerosRelacionadosState;
  public consultaState!: ConsultaioState;

  /**
   * Constructor del componente TercerosRelacionadosComponent.
   * 
   * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios reactivos.
   * @param modalService - Un servicio para gestionar cuadros de diálogo modales.
   * @param tercerosRelacionadosSvc - Servicio para manejar operaciones relacionadas con "terceros relacionados".
   * @param tercerosRelacionadosStore - Almacén para gestionar el estado de "terceros relacionados".
   * @param tercerosRelacionadosQuery - Servicio de consulta para recuperar datos relacionados con "terceros relacionados".
   */
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private tercerosRelacionadosSvc: TercerosRelacionadosService,
    private tercerosRelacionadosStore: TercerosRelacionadosStore,
    private tercerosRelacionadosQuery: TercerosRelacionadosQuery,
    private consultaQuery: ConsultaioQuery
  ) {
      this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
        if(this.consultaState.update) {
          this.guardarDatosFormulario();
        }
    })).subscribe();
  }

  /**
   * Gancho del ciclo de vida que se llama después de que la vista del componente ha sido completamente inicializada.
   * 
   * - Se suscribe al observable `selectImportacion$` de `tercerosRelacionadosQuery` para actualizar la propiedad `importacionstate`.
   * - Garantiza que la suscripción se cancele automáticamente cuando el componente sea destruido utilizando `takeUntil` con `destroyNotifier$`.
   * - Llama a métodos para inicializar el formulario de enlace operativo, obtener datos de enlace operativo y recuperar personas relacionadas.
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.tercerosRelacionadosQuery.selectImportacion$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.importacionstate = seccionState;
      })
    ).subscribe();
    this.getEnlaceOperativo();
    this.crearEnlaceOperativoForm();
    this.getPersonas();
  }

  /**
   * Getter para la propiedad 'represtantanteLegalFormGroup'.
   * Esto recupera una instancia específica de `FormGroup` del grupo de formularios `represtantanteLegalForma`.
   *
   * @returns {FormGroup} El 'represtantanteLegalFormGroup' como una instancia de `FormGroup`.
   */
  get represtantanteLegalFormGroup(): FormGroup {
    return this.represtantanteLegalForma.get('represtantanteLegalFormGroup') as FormGroup;
  }

  /**
   * Inicializa el FormGroup `enlaceOperativoForm` con controles de formulario y sus respectivos validadores.
   * 
   * El formulario contiene los siguientes campos:
   * - `resigtro`: Un campo requerido para el registro.
   * - `irfc`: Un campo requerido para el RFC (Registro Federal de Contribuyentes).
   * - `inombre`: Un campo requerido para el nombre.
   * - `apellidoPaterno`: Un campo requerido para el apellido paterno.
   * - `apellidoMaterno`: Un campo requerido para el apellido materno.
   * - `cargo`: Un campo requerido para el cargo o puesto.
   * - `cuidad`: Un campo requerido para la ciudad.
   * - `telefono`: Un campo requerido para el número de teléfono.
   * - `correo`: Un campo requerido para la dirección de correo electrónico.
   * - `suplente`: Un campo requerido para el suplente o alterno.
   */
  public crearEnlaceOperativoForm(): void {
    this.enlaceOperativoForm = this.fb.group({
        resigtro: ['', Validators.required],
        irfc: ['', Validators.required],
        inombre: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        cargo: ['', Validators.required],
        cuidad: ['', Validators.required],
        telefono: ['', Validators.required],
        correo: ['', Validators.required],
        suplente: ['', Validators.required],
    });
  }

  /**
   * Abre un cuadro de diálogo modal utilizando la plantilla proporcionada.
   * @param template - Un `TemplateRef<void>` que representa el contenido del modal.
   *                   Esta plantilla se mostrará dentro del cuadro de diálogo modal.
   * @remarks
   * El modal se muestra con una clase CSS de `modal-lg` para aplicar un estilo de modal grande.
   */
  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg',});
  }

  /**
   * Recupera los datos de enlace operativo invocando el método `getEnlaceOperativoDatos` del servicio.
   * Se suscribe a la respuesta del servicio y asigna los datos parseados a `enlaceOperativoDatos`.
   * La suscripción se cancela automáticamente cuando el observable `destroyNotifier$` emite un valor.
   *
   * @remarks
   * Este método utiliza el operador `takeUntil` para gestionar el ciclo de vida de la suscripción,
   * asegurando que la suscripción se limpie cuando el componente sea destruido.
   */
  public getEnlaceOperativo(): void {
    this.tercerosRelacionadosSvc.getEnlaceOperativoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.enlaceOperativoDatos = DATOS;
    })
  }

  /**
   * Recupera una lista de personas desde el servicio `tercerosRelacionadosSvc` y asigna la respuesta
   * a la propiedad `personaParas`. La respuesta se procesa convirtiéndola en un objeto JSON.
   * 
   * El observable se desuscribe automáticamente cuando el `destroyNotifier$` emite un valor,
   * asegurando una limpieza adecuada de los recursos.
   * 
   * @returns {void} Este método no retorna un valor.
   */
  public getPersonas(): void {
    this.tercerosRelacionadosSvc.getPersonasParaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.personaParas = DATOS;
    })
  }

  /**
   * Maneja el cambio de valor para un campo específico y actualiza el store en consecuencia.
   *
   * @param event - Un objeto que contiene el campo (`campo`) a actualizar y el nuevo valor (`valor`).
   *   - `campo`: El nombre del campo a actualizar.
   *   - `valor`: El nuevo valor a establecer. Si el valor es un objeto con una propiedad `id`, se utiliza el `id` como valor.
   * Si el `valor` es un objeto con una propiedad `id`, se extrae el `id` y se utiliza para actualizar el store.
   * De lo contrario, se utiliza el `valor` en sí mismo para actualizar el store.
   */
  public establecerCambioDeValor(event: { campo: string; valor: any }): void {
    if (event && typeof event.valor === 'object' && event.valor !== null && 'id' in event.valor) {
      const VALOR = event.valor.id;
      this.tercerosRelacionadosStore.setDynamicFieldValue(event.campo, VALOR);
    } else if (event) {
      this.tercerosRelacionadosStore.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  /**
   * Maneja el evento de cambio para un elemento de entrada y actualiza el valor correspondiente.
   *
   * @param event - El objeto de evento desencadenado por el elemento de entrada.
   * @param campo - El nombre del campo asociado con el elemento de entrada.
   *
   * Este método extrae el valor del elemento de entrada, crea un objeto de datos
   * que contiene el nombre del campo y su nuevo valor, y lo pasa al método `establecerCambioDeValor`
   * para manejar la lógica de actualización.
   */
  public eventoDeCambioDeValor(event: Event, campo: string): void {
    if (event.target) {
      const VALOR = (event.target as HTMLInputElement).value;
      const DATO = { campo: campo, valor: VALOR };
      this.establecerCambioDeValor(DATO);
    }
  }

  public guardarDatosFormulario(): void {
    this.tercerosRelacionadosSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.tercerosRelacionadosSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  /**
   * Gancho del ciclo de vida que se llama cuando el componente es destruido.
   * Limpia los recursos emitiendo un valor al subject `destroyNotifier$`
   * y completándolo para notificar a cualquier suscripción que debe desuscribirse.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
