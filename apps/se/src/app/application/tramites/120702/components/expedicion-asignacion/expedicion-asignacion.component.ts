import {
  Catalogo,
  CatalogoSelectComponent,
  InputFechaComponent,
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
import { INFORMACION_DE_LA_OBRA_ARTE,INPUT_FECHA_FIN,INPUT_FECHA_INICIO } from '../../constantes/expedicion-certificados-frontera.enum';
import { Subject, takeUntil } from 'rxjs';
import { DescripcionCupoComponent } from '../descripcion-cupo/descripcion-cupo.component';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

@Component({
  selector: 'app-expedicion-asignacion',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    DescripcionCupoComponent,
    InputFechaComponent,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './expedicion-asignacion.component.html',
  styleUrl: './expedicion-asignacion.component.scss',
})
export class ExpedicionAsignacionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  FECHA_INICIO = INPUT_FECHA_INICIO;
  FECHA_FIN = INPUT_FECHA_FIN;
  anoOficioDatos: Catalogo[] = [];
  numeroOficioDatos: Catalogo[] = [];
public informacionFormData = INFORMACION_DE_LA_OBRA_ARTE;
  public asignacionForm!: FormGroup;

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

      this.establecerAsignacionFormGroup();
  }

establecerAsignacionFormGroup():void{
this.asignacionForm = this.fb.group({
  anoDelOficio: new FormControl('', [Validators.required]),
  numeroOficio: new FormControl('', [Validators.required]),
  estado: new FormControl({value: 'CHIHUAHUA',disabled:true}),
  representacionFederal: new FormControl({value: 'CIUDAD JUAREZ',disabled:true}),
  monteAsignado: new FormControl({value: '500',disabled:true}),
  monteExpedido: new FormControl({value: '130',disabled:true}),
  monteDisponible: new FormControl({value: '370',disabled:true}),
  datosNumeroOficio: new FormControl({value: '2',disabled:true}),
})
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
