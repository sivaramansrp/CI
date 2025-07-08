import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,map, takeUntil } from 'rxjs';
import { ComercioExteriorService } from '../../services/comercio-exterior.service';
import { DatosComunesService } from '../../../../shared/services/datos-comunes.service';
import { TercerosRelacionadosService } from '../../../../shared/services/terceros-relacionados.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit,OnDestroy {

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Representa el estado actual del proceso de consulta.
   * Esta propiedad contiene una instancia de `ConsultaioState`, que incluye
   * todos los datos relevantes e información de estado para la consulta en curso.
   */
  public consultaState!: ConsultaioState;

public mostrarDatosPorRegimen = false;
  mostrarPopup = false;
  popupMessage = '';

  readonly POPUP_TRIGGER_VALUES: Record<string, string> = {
  preOperativo: 'No',
  indiqueSi: 'No',
  senale: 'No',
  senaleSi: 'No',
  senaleMomento: 'No',
  ingresar: 'No',
  indiqueCuenta: 'No',
  contabilidad: 'No',
  // Add more controls here that should trigger on "No"
  // e.g. otroControl: 'No',
  // All others will default to "Si"
};

  // Centralized popup messages for all radios (including those from child shared components)
  readonly POPUP_MESSAGES: Record<string, string> = {
    autorizacionIVAIEPS: 'la empresa ya cuenta con una solicitud previa bajo el esquema pre-operativo, por lo que no podrá solicitario nuevamente.',
    preOperativo: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    indiqueSi: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    senale:'Es un requisito obligatorio el contar con algún tipo de empleado, ya sea propio o subcontratado para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    senaleSi:'Es un requisito obligatorio el contar con algún tipo de empleado, ya sea propio o subcontratado para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    encuentra: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    senaleMomento: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    delMismo: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    enCaso: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    ingresar: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    momentoIngresar: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    encuentraSus: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    rmfRadio: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    vinculacionRegistroCancelado: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    proveedoresListadoSAT: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    indiqueCuenta: 'Debe agregar por lo menos un control de inventarios.',
    contabilidad: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificaión de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
    // Add more as needed
  };

  /**
   * Construye una instancia de PasoUnoComponent.
   * @param comercioExteriorSvc - Servicio para manejar operaciones relacionadas con comercio exterior.
   * @param consultaQuery - Servicio de consulta para obtener datos.
   */
  constructor(
    private comercioExteriorSvc: ComercioExteriorService,
    private datosComunesSvc: DatosComunesService,
    private tercerosRelacionadosSvc: TercerosRelacionadosService,
    private consultaQuery: ConsultaioQuery
   ) {

   }

  /**
   * Método del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * - Se suscribe al observable `selectConsultaioState$` de `consultaQuery` y actualiza la propiedad local `consultaState` con el estado emitido.
   * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite, evitando fugas de memoria.
   * - Si el `consultaState` actualizado tiene la bandera `update` en verdadero, se ejecuta el método `guardarDatosFormulario()` para guardar los datos del formulario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
        if(this.consultaState.update) {
          this.guardarDatosFormulario();
          this.guardarDatosFormularioDos();
          this.guardarDatosComunesFormulario();
          this.guardarTercerosFormulario();
        }
    })).subscribe();
   }
  
  /**
   * Selecciona una pestaña por su índice y actualiza el índice de la pestaña actual.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Recupera los datos del formulario desde el servicio comercioExteriorSvc y actualiza el estado del formulario.
   * Este método se suscribe al observable retornado por `getConsultaDatos()`, y por cada par clave-valor
   * en la respuesta, llama a `actualizarEstadoFormulario` para actualizar el estado del formulario en consecuencia.
   * La suscripción se cancela automáticamente cuando se emite `destroyNotifier$`.
   */
  public guardarDatosFormulario(): void {
    this.comercioExteriorSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.comercioExteriorSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  /**
   * Recupera los datos para el segundo formulario desde el servicio comercioExteriorSvc y actualiza el estado del formulario.
   * 
   * Se suscribe al observable retornado por `getConsultaDatosDos()` y, al recibir una respuesta,
   * llama a `estadoFormulario` con los datos recibidos para actualizar el estado del formulario.
   * La suscripción se cancela automáticamente cuando se emite `destroyNotifier$`.
   */
  public guardarDatosFormularioDos(): void {
    this.comercioExteriorSvc.getConsultaDatosDos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.comercioExteriorSvc.estadoFormulario(response)
    })
  }

  /**
   * Recupera los datos comunes del formulario desde el servicio y actualiza el estado del formulario.
   * 
   * Se suscribe al observable `getConsultaDatosComunes` de `datosComunesSvc` y,
   * al recibir una respuesta, actualiza el estado del formulario llamando a
   * `actualizarEstadoFormulario` con los datos recibidos.
   */
  public guardarDatosComunesFormulario(): void {
    this.datosComunesSvc.getConsultaDatosComunes().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.datosComunesSvc.actualizarEstadoFormulario(response);
    })
  }

  /**
   * Guarda el estado actual del formulario de "Terceros" recuperando los datos desde el servicio,
   * luego itera sobre cada entrada en el objeto de respuesta para actualizar el estado del formulario
   * para cada par clave-valor utilizando el método `actualizarEstadoFormulario`.
   * 
   * La suscripción al observable se cancela automáticamente cuando el componente es destruido,
   * utilizando el subject `destroyNotifier$` para prevenir fugas de memoria.
   */
  public guardarTercerosFormulario(): void {
    this.tercerosRelacionadosSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.tercerosRelacionadosSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  onRadioChanged(event: { controlName: string, value: unknown }): void {
  // Use the trigger value from the map, default to "Si"
  const TRIGGER_VALUE = this.POPUP_TRIGGER_VALUES[event.controlName] || 'Si';
  if (event.value === TRIGGER_VALUE && this.POPUP_MESSAGES[event.controlName]) {
    this.popupMessage = this.POPUP_MESSAGES[event.controlName];
    this.mostrarPopup = true;
  }
  }

cerrarPopup():void {
  this.mostrarPopup = false;
}

  /**
   * Método del ciclo de vida que se llama cuando el componente es destruido.
   * Emite un valor y completa el subject `destroyNotifier$` para notificar a cualquier suscripción
   * que debe limpiar recursos y prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
