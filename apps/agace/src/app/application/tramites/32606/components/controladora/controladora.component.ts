import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFecha, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CONTROLADAS_TABLA, RADIO_01, RADIO_AUTORIZO, RADIO_CLASIFICACION, TRANSPORTISTAS_TABLA } from '../../constantes/adace32606.enum';
import { FECHA_INICIO, FECHA_PAGO } from '../../models/adace.model';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { map, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-controladora',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent, InputFechaComponent, TituloComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './controladora.component.html',
  styleUrl: './controladora.component.css',
})
export class ControladoraComponent {
  public controladoraForm !: FormGroup;
  radioOpcions01 = RADIO_01;
  radioAutorizo = RADIO_AUTORIZO;
  radioClasificacion = RADIO_CLASIFICACION;
  fechaInicio: InputFecha = FECHA_INICIO;
  fechaDePago: InputFecha = FECHA_PAGO;
  TablaSeleccion = TablaSeleccion;
  public transportistasTabla = TRANSPORTISTAS_TABLA;
  public controladasTabla = CONTROLADAS_TABLA;
  soloLectura: boolean = false;
  public solicitudState!: Solicitud32606State;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder) { }


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
  }

  
  cambioFechaInicio(nuevo_fechaInicio: string): void {
    this.controladoraForm.patchValue({
      fechaPago: nuevo_fechaInicio,
    });
    this.setValoresStore(this.controladoraForm, 'fechaInicio', 'setFechaInicio');
  }

  cambioFechaPago(nuevo_fechaPago: string): void {
    this.controladoraForm.patchValue({
      fechaPago: nuevo_fechaPago,
    });
    this.setValoresStore(this.controladoraForm, 'fechaInicio', 'setFechaPago');
  }

   /**
     * Marca todos los campos del formulario como tocados si es inválido.
     */
    validarDestinatarioFormulario(): void {
      if (this.controladoraForm.invalid) {
        this.controladoraForm.markAllAsTouched();
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
    this.controladoraForm = this.fb.group({
      tipoRadio21: [{ value:this.solicitudState?.tipoRadio21,disabled: this.soloLectura}, [Validators.required]],
      tipoRadio22: [{ value:this.solicitudState?.tipoRadio22,disabled: this.soloLectura}, [Validators.required]],
      tipoRadio23: [{ value:this.solicitudState?.tipoRadio23,disabled: this.soloLectura}, [Validators.required]],
      monto: [{ value:this.solicitudState?.monto, disabled: this.soloLectura}, [Validators.required]],
      operacionesBancarias: [{ value:this.solicitudState?.operacionesBancarias,disabled: this.soloLectura}, [Validators.required]],
      llavePago: [{ value:this.solicitudState?.llavePago,disabled: this.soloLectura}, [Validators.required]],
      modalidad: [{ value:this.solicitudState?.modalidad,disabled: this.soloLectura}, [Validators.required]],
      fechaRegistro: [{ value:this.solicitudState?.fechaRegistro,disabled: this.soloLectura}, [Validators.required]],
      numeroAutorizacion: [{ value:this.solicitudState?.numeroAutorizacion,disabled: this.soloLectura}, [Validators.required]],
      radioAutorizo: [{ value:this.solicitudState?.radioAutorizo,disabled: this.soloLectura}, [Validators.required]],
      radioClasificacion: [{ value:this.solicitudState?.radioClasificacion,disabled: this.soloLectura}, [Validators.required]],
    });
  }


  ngOnDestroy(): void {
  }

}
