import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Tramite420101State, Tramite420101Store } from '../../estados/tramite420101Store.store';
import { CrossListLable } from '../../models/proveedores.model';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';
import { RegistrarProveedoresService } from '../../service/registrar-proveedores.service';
import { Tramite420101Query } from '../../estados/tramite420101Query.query';

@Component({
  selector: 'app-registro-de-proveedores-manual',
  standalone: true,
  imports: [
    CrosslistComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registro-de-proveedores-manual.component.html',
  styleUrl: './registro-de-proveedores-manual.component.scss'
})
export class RegistroDeProveedoresManualComponent implements OnInit, OnDestroy {

  public proveedoreForm!: FormGroup;

  public usoNormaDatos: string[] = [];
  public usoProgramaImmexDatos: string[] = [];
  public usoProgramaProsecDatos: string[] = [];
  public usoAduanaDatos: string[] = [];

  public destroyNotifier$: Subject<void> = new Subject();

  public usoNormaSeleccionadaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Norma:',
    derecha: 'Norma(s) seleccionada(s)*:',
  };

  public usoProgramaImmexLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Número de programa IMMEX:',
    derecha: 'IMMEX seleccionado:',
  };

  public usoProgramaProsecLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Número de programa PROSEC:',
    derecha: 'PROSEC seleccionado:',
  };

  public usoAduanaSeleccionadaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduana en las que opera:',
    derecha: 'Aduana(s) seleccionada(s)*:',
  };

  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private tramite420101Query: Tramite420101Query,
    private tramite420101Store: Tramite420101Store,
    private registrarProveedoresService: RegistrarProveedoresService
  ) { }

  public solicitudState!: Tramite420101State;

  ngOnInit(): void {
    this.tramite420101Query
      .select((state: Tramite420101State) => state.usoNormaDatos)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((usoNormaDatos: string[]) => {
        this.usoNormaDatos = usoNormaDatos;
      });

    this.tramite420101Query
      .select((state: Tramite420101State) => state.usoProgramaImmexDatos)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((usoProgramaImmexDatos: string[]) => {
        this.usoProgramaImmexDatos = usoProgramaImmexDatos;
      });
    this.crearProveedoreFormForm();
  }

  crearProveedoreFormForm(): void {
    this.proveedoreForm = this.fb.group({
      registroFederalContribuyente: ['', Validators.required],
      razonSocial: [{ value: '', disabled: false }],
      domicilioFiscal: [{ value: '', disabled: false }],
    });
  }

  agregarProveedore(): void {
    const VALOR = {
      id: 0,
      rfc: this.proveedoreForm.get('registroFederalContribuyente')?.value,
      razonSocial: this.proveedoreForm.get('razonSocial')?.value,
      nombreCompleto: '',
      domicilioFiscal: this.proveedoreForm.get('domicilioFiscal')?.value,
      norma: this.usoNormaDatos[0],
      numeroProgramaIMMEX: '',
      numeroProgramaPROSEC: '',
      aduanasOpera: '',
    }
    this.tramite420101Store.updateProveedoresTabla([VALOR]);
  }

  cancelar(): void {
    this.ubicaccion.back();
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
