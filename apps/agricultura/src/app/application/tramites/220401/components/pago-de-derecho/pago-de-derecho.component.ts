
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo, ConsultaioQuery } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { CommonModule } from '@angular/common';

import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { TituloComponent } from '@ng-mf/data-access-user';

import { Agregar220401Store, solicitud220401State } from '../../../../estados/tramites/agregar220401.store';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';

import { Subject, map, takeUntil } from 'rxjs';

/**
 * Componente que gestiona el formulario de pago de derechos de importación o exportación.
 * El formulario permite capturar información sobre la mercancía y el pago de derechos, y realiza 
 * la validación de campos y la habilitación/deshabilitación de ciertos campos según las selecciones del usuario.
 * 
 * @export
 * @class PagoDeDerechoComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  styleUrls: ['./pago-de-derecho.component.scss'],
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule, CatalogoSelectComponent],
  standalone: true,
})

export class PagoDeDerechoComponent implements OnInit, OnDestroy {
  /**
   * @comdoc
   * @descripcion Grupo de controles de formulario utilizado para gestionar y validar los datos ingresados en la solicitud.
   * @tipo FormGroup
   * @uso Este objeto se utiliza para agrupar y controlar los campos del formulario relacionados con el pago de derecho en el trámite.
   */
  FormSolicitud!: FormGroup; 
  /**
   * Notificador privado para cancelar las suscripciones y evitar fugas de memoria.
   * Se utiliza en los operadores takeUntil de RxJS.
   * 
   * @comdoc
   * @tipo Subject<void>
   * @acceso privado
   * @uso Permite emitir una señal para destruir las suscripciones activas al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
    /**
     * @comdoc
     * @descripcion Estado actual de la solicitud del trámite 220401.
     * @tipo solicitud220401State
     * @uso Almacena los datos de la solicitud para ser utilizados y actualizados en el formulario de pago de derecho.
     */
    public solicitudState!: solicitud220401State;
  // Respuesta seleccionada por el usuario
  /**
   * @comdoc
   * @descripcion Respuesta seleccionada por el usuario.
   * @tipo string
   * @uso Almacena la respuesta seleccionada en el formulario.
   */
  answer: string = '';
  
  /**
   * Opciones disponibles para justificar el pago.
   * @type {Catalogo[]}
   * @descripcion Arreglo de catálogos que contiene las opciones de justificación para el pago de derechos.
   * @uso Se utiliza para poblar el campo de justificación en el formulario.
   */
  public Justificacion!: Catalogo[];
  /**
   * Opciones disponibles para seleccionar el banco.
   * @tipo Catalogo[]
   * @descripcion Arreglo de catálogos que contiene las opciones de banco para el pago de derechos.
   * @uso Se utiliza para poblar el campo de banco en el formulario.
   */
  public Banco!: Catalogo[]; 
  /**
   * Indica si el formulario está en modo solo lectura.
   * @comdoc
   * @descripcion Determina si los campos del formulario deben estar deshabilitados para evitar modificaciones.
   * @tipo boolean
   * @uso Se utiliza para controlar la habilitación o deshabilitación de los campos del formulario según el estado de solo lectura.
   */
  esFormularioSoloLectura: boolean = false; 
  /**
   * Constructor del componente PagoDeDerecho.
   * 
   * @param fb - Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param agregar220401Store - Store para manejar el estado relacionado con el trámite 220401.
   * @param agregarQuery - Servicio para consultar el estado de la agregación.
   * @param consultaioQuery - Servicio para consultar el estado de la sección IO.
   * 
   * Al inicializar, se suscribe al estado de consultaioQuery para:
   * - Actualizar la propiedad `esFormularioSoloLectura` según el estado de solo lectura.
   * - Inicializar el formulario de derecho llamando a `inicializarDerechoFormulario()`.
   * La suscripción se gestiona con `takeUntil` para evitar fugas de memoria.
   */
  constructor(private fb: FormBuilder,
    private agregar220401Store: Agregar220401Store,
    private agregarQuery: AgregarQuery,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
      })
    )
    .subscribe()
   }

  /**
   * Hook de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * En este método:
   * - Se inicializan las opciones de justificación y banco llamando a `getJustificacion()` y `getBanco()`.
   * - Se define el grupo de formulario `FormSolicitud` con sus controles, validadores y valores iniciales.
   * - Se configura la lógica que habilita o deshabilita campos dependiendo de la selección del valor `exentoDePago`.
   * 
   * @memberof PagoDeDerechoComponent
   */
  ngOnInit(): void {

    this.inicializarDerechoFormulario();


}
    /**
     * Inicializa el formulario de solicitud de pago de derecho.
     *
     * - Suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud y lo asigna a `solicitudState`.
     * - Llama a los métodos `getJustificacion` y `getBanco` para obtener las opciones necesarias para los campos del formulario.
     * - Crea el formulario reactivo `FormSolicitud` con los campos requeridos y sus validaciones correspondientes, utilizando los valores del estado si están disponibles.
     * - Inicializa la lógica para actualizar los campos del formulario según el valor inicial de `exentoDePago`.
     * - Suscribe a los cambios del campo `exentoDePago` para actualizar dinámicamente los campos del formulario cuando este valor cambie.
     *
     * @remarks
     * Este método debe ser llamado durante la inicialización del componente para asegurar que el formulario y sus dependencias estén correctamente configurados.
     */
    inicializarFormulario():void{
    this.agregarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.getJustificacion(); // Obtiene las opciones para justificar el pago
    this.getBanco(); // Obtiene las opciones para seleccionar el banco
    this.FormSolicitud = this.fb.group({
     exentoDePago: [this.solicitudState?.exentoDePago || 'No', Validators.required],
       Justificacion: [this.solicitudState?.Justificacion || '', [Validators.required]],
        nombreImportExport: ['', Validators.required],
        rfcImportExport: ['', Validators.required],
        cadenaDependencia: ['', Validators.required],
        Banco:[this.solicitudState?.Banco],
        llaveDePago:[this.solicitudState?.llaveDePago],
       fechaPago:[this.solicitudState?.fechaPago,[ Validators.required]],
       importePago: ['', Validators.required],
      });
    

    // Se activa la lógica para actualizar campos según el valor inicial de 'exentoDePago'
    this.updateFormFieldsBasedOnExentoDePago('No');

     // Escucha los cambios en el valor de 'exentoDePago' y actualiza los campos del formulario
    this.FormSolicitud.get('exentoDePago')?.valueChanges.subscribe((value) => {
      this.updateFormFieldsBasedOnExentoDePago(value);
    });
    }

  /**
   * Inicializa el formulario de derecho según el modo de la vista.
   *
   * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), 
   * guarda los datos actuales del formulario llamando a `guardarDatosFormulario()`.
   * De lo contrario, inicializa el formulario llamando a `inicializarFormulario()`.
   */
  inicializarDerechoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

    /**
     * Guarda los datos del formulario y ajusta el estado de habilitación del mismo según el modo de solo lectura.
     *
     * Inicializa el formulario antes de aplicar los cambios. Si el formulario está en modo solo lectura,
     * lo deshabilita para evitar modificaciones. Si no está en modo solo lectura, lo habilita para permitir ediciones.
     * No realiza ninguna acción adicional si no se cumple ninguna de las condiciones anteriores.
     */
    guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.FormSolicitud.disable();
      } else {
        this.FormSolicitud.enable();
      } 
  }

  /**
   * Actualiza los campos del formulario en función del valor de 'exentoDePago'.
   * 
   * Si el valor es 'No', se habilitan los campos necesarios y se asignan valores predeterminados.
   * Si el valor es 'Sí', los campos se deshabilitan y se resetean.
   * 
   * @param value - El valor de 'exentoDePago' para determinar cómo actualizar los campos del formulario.
   * @memberof PagoDeDerechoComponent
   */
  updateFormFieldsBasedOnExentoDePago(value: string): void {
    if (value === 'No') {
      this.FormSolicitud.get('rfcImportExport')?.setValue('454000554');
      this.FormSolicitud.get('cadenaDependencia')?.setValue('0001012A0000EX');
      this.FormSolicitud.get('importePago')?.setValue('594.0');
      this.FormSolicitud.get('fechaPago')?.enable();
      this.FormSolicitud.get('llaveDePago')?.enable();
      
      this.FormSolicitud.get('rfcImportExport')?.disable();
      this.FormSolicitud.get('cadenaDependencia')?.disable();
      this.FormSolicitud.get('importePago')?.disable();
    } else {
      this.FormSolicitud.get('rfcImportExport')?.reset();
      this.FormSolicitud.get('cadenaDependencia')?.reset();
      this.FormSolicitud.get('importePago')?.reset();
      
      this.FormSolicitud.get('rfcImportExport')?.disable();
      this.FormSolicitud.get('cadenaDependencia')?.disable();
      this.FormSolicitud.get('importePago')?.disable();
      this.FormSolicitud.get('fechaPago')?.disable();
      this.FormSolicitud.get('llaveDePago')?.disable();
    }
  }
  /**
 * Asigna al store el valor de un campo de formulario usando el método especificado.
 *
 * @param form Grupo de formulario que contiene el campo.
 * @param campo Nombre del control dentro del formulario.
 * @param metodoNombre Nombre del método del store (`Agregar220401Store`) que recibirá el valor.
 */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar220401Store): void {
    const VALOR = form.get(campo)?.value;
    
   (this.agregar220401Store[metodoNombre] as (value: string) => void)(VALOR);
  }
  /**
   * Obtiene las opciones de justificación para el pago de derechos.
   * 
   * En este caso, las opciones son 'Sí' o 'No'.
   * 
   * @memberof PagoDeDerechoComponent
   */
  public getJustificacion(): void {
    this.Justificacion = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];
  }

  /**
   * Obtiene las opciones de banco disponibles.
   * 
   * En este caso, las opciones son 'Sí' o 'No'.
   * 
   * @memberof PagoDeDerechoComponent
   */
  public getBanco(): void {
    this.Banco = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];
  }
 
  /**
   * Valida el formulario de pago de derecho.
   *
   * @comdoc
   * @descripcion Verifica si el formulario es inválido y permite implementar lógica adicional en caso de que no cumpla con las validaciones.
   * @uso Se puede utilizar para mostrar mensajes de error o evitar el envío del formulario si hay campos inválidos.
   */
  validarFormulario(): void {
    if (this.FormSolicitud.invalid) {    
      // Aquí se puede agregar lógica para manejar el formulario inválido
    }
  }

  /**
   * Hook de ciclo de vida de Angular que se ejecuta al destruir el componente.
   * 
   * Emite una señal para cancelar todas las suscripciones activas y evitar fugas de memoria.
   * 
   * @comdoc
   * @descripcion Cancela las suscripciones y libera recursos al destruir el componente.
   * @uso Se utiliza para limpiar las suscripciones de RxJS y otros recursos al finalizar el ciclo de vida del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
