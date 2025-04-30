import { Component, OnDestroy, OnInit } from '@angular/core';
import { DOMICILIO_TABLA_COLUMNAS, FECHA_INGRESO } from '../../constantes/concluir-relacion.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil} from 'rxjs';
import { Tramite420102State, Tramite420102Store } from '../../estados/tramite420102.store';
import { CommonModule } from '@angular/common';
import { ConcluirRelacionService } from '../../services/concluir-relacion.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Tramite420102Query } from '../../estados/tramite420102.query';


@Component({
  selector: 'app-concluir-relacion',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputFechaComponent
  ],
  templateUrl: './concluir-relacion.component.html',
  styleUrl: './concluir-relacion.component.scss',
})
export class ConcluirRelacionComponent implements OnInit, OnDestroy {

  /**
   * Formulario reactivo utilizado para capturar los datos del trámite.
   */
  public concluirFormulario!: FormGroup;
  
  public fechaInicioInput: InputFecha = FECHA_INGRESO;
  

  public encabezadoDeTabla = DOMICILIO_TABLA_COLUMNAS;
  

  private destroyNotifier$: Subject<void> = new Subject();
  
  public solicitudState!: Tramite420102State;

  fechaPagoDate: string = '';
  
  seleccionTabla = TablaSeleccion.RADIO;

  datosTabla : any = [];

  constructor(
    private fb: FormBuilder,
    private concluirrelacionService: ConcluirRelacionService,
    private tramite420102Store: Tramite420102Store,
    private tramite420102Query: Tramite420102Query,
  ) {
        // Se puede agregar aquí la lógica del constructor si es necesario
  }

  ngOnInit(): void {
    this.tramite420102Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
      this.crearDesistimientoForm();
  }

  crearDesistimientoForm (): void {
    this.concluirFormulario = this.fb.group({
      rfc: [
        this.solicitudState?.rfc || '',
        Validators.required,
      ],
      fechaInicial: [
        { value:'', disabled: true },
      ],
      fechaFinal: [
        { value: '', disabled: true },
      ],
    });
  }

  concluirFormularioSubmit(): void {
    if (this.concluirFormulario.valid) {
      this.concluirrelacionService.obtenerTablerList('concluir-relacion-Tablea.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
        this.datosTabla = data;
      });
    }
  }

  buscarRFC(): void {
    this.tramite420102Store.establecerRfc(this.concluirFormulario.get('rfc')?.value);
    if (this.concluirFormulario.valid) {
      this.concluirrelacionService.obtenerTablerList('concluir-relacion-Tablea.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
        this.datosTabla = data;
      });
    }
  }

  public cambiarFechaInicio(nuevo_valor: string): void {
    this.concluirFormulario.patchValue({
        fechaInicial: nuevo_valor,
    });
    this.concluirFormulario.get('fechaInicial')?.setValue(nuevo_valor);
    this.concluirFormulario.get('fechaInicial')?.markAsUntouched();
  }

  public cambiarFechaFinal(nuevo_valor: string): void {
    this.concluirFormulario.patchValue({
        fechaFinal: nuevo_valor,
    });
    this.concluirFormulario.get('fechaFinal')?.setValue(nuevo_valor);
    this.concluirFormulario.get('fechaFinal')?.markAsUntouched();
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete(); 
  }
}
