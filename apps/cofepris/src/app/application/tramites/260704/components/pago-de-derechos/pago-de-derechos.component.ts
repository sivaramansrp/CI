import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component";
import { CatalogoSelectComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component";
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { Catalogo, CatalogosSelect, InputFecha, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { FECHA_PAGO } from '../../models/consulta.model';
import { ConsultaService } from '../../service/consulta.service';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { Tramite260704Store } from '../../estados/Tramite260704.store';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, TituloComponent, InputFechaComponent,ReactiveFormsModule],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  fechaPagoInput: InputFecha = FECHA_PAGO;
  pagoDeDerechosForm !:FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public destroyNotifier$: Subject<void> = new Subject();
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
    
  }
  ngOnInit(): void {
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
          
        });
      }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
