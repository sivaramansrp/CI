import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablaDinamicaComponent, TituloComponent, TablaSeleccion, ConsultaioState, ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { EconomicoService } from '../../services/economico.service';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { ENLACE_OPERATIVO_TABLA, PERSONAS_TABLA } from '../../constantes/adace32606.enum';
import { RecibirNotificaciones } from '../../models/adace.model';
import { map, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-terceros-relacinados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './terceros-relacinados.component.html',
  styleUrl: './terceros-relacinados.component.css',
})
export class TercerosRelacinadosComponent {
  public tercerosRelacionadosForm !: FormGroup;
  TablaSeleccion = TablaSeleccion;
  public enlaceTabla = ENLACE_OPERATIVO_TABLA;
  public personasTabla = PERSONAS_TABLA;
  personasLista: RecibirNotificaciones[] = [] as RecibirNotificaciones[];
  soloLectura: boolean = false;
  public solicitudState!: Solicitud32606State;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  consultaDatos!: ConsultaioState;

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder,
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
      .subscribe();
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
      this.tercerosRelacionadosForm.disable();
    } else {
      this.tercerosRelacionadosForm.enable();
    }
  }

  /**
    * Marca todos los campos del formulario como tocados si es inválido.
    */
  validarDestinatarioFormulario(): void {
    if (this.tercerosRelacionadosForm.invalid) {
      this.tercerosRelacionadosForm.markAllAsTouched();
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
    this.tercerosRelacionadosForm = this.fb.group({
      rfcTercero: [{ value: this.solicitudState?.rfcTercero, disabled: this.soloLectura }, [Validators.required]],
      rfc: [{ value: this.solicitudState?.rfc, disabled: this.soloLectura }, [Validators.required]],
      nombre: [{ value: this.solicitudState?.nombre, disabled: this.soloLectura }, [Validators.required]],
      apellidoPaterno: [{ value: this.solicitudState?.apellidoPaterno, disabled: this.soloLectura }, [Validators.required]],
      apellidoMaterno: [{ value: this.solicitudState?.apellidoMaterno, disabled: this.soloLectura }, [Validators.required]],
      telefono: [{ value: this.solicitudState?.telefono, disabled: this.soloLectura }, [Validators.required]],
      correoElectronico: [{ value: this.solicitudState?.correoElectronico, disabled: this.soloLectura }, [Validators.required]],

    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
