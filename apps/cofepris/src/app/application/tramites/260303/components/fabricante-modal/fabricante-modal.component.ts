import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud260303State, Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Subject,map, takeUntil } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';

/**
 * FabricanteModalComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */

@Component({
  selector: 'app-fabricante-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './fabricante-modal.component.html',
  styleUrl: './fabricante-modal.component.scss',
})
export class FabricanteModalComponent implements OnInit,OnDestroy {

  /**
   * Representa el título del componente modal.
   */
  titulo: string;
  /**
   * Representa el catálogo de países disponibles para selección.
   * Se espera que esta propiedad sea un arreglo de objetos `Catalogo`.
   */
  public paisCatalogo!: Catalogo[];
  /**
   * Un grupo de formulario reactivo utilizado para gestionar y validar 
   * los datos relacionados con las asociaciones de terceros en el componente.
   */
  public tercerosRelacionadosForm!: FormGroup;
  /**
   * Representa el estado de la Solicitud 260303.
   * Esta propiedad contiene los datos y la gestión del estado para la solicitud actual.
   * Se espera que se inicialice con una instancia de `Solicitud260303State`.
   */
  public solicitudState!: Solicitud260303State;
  /**
   * Notificador para destruir los observables al finalizar.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
   * Constructor del componente FabricanteModalComponent.
   * 
   * @param bsModalRef - Referencia a la instancia del modal de Bootstrap.
   * @param fb - Instancia de FormBuilder utilizada para crear y gestionar formularios reactivos.
   */
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private tramite260303Store: Tramite260303Store,
    private tramite260303Query: Tramite260303Query,
  ) {
    this.titulo = '';
  }

  /**
   * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * Este método se utiliza para realizar la lógica de inicialización del componente.
   * En esta implementación, invoca el método `cerrarTercerosRelacionadosForm` para reiniciar o cerrar
   * el formulario relacionado con las asociaciones de terceros.
   */
  ngOnInit(): void {
    this.tramite260303Query.selectSolicitud$.pipe(
    takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
    this.cerrarTercerosRelacionadosForm();
  }

  /**
   * Restablece el grupo de formulario `tercerosRelacionadosForm` con valores predeterminados vacíos.
   * Este método inicializa el formulario con controles para varios campos como
   * denominación social, RFC, CURP, detalles de dirección e información de contacto.
   * Cada control se establece con una cadena vacía como su valor predeterminado.
   *
   * @returns {void}
   */
  public cerrarTercerosRelacionadosForm(): void {
    this.tercerosRelacionadosForm = this.fb.group({
      denominacionSocial: [this.solicitudState.tercerosRelacionadosDenominacionSocial],
      terceroNombre: [this.solicitudState.tercerosRelacionadosTerceroNombre],
      nacional: [this.solicitudState.tercerosRelacionadosNacional],
      extranjero: [this.solicitudState.tercerosRelacionadosExtranjero],
      fisica: [this.solicitudState.tercerosRelacionadosFisica],
      moral: [this.solicitudState.tercerosRelacionadosMoral],
      noContribuyente: [this.solicitudState.tercerosRelacionadosNoContribuyente],
      rfc: [this.solicitudState.tercerosRelacionadosRfc],
      curp: [this.solicitudState.tercerosRelacionadosCurp],
      razonSocial: [this.solicitudState.tercerosRelacionadosRazonSocial],
      pais: [this.solicitudState.tercerosRelacionadosPais],
      estado: [this.solicitudState.tercerosRelacionadosEstado],
      codigoPostal: [this.solicitudState.tercerosRelacionadosCodigoPostal],
      calle: [this.solicitudState.tercerosRelacionadosCalle],
      numeroExterior: [this.solicitudState.tercerosRelacionadosNumeroExterior],
      numeroInterior: [this.solicitudState.tercerosRelacionadosNumeroInterior],
      lada: [this.solicitudState.tercerosRelacionadosLada],
      telefono: [this.solicitudState.tercerosRelacionadosTelefono],
      correoElectronico: [this.solicitudState.tercerosRelacionadosCorreoElectronico],
    });
  }


  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260303Store): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite260303Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
