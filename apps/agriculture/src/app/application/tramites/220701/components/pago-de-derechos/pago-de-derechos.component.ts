import { AcuicolaService } from '../../servicios/acuicola.service';
import { CatalogoSelectComponent} from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { EXPEDICION_FACTURA_FECHA } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { FECHA_DE_PAGO } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechos } from '../../modelos/acuicola.model';
import { PagoDeDerechosRevision } from '../../modelos/acuicola.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'pago-de-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

  pagosDeDerechosForm!: FormGroup;

  banco!: CatalogosSelect;

  fechaInicioInput: InputFecha = EXPEDICION_FACTURA_FECHA;

  private destroyNotifier$: Subject<void> = new Subject();


  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    // eslint-disable-next-line no-empty-function
  ) { }


  ngOnInit(): void {
    this.iniciarFormulario();
    this.getBancoDatos();
    this.pagoDeCargarDatos();
    this.pagoDerechosRevision();
  }


  iniciarFormulario(): void {
    this.pagosDeDerechosForm = this.fb.group({
      claveDeReferencia: [{ value: '', disabled: true }, Validators.required],
      cadenaDependencia: [{ value: '', disabled: true }, Validators.required],
      banco: ['', Validators.required],
      llaveDePago: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      importeDePago: [{ value: '', disabled: true }, Validators.required],
      claveDeReferenciaRevision: [{ value: '', disabled: true }, Validators.required],
      cadenaDependenciaRevision: [{ value: '', disabled: true }, Validators.required],
      bancoRevision: [{ value: '', disabled: true }, Validators.required],
      llaveDePagoRevision: [{ value: '', disabled: true }, Validators.required],
      fechaInicioRevision: [{ value: '', disabled: true }, Validators.required],
      importeDePagoRevision: [{ value: '', disabled: true }, Validators.required],
    });
  }

  pagoDeCargarDatos(): void {
    this.acuicolaService
      .pagoDeCargarDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: PagoDeDerechos) => {
        this.pagosDeDerechosForm.patchValue(data);
      })
  }

  getBancoDatos(): void {
    this.acuicolaService.getBancoDatos().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.banco = {
          labelNombre: 'Banco*',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  pagoDerechosRevision(): void {
    this.acuicolaService
      .getPagoDerechosRevision()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: PagoDeDerechosRevision) => {
        this.pagosDeDerechosForm.patchValue(data);
      })
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }

}
