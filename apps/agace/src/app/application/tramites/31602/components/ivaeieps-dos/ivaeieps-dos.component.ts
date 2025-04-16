import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { DE_LAS_SIGUIENTES, PAGO_DE_DERECHOS, PERMISO_A_DESISTIR_DOS, PERMISO_A_DESISTIR_TRES } from '../../constantes/ivaeieps.enum';
import { ComercioExteriorService } from '../../services/comercio-exterior.service';
import { Subject, takeUntil } from 'rxjs';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-ivaeieps-dos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './ivaeieps-dos.component.html',
  styleUrl: './ivaeieps-dos.component.scss',
})
export class IvaeiepsDosComponent implements OnInit,OnDestroy {

  public delGrupo: FormGroup = new FormGroup({
    checkboxFormGroup: new FormGroup({})
  });
  public contadoGrupo: FormGroup = new FormGroup({
    checkboxDosFormGroup: new FormGroup({})
  });
  public deLasSiguientesFormGroup: FormGroup = new FormGroup({
    deLasSiguientesGrp: new FormGroup({})
  });
  public pagoDeDerechosFormGroup: FormGroup = new FormGroup({
    pagoDeDerechos: new FormGroup({})
  });
  public porcentajeMontoForm!: FormGroup;

  public permisoDesistirFormDatos = PERMISO_A_DESISTIR_DOS;
  public predeterminadoSeleccionarDatos = PERMISO_A_DESISTIR_TRES;
  public deLasSiguientesDatos = DE_LAS_SIGUIENTES;
  public pagoDeDerechosDatos = PAGO_DE_DERECHOS;
  private destroyNotifier$: Subject<void> = new Subject();


  constructor(
      private fb: FormBuilder,
      private comercioExteriorSvc: ComercioExteriorService,
    ) {
    //
  }

  ngOnInit(): void {
    this.crearPorcentajeMontoForm();
    this.getBancoCatalogDatos();
  }

  public crearPorcentajeMontoForm(): void {
    this.porcentajeMontoForm = this.fb.group({
      porcentaje: [''],
      monto: ['']
    });
  }

  get checkboxFormGroup(): FormGroup {
    return this.delGrupo.get('checkboxFormGroup') as FormGroup;
  }

  get checkboxDosFormGroup(): FormGroup {
    return this.contadoGrupo.get('checkboxDosFormGroup') as FormGroup;
  }

  get deLasSiguientesGrp(): FormGroup {
    return this.deLasSiguientesFormGroup.get('deLasSiguientesGrp') as FormGroup;
  }

  get pagoDeDerechos(): FormGroup {
    return this.pagoDeDerechosFormGroup.get('pagoDeDerechos') as FormGroup;
  }

  public getBancoCatalogDatos(): void {
    this.comercioExteriorSvc.getBancoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      const DATOS = API_DATOS.data;
      const CLASIFICACION_FIELD = this.pagoDeDerechosDatos.find((datos: ModeloDeFormaDinamica) => datos.id === 'banco') as ModeloDeFormaDinamica;
      if (CLASIFICACION_FIELD) {
        if (!CLASIFICACION_FIELD.opciones) {
          CLASIFICACION_FIELD.opciones = DATOS.map((item: { id: number; descripcion: string }) => ({
            descripcion: item.descripcion,
            id: item.id,
          }));
        }
      }
    });
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }



}
