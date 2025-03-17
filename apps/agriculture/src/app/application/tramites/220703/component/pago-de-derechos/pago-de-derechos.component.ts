import { CatalogoSelectComponent, CatalogosSelect, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagoDeDerechos, PagoDeDerechosRevision } from '../../modelos/acuicola.model';
import { Subject, takeUntil } from 'rxjs';
import { AcuicolaService } from '../../service/acuicola.service';
import { FECHA_DE_PAGO } from '../../constantes/acuicola.enum';


@Component({
  selector: 'app-pago-de-derechos',
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

  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

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
