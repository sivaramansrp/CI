import { Catalogo, CatalogoSelectComponent, CatalogosSelect, InputFecha, InputFechaComponent, TituloComponent, ValidacionesFormularioService } from "@ng-mf/data-access-user";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud260704State, Tramite260704Store } from '../../estados/Tramite260704.store';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../service/consulta.service';
import { FECHA_PAGO } from '../../models/consulta.model';
import { Tramite260704Query } from '../../estados/Tramite260704.query';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, TituloComponent, InputFechaComponent, ReactiveFormsModule],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  
  public solicitudState!: Solicitud260704State;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  fechaPagoInput: InputFecha = FECHA_PAGO;
  pagoDeDerechosForm !: FormGroup;
  
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
  constructor(private consulta: ConsultaService,
    public store: Tramite260704Store,
    private query: Tramite260704Query,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,) {
      // Constructor vacío, no requiere inicialización adicional.
  }
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.obtenerDatosBanco();
  }

  obtenerDatosBanco(): void {
    this.consulta
      .obtenerDatosBanco()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.bancoCatalogo.catalogos = resp as Catalogo[];
      });
  }
  cambioFechaPago(nuevo_fechaPago: string): void {
    this.pagoDeDerechosForm.patchValue({
      fechaPago: nuevo_fechaPago,
    });
    this.setValoresStore(this.pagoDeDerechosForm, 'fechaPago', 'setFechaPago');
  }
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260704Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  donanteDomicilio(): void {
    this.pagoDeDerechosForm = this.fb.group({
      claveDeReferencia: [this.solicitudState?.claveDeReferencia, [Validators.required]],
      cadenaDependecia: [this.solicitudState?.cadenaDependecia, [Validators.required]],
      fechaPago: [this.solicitudState?.fechaPago, [Validators.required]],
      banco: [this.solicitudState?.banco, [Validators.required]],
      liaveDePago: [this.solicitudState?.claveDeReferencia, [Validators.required]],
      importeDePago: [this.solicitudState?.importeDePago, [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
