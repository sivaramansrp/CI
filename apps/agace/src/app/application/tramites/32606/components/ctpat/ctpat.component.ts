import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery, ConsultaioState, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RADIO_01 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { map, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ctpat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent],
  templateUrl: './ctpat.component.html',
  styleUrl: './ctpat.component.css',
})
export class CtpatComponent implements OnDestroy, OnInit {
  radioOpcions01 = RADIO_01;
  public ctpatForm !: FormGroup;
  soloLectura: boolean = false;
  public solicitudState!: Solicitud32606State;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  consultaDatos!: ConsultaioState;

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder,
    private consultaioQuery: ConsultaioQuery) {
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
      this.ctpatForm.disable();
    } else {
      this.ctpatForm.enable();
    }
  }

  /**
    * Marca todos los campos del formulario como tocados si es inválido.
    */
  validarDestinatarioFormulario(): void {
    if (this.ctpatForm.invalid) {
      this.ctpatForm.markAllAsTouched();
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
    this.ctpatForm = this.fb.group({
      tipoRadio24: [{ value: this.solicitudState?.tipoRadio24, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio25: [{ value: this.solicitudState?.tipoRadio25, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio26: [{ value: this.solicitudState?.tipoRadio26, disabled: this.soloLectura }, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
