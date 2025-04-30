import { Component, OnInit } from '@angular/core';
import { ConfiguracionColumna, InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDelContenedor } from '@libs/shared/data-access-user/src/core/models/11202/datos-tramite.model';
import { DOMICILIO_TABLA_COLUMNAS, FECHA_INGRESO } from '../../constantes/concluir-relacion.enum';
import { Subject, takeUntil } from 'rxjs';
import { ConcluirRelacionService } from '../../services/concluir-relacion.service';
import { Tramite420102Store } from '../../estados/tramite420102.store';
import { Tramite4201023Query } from '../../estados/tramite420102.query';


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
export class ConcluirRelacionComponent implements OnInit {

  /**
   * Formulario reactivo utilizado para capturar los datos del trámite.
   */
  public concluirFormulario!: FormGroup;
  
  public fechaInicioInput: InputFecha = FECHA_INGRESO;
  
  seleccionTabla = TablaSeleccion.RADIO;

  public encabezadoDeTabla = DOMICILIO_TABLA_COLUMNAS;
  
  fechaPagoDate: string = '';

  datosTabla: any[] = [];

  private destroyNotifier$: Subject<void> = new Subject();


  constructor(
    private fb: FormBuilder,
    private concluirrelacionService: ConcluirRelacionService,
    private tramite420102Store: Tramite420102Store,
    private tramite420102Query: Tramite4201023Query,
    // private desistimientoService: DesistimientoSolicitudService,
    // private readonly desistimientoStore: Solicitud230301Store,
    // private consultaSolicitud230301: ConsultaSolicitud230301Query,
    // private seccionQuery: SeccionLibQuery,
    // private seccionStore: SeccionLibStore
  ) {
        // Se puede agregar aquí la lógica del constructor si es necesario
  }

  ngOnInit(): void {
    //   this.consultaSolicitud230301.estadoSolicitud$
    //   .pipe(
    //     takeUntil(this.destroyNotifier$),
    //     map((seccionState) => {
    //       this.solicitudState = seccionState;
    //     })
    //   )
    //   .subscribe();

    //   // Suscripción al estado de la sección
    //   this.seccionQuery.selectSeccionState$
    //     .pipe(
    //       takeUntil(this.destroyNotifier$),
    //       map((seccionState) => {
    //         this.seccion = seccionState;
    //       })
    //     )
    //     .subscribe();
      this.crearDesistimientoForm();
    //   this.getFromdata();
  }

  crearDesistimientoForm (): void {
    // Inicialización del formulario reactivo
    this.concluirFormulario = this.fb.group({
      rfc: [
        '',
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

    
  /**
   * Busca una solicitud utilizando el valor de `claveFolioCAAT` proporcionado en el formulario.
   */
  concluirFormularioSubmit(): void {
    if (this.concluirFormulario.valid) {
      this.concluirrelacionService.obtenerTablerList('concluir-relacion-Tablea.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
        this.datosTabla = data;
      });
    }
  }

  buscarRFC(): void {
    console.log('buscando RFC');
    this.tramite420102Store.establecerRfc(this.concluirFormulario.get('rfc')?.value);

    if (this.concluirFormulario.valid) {
      this.concluirrelacionService.obtenerTablerList('concluir-relacion-Tablea.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
        console.log(data, "DDDDDDDDd")
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
}
