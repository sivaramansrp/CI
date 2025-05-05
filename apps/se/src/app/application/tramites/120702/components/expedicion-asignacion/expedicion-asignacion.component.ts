import {
  Catalogo,
  CatalogoSelectComponent,
  InputFecha,
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
// import {
//   INPUT_FECHA_FIN,
//   INPUT_FECHA_INICIO,
// } from '../../constantes/expedicion-certificados-frontera.enum';
import {
  MontoExpedirTablaDatos,
  TablaDatos,
} from '../../models/expedicion-certificados-frontera.models';
import { Subject, takeUntil } from 'rxjs';
import { DescripcionCupoComponent } from '../descripcion-cupo/descripcion-cupo.component';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { INFORMACION_DESCRPCION_CUPO } from '../../constantes/expedicion-certificados-frontera.enum';

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
 
  // FECHA_INICIO = INPUT_FECHA_INICIO;
  // FECHA_FIN = INPUT_FECHA_FIN;

  public asignacionForm!: FormGroup;

  // public descripcionCupoForm!: FormGroup;

  public informacionFormData = INFORMACION_DESCRPCION_CUPO;

  private destroy$ = new Subject<void>();

  fechaIncicioAsignacion: InputFecha = {
    labelNombre: 'Fecha inicio',
    required: true,
    habilitado: false,
  };

  fechaFinAsignacion: InputFecha = {
    labelNombre: 'Fecha fin',
    required: true,
    habilitado: false,
  };

  anoOficioDatos: Catalogo[] = [];
  // numeroOficioDatos: Catalogo[] = [];
  montoTablaDatos: string[] = [];
  montoTablaFilaDatos: TablaDatos[] = [];

  // public forma: FormGroup = new FormGroup({
  //   ninoFormGroup: new FormGroup({})
  // });

  // get ninoFormGroup(): FormGroup {
  //   return this.forma.get('ninoFormGroup') as FormGroup;
  // }

  constructor(
    private fb: FormBuilder,
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
    // this.establecerDescripcionCupoFormGroup();
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

  // establecerDescripcionCupoFormGroup(): void {
  //   this.descripcionCupoForm = this.fb.group({
  //     regimenAduanero: new FormControl({ value: '', disabled: true }),
  //     descripcionProducto: new FormControl({ value: '', disabled: true }),
  //     clasificacionSubProducto: new FormControl({ value: '', disabled: true }),
  //     unidadMedida: new FormControl({ value: '', disabled: true }),
  //     fechaInicioCupo: new FormControl({ value: '', disabled: true }),
  //     fechaFinCupo: new FormControl({ value: '', disabled: true }),
  //     mecanismoAsignacion: new FormControl({ value: '', disabled: true }),
  //     tratadoAcuerdo: new FormControl({ value: '', disabled: true }),
  //     fraccionesArancelarias: new FormControl({ value: '', disabled: true }),
  //     paises: new FormControl({ value: '', disabled: true }),
  //     observaciones: new FormControl({ value: '', disabled: true }),
  //     fundamento: new FormControl({ value: '', disabled: true }),
  //   });
  // }

  enviarMontoFormulario(): void {
    const MONTO_A_EXPEDIR_FILA = {
      tbodyData: [this.asignacionForm.value.montoAExpedir],
    };
    this.montoTablaFilaDatos.push(MONTO_A_EXPEDIR_FILA);

    const MONTO_A_EXPEDIR = this.asignacionForm.get('montoAExpedir')?.value;
    this.asignacionForm.get('totalAExpedir')?.setValue(MONTO_A_EXPEDIR)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
