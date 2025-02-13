import { Component } from '@angular/core';
import {
  Catalogo
} from '../../../../core/models/shared/catalogos.model';
import {
  DatosInputCheck,
  InputFecha,
} from '../../../../core/models/shared/components.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import {
  FECHA_FINAL,
  FECHA_INICIO,
} from '../../../../shared/constantes/servicios-extraordinarios.enum';
import {
  TIPO_SOLICITUD,
} from '../../../../shared/constantes/constantes';
import { FechasService } from '../../../../core/services/shared/fechas/fechas.service';
import { DatosParaValidacionFecha } from '../../../../core/models/shared/fechas.model';
import {
  delay,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})

export class SolicitudComponent {


  tipoSolSeleccionada!: Catalogo;

  fechaInicioInput: InputFecha = FECHA_INICIO;
  fechaFinalInput: InputFecha = FECHA_FINAL;

  FormSolicitud!: FormGroup;

  colapsable: boolean = false;
  mercanciaCollapsable: boolean = false;

  selectRangoDias: Array<string> = [];

  private destroyNotifier$: Subject<void> = new Subject();
  private seccion: SeccionState;

  datosGeneralesArr: any = [];
  origenArr: any = [];
  federativaOrigen: string;

  constructor(
    private seccionStore: SeccionStore,
    private fechaService: FechasService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.crearFormSolicitud();
  }

  ngOnInit(): void {
    this.FormSolicitud.statusChanges.pipe(
      takeUntil(this.destroyNotifier$),
      delay(10),
      tap((value) => {
        let seccion: number;
        const formasValidadas = this.seccion.formaValida;
        for (let i = 0; i < this.seccion.seccion.length; i++) {
          if (this.seccion.seccion[i] === true && this.seccion.formaValida[i] === false) {
            seccion = i;
            break;
          }
        }
        if (this.FormSolicitud.valid) {
          formasValidadas[seccion] = true;
          this.seccionStore.establecerFormaValida(formasValidadas);
        } else {
          formasValidadas[seccion] = false;
          this.seccionStore.establecerFormaValida(formasValidadas);
        }
      })
    )
      .subscribe();
  }

  /**
 * Obtiene el grupo de formulario 'datosMercancia' del formulario principal 'FormSolicitud'.
 *
 * @returns {FormGroup} El grupo de formulario 'datosMercancia'.
 */

  get datosMercancia(): FormGroup {
    return this.FormSolicitud.get('datosMercancia') as FormGroup;
  }

  /**
* Obtiene el grupo de formulario 'datosGenerales' del formulario principal 'FormSolicitud'.
*
* @returns {FormGroup} El grupo de formulario 'datosGenerales'.
*/

  get datosGenerales(): FormGroup {
    return this.datosMercancia.get('datosGenerales') as FormGroup;
  }

  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  crearFormSolicitud() {
    this.FormSolicitud = this.fb.group({
      datosDelTramitRealizer: this.fb.group({
        tipoDeCertificado: ['', Validators.required],
        seccionAduanera: ['', Validators.required],
        puntoDestino: ['', Validators.required],
        paisDeDestino: ['', Validators.required],
        paisDeProcedencia: ['', Validators.required]
      }),
      datosMercancia: this.fb.group({
        rangoDeFechas: [''],
        fechaInicio: [{ value: '', disabled: true }, [Validators.required]],
        fechaFinal: [[{ value: '', disabled: true }, [Validators.required]]],
        datosGenerales: this.fb.group({
          fraccionArancelaria: ['', [Validators.required]],
          descdelaFraccion: ['', Validators.required],
          cantidadUMT: ['', Validators.required],
          UMT: ['', Validators.required],
          cantidadUMC: ['', Validators.required],
          UMC: ['', Validators.required],
          paisdeOrigen: ['', Validators.required],
          entidadFederativadeOrigen: ['', Validators.required],
          municipiodeOrigen: [[''], Validators.required],
          datosOrigen: this.fb.array([]),
          marcasDistintivas: ['', Validators.required],
          USO: ['', Validators.required]
        })
      }),
      numeroDescDeLosEmpaques: this.fb.group({
        numero: ['', [Validators.required]],
        empaques: ['', [Validators.required]]
      }),
      unidadDeVerificacion: this.fb.group({
        unidadDeVerify: ['', [Validators.required]],
        terceroEspecialista: ['', [Validators.required]]
      }),
      unidadExpedidoraFitosanitario: this.fb.group({
        entidadFederative: ['', [Validators.required]],
        terceroEspecialista: ['', [Validators.required]]
      })
    });
  }

  fechaInicio() {
    const fechaInicio = this.datosMercancia.get('fechaInicio')?.value;
    return fechaInicio;
  }

  cambioFechaInicio(nuevo_valor: string) {
    this.datosMercancia.get('fechaInicio')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaInicio')?.markAsUntouched();
  }

  cambioFechaFinal(nuevo_valor: string) {
    this.datosMercancia.get('fechaFinal')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaFinal')?.markAsUntouched();
  }

  /**
   * Valida el formulario
   */
  validarFormulario(): void {
    if (this.FormSolicitud.invalid) {
      this.FormSolicitud.markAllAsTouched();
      return;
    }
  }

  valorInputCheck(e: DatosInputCheck) {
    
  }

  obtenerHora(e: string, tipo: string) {
    if (tipo === 'i') {
      this.datosMercancia.get('horaInicio')?.setValue(e);
    } else if (tipo === 'f') {
      this.datosMercancia.get('horaFinal')?.setValue(e);

      const fechaInicial = this.datosMercancia.get('fechaInicio')?.value;
      const fechaFinal = this.datosMercancia.get('fechaFinal')?.value;
      const horaInicial = this.datosMercancia.get('horaInicio')?.value;
      const horaFinal = this.datosMercancia.get('horaFinal')?.value;

      const rangoFecha = {
        fechaInicio: this.fechaService.formatoFechaGuion(fechaInicial, false),
        horaInicio: horaInicial,
        fechaFin: this.fechaService.formatoFechaGuion(fechaFinal, false),
        horaFin: horaFinal,
      };
      this.validaRangoFechas(rangoFecha);
    }
  }

  validaRangoFechas(datos: DatosParaValidacionFecha): void {
    switch (this.tipoSolSeleccionada.id) {
      case TIPO_SOLICITUD.INDIVIDUAL:
        const rangoFechaValida = this.fechaService.validacion24Horas(datos);
        if (!rangoFechaValida) {
          // Aqui se muestra un mensaje de error
          alert('El rango de fechas no puede ser mayor a 24 horas');
          return;
        }
        this.rango_fechas();

        break;
      case TIPO_SOLICITUD.SEMANAL:
        const rangoFechaSemana = this.fechaService.validacionSemana(datos);
        if (!rangoFechaSemana) {
          // Aqui se muestra un mensaje de error
          alert('El rango de fechas no puede ser mayor a una semana');
          return;
        }
        this.rango_fechas();
        break;
      case TIPO_SOLICITUD.MENSUAL:
        const rangoFechaMes = this.fechaService.validacionMes(datos);
        if (!rangoFechaMes) {
          // Aqui se muestra un mensaje de error
          alert('El rango de fechas no puede ser mayor a un mes');
          return;
        }
        this.rango_fechas();
        break;
    }
  }

  rango_fechas() {
    const fechaInicial = this.datosMercancia.get('fechaInicio')?.value;
    const fechaFinal = this.datosMercancia.get('fechaFinal')?.value;

    const formatoFechaInicial =
      this.fechaService.formatoFechaGuion(fechaInicial);
    const formatoFechaFinal = this.fechaService.formatoFechaGuion(fechaFinal);

    this.selectRangoDias = this.fechaService.obtenerDiasEntreFechas(
      formatoFechaInicial,
      formatoFechaFinal
    );

    this.colapsable = true;
  }

  mercancia_colapsable() {
    this.mercanciaCollapsable = !this.mercanciaCollapsable;
  }

  mercancia_delete(i: number) {
    this.datosGeneralesArr.splice(i, 1);
  }

  mercanciaAgregar() {
    this.datosGeneralesArr.push(this.datosMercancia.get('datosGenerales')?.value);
    this.mercancia_colapsable();
  }

  municipioAgregar() {
    this.federativaOrigen = this.datosGenerales.get('entidadFederativadeOrigen')?.value || 'NA';
    this.origenArr = this.datosGenerales.get('municipiodeOrigen')?.value || [];
  }

  municipioEliminar() {
    const municipioOrigin = this.datosGenerales.get('municipiodeOrigen')?.value;
    this.origenArr = this.origenArr.filter((item: any) => item.indexOf(municipioOrigin) == -1);
  }

  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

}
