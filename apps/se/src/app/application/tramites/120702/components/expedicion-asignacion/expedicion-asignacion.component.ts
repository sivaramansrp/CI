import {
  Catalogo,
  CatalogoSelectComponent,
  InputFechaComponent,
  TableComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  INFORMACION_DESCRPCION_CUPO,
  INPUT_FECHA_FIN,
  INPUT_FECHA_INICIO,
} from '../../constantes/expedicion-certificados-frontera.enum';
import {
  MontoExpedirTablaDatos,
  TablaDatos,
} from '../../models/expedicion-certificados-frontera.models';
import { Subject, takeUntil } from 'rxjs';
import { DescripcionCupoComponent } from '../descripcion-cupo/descripcion-cupo.component';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite120702Query } from '../../estados/tramite120702.query';
import { Tramite120702Store } from '../../estados/tramite120702.store';

@Component({
  selector: 'app-expedicion-asignacion',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    DescripcionCupoComponent,
    InputFechaComponent,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TableComponent,
  ],
  templateUrl: './expedicion-asignacion.component.html',
  styleUrl: './expedicion-asignacion.component.scss',
})
export class ExpedicionAsignacionComponent implements OnInit, OnDestroy {
  public asignacionForm!: FormGroup;

  public informacionFormData = INFORMACION_DESCRPCION_CUPO;

  private destroy$ = new Subject<void>();

  fechaIncicioAsignacion = INPUT_FECHA_INICIO;
  fechaFinAsignacion = INPUT_FECHA_FIN;
  fechaInicioDate: string = '15/11/2024';
  fechaFinDate: string = '15/11/2025';

  anoOficioDatos: Catalogo[] = [];
  montoTablaDatos: string[] = [];
  montoTablaFilaDatos: TablaDatos[] = [];

  constructor(
    private fb: FormBuilder,
    private tramite120702Store : Tramite120702Store,
    private tramite120702Query: Tramite120702Query,
    private expedicionCertificadosFronteraService: ExpedicionCertificadosFronteraService
  ) {
    //
  }

  ngOnInit(): void {
    this.expedicionCertificadosFronteraService
      .getAnoOficioDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.anoOficioDatos = data;
      });

    this.expedicionCertificadosFronteraService
      .getMontoExpedirTabla()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: MontoExpedirTablaDatos) => {
        this.montoTablaDatos = data.columns;
      });

    this.establecerAsignacionFormGroup();
  }

  establecerAsignacionFormGroup(): void {
    this.asignacionForm = this.fb.group({
      anoDelOficio: new FormControl('', [Validators.required]),
      numeroOficio: new FormControl('', [Validators.required]),
      estado: new FormControl({ value: 'CHIHUAHUA', disabled: true }),
      representacionFederal: new FormControl({
        value: 'CIUDAD JUAREZ',
        disabled: true,
      }),
      montoAsignado: new FormControl({ value: '500', disabled: true }),
      montoExpedido: new FormControl({ value: '130', disabled: true }),
      montoDisponible: new FormControl({ value: '370', disabled: true }),
      datosNumeroOficio: new FormControl({ value: '2', disabled: true }),
      montoADisponible: new FormControl({ value: '370', disabled: true }),
      montoAExpedir: new FormControl({ value: '', disabled: false }),
      totalAExpedir: new FormControl({ value: '', disabled: true }),
    });
  }

  public setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite120702Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite120702Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  enviarMontoFormulario(): void {
    const MONTO_A_EXPEDIR_FILA = {
      tbodyData: [this.asignacionForm.value.montoAExpedir],
    };
    this.montoTablaFilaDatos.push(MONTO_A_EXPEDIR_FILA);

    const MONTO_A_EXPEDIR = this.asignacionForm.get('montoAExpedir')?.value;
    this.asignacionForm.get('totalAExpedir')?.setValue(MONTO_A_EXPEDIR);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
