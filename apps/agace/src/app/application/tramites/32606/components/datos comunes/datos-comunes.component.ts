import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, ConsultaioState, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { BIOMESTRE_CATALOGO, DOMICILIO_CATALOGO, RADIO_01, SECTOR_PRODUCTIVO, SERVICIO_CATALOGO } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { map, ReplaySubject, takeUntil } from 'rxjs';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomicillioComponent } from '../domicillio/domicillio.component';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { QuerellaComponent } from '../querella/querella.component';
import { MiembroComponent } from '../miembro/miembro.component';

@Component({
  selector: 'app-datos-comunes',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, InputRadioComponent, ReactiveFormsModule,
    DomicillioComponent, QuerellaComponent, MiembroComponent, TituloComponent, NotificacionesComponent],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.css',
})
export class DatosComunesComponent implements OnInit, OnDestroy {
  /**
    * Observable para gestionar la destrucción del componente.
    */

  public sectorProductivo = SECTOR_PRODUCTIVO;
  public servicioCatalogo = SERVICIO_CATALOGO;
  public biomestreCatalogo = BIOMESTRE_CATALOGO;
  radioOpcions01 = RADIO_01;
  public datosComunesForm!: FormGroup;
  valorSeleccionado!: string;
  public nuevaNotificacion!: Notificacion;
  public nuevaNotificacion2!: Notificacion;
  public elementoParaEliminar!: number;
  public elementoParaEliminar2!: number;
  public pedimentos: Array<Pedimento> = [];
  soloLectura: boolean = false;
  public solicitudState!: Solicitud32606State;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  consultaDatos!: ConsultaioState;

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.inicializarEstadoFormulario();
    this.obtenerSectorProductivo();
    this.obtenerServicio();
    this.obtenerBimestre();
  }


  /**
 * Determina el estado inicial del formulario según el modo de solo lectura.
 * 
 * Si el formulario está en modo solo lectura, llama a `guardarDatosDelFormulario()` para deshabilitar los campos.
 * Si no está en modo solo lectura, llama a `datosDeAvisoForm()` para aplicar la configuración correspondiente.
 */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }

  /**
 * Habilita o deshabilita el formulario de acuerdo al modo de solo lectura.
 * 
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es `true`), 
 * deshabilita todos los campos del formulario para evitar modificaciones.
 * En caso contrario, habilita los campos para permitir la edición.
 */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.datosComunesForm.disable();
    } else {
      this.datosComunesForm.enable();
    }
  }


  cambiarRadio(value: string | number): void {
    this.valorSeleccionado = value as string;
    if (value === 'si') {
      this.abrirModal();
    }
  }

  cambiarRadio2(value: string | number): void {
    this.valorSeleccionado = value as string;
    if (value === 'no') {
      this.abrirModal();
    }
  }

  obtenerSectorProductivo(): void {
    this.economico
      .obtenerSectorProductivo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.sectorProductivo.catalogos = resp as Catalogo[];
      });
  }

  obtenerServicio(): void {
    this.economico
      .obtenerServicio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.servicioCatalogo.catalogos = resp as Catalogo[];
      });
  }

  obtenerBimestre(): void {
    this.economico
      .obtenerBimestre()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.biomestreCatalogo.catalogos = resp as Catalogo[];
      });
  }

  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }

  }
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificación de Empresas, de conformidad con la regla 7.1.1. de las RGCE.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.elementoParaEliminar = i;
  }

  eliminarPedimento2(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  /**
    * Marca todos los campos del formulario como tocados si es inválido.
    */
  validarDestinatarioFormulario(): void {
    if (this.datosComunesForm.invalid) {
      this.datosComunesForm.markAllAsTouched();
    }
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   *
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el almacén para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32606Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  donanteDomicilio(): void {
    this.datosComunesForm = this.fb.group({
      sectorProductivo: [{ value: this.solicitudState?.sectorProductivo, disabled: this.soloLectura }, [Validators.required]],
      servicio: [{ value: this.solicitudState?.servicio, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio01: [{ value: this.solicitudState?.tipoRadio01, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio02: [{ value: this.solicitudState?.tipoRadio02, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio03: [{ value: this.solicitudState?.tipoRadio03, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio04: [{ value: this.solicitudState?.tipoRadio04, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio05: [{ value: this.solicitudState?.tipoRadio05, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio06: [{ value: this.solicitudState?.tipoRadio06, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio07: [{ value: this.solicitudState?.tipoRadio07, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio08: [{ value: this.solicitudState?.tipoRadio08, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio09: [{ value: this.solicitudState?.tipoRadio09, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio10: [{ value: this.solicitudState?.tipoRadio10, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio11: [{ value: this.solicitudState?.tipoRadio11, disabled: this.soloLectura }, [Validators.required]],
      domicilio: [{ value: this.solicitudState?.domicilio, disabled: this.soloLectura }, [Validators.required]],
      biomestre: [{ value: this.solicitudState?.biomestre, disabled: this.soloLectura }, [Validators.required]],
      numeroEmpleados: [{ value: this.solicitudState?.numeroEmpleados, disabled: this.soloLectura }, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
