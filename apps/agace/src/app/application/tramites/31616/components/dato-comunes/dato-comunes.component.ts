import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent, Catalogo, CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import productivo from 'libs/shared/theme/assets/json/31616/productivo.json';
import serviciosAgace from 'libs/shared/theme/assets/json/31616/serviciosAgace.json';
import { Solicitud31616State, Tramite31616Store } from '../../../../estados/tramites/tramite31616.store';
import { Tramite31616Query } from '../../../../estados/queries/tramite31616.query';
import { map, Subject, takeUntil } from 'rxjs';
import { ALERTA_COM,OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-dato-comunes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    InputRadioComponent
  ],
  templateUrl: './dato-comunes.component.html',
  styleUrl: './dato-comunes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DatoComunesComponent implements OnInit, OnDestroy, AfterViewInit {
  datosComunesForma!:FormGroup
  
  /**
   * Lista de sectores productivos obtenidos desde un archivo JSON.
   */
  sectorProductivoAgace: Catalogo[] = productivo;

  /**
   * Lista de servicios Agace obtenidos desde un archivo JSON.
   */
  serviciosAgace: Catalogo[] = serviciosAgace;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud31616State;

  /**
   * Notificador para destruir observables.
   */

  
  /**
   * Constante de alerta utilizada en el componente.
   * @type {typeof ALERTA_COM}
   */
  alerta = ALERTA_COM;

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  private destroyNotifier$: Subject<void> = new Subject();

  @ViewChild('confirmModal', { static: false }) confirmModal!: ElementRef;
  /**
   * Instancia del modal de modificación.
   */
  confirmInstance!: Modal;

  constructor(
    private fb: FormBuilder,
    private tramite31616Store: Tramite31616Store,
    private tramite31616Query: Tramite31616Query,
  ) {}

  ngOnInit(): void {
    this.tramite31616Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
      this.crearFormulario()
  }

  ngAfterViewInit() {
    // Inicializa el modal de modificación
    if (this.confirmModal) {
      this.confirmInstance = new Modal(this.confirmModal.nativeElement);
    }

  }

  openConfirmModal() {
    if (this.confirmInstance) {
      this.confirmInstance.show();
    }
  }

  closeConfirmModal() {
    if (this.confirmInstance) {
      this.confirmInstance.hide();
    }
  }

  crearFormulario():void{
    this.datosComunesForma = this.fb.group({
      sectorProductivo:[this.solicitudState?.sectorProductivo],
      servicio:[this.solicitudState?.servicio],
      solicitudDeInspeccion:[this.solicitudState?.solicitudDeInspeccion],
      indiqueAutorizo:[this.solicitudState?.indiqueAutorizo],
    })
  }

  /**
   * Establece valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31616Store,
    comprobarModal?:boolean,
    comprobarModalValor?:number
  ): void {
    const VALOR = form.get(campo)?.value;
    if(comprobarModal && VALOR == comprobarModalValor){
      this.openConfirmModal()
    }
    (this.tramite31616Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Maneja el evento de cambio de valor.
   */
  enCambioDeValor(): void {
    // Implementar la lógica para evento de cambio de valor.
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
