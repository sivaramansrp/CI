import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFecha, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CONTROLADAS_TABLA, RADIO_01, RADIO_AUTORIZO, RADIO_CLASIFICACION, TRANSPORTISTAS_TABLA } from '../../constantes/adace32606.enum';
import { FECHA_INICIO, FECHA_PAGO } from '../../models/adace.model';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Tramite32606Store } from '../../state/Tramite32606.store';

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

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.donanteDomicilio();
  }

  donanteDomicilio(): void {
    this.controladoraForm = this.fb.group({
      tipoRadio21: [''],
      tipoRadio22: [''],
      tipoRadio23: [''],
      monto: [''],
      operacionesBancarias: [''],
      llavePago: [''],
      modalidad: [''],
      fechaRegistro: [''],
      numeroAutorizacion: [''],
      radioAutorizo: [''],
      radioClasificacion: [''],

    });
  }

  cambioFechaInicio(nuevo_fechaInicio: string): void {
    this.controladoraForm.patchValue({
      fechaPago: nuevo_fechaInicio,
    });
    // this.setValoresStore(this.controladoraForm, 'fechaInicio', 'setFechaPago');
  }

  cambioFechaPago(nuevo_fechaPago: string): void {
    this.controladoraForm.patchValue({
      fechaPago: nuevo_fechaPago,
    });
    // this.setValoresStore(this.controladoraForm, 'fechaInicio', 'setFechaPago');
  }

  ngOnDestroy(): void {
  }

}
