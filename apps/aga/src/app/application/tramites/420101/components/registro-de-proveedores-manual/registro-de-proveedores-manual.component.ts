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

  public usoCrossListDatos: string[] = [];

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
      .select((state: Tramite420101State) => state.usoCrossListDatos)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: string[]) => {
        this.usoCrossListDatos = datos;
      });
    this.iniciarProveedore();
    this.getProveedoresManual();
  }

  getProveedoresManual(): void {
    this.registrarProveedoresService.proveedoresManual()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.proveedoreForm.patchValue(data);
      });
  }

  iniciarProveedore(): void {
    this.proveedoreForm = this.fb.group({
      registroFederalContribuyente: [{ value: 'ABC123456XYZ', disabled: false }, Validators.required],
      razonSocial: [{ value: 'Empresa Demo S.A. de C.V.', disabled: true }],
      domicilioFiscal: [{ value: 'Av. Reforma 123, CDMX', disabled: true }],
    });
  }

  agregarProveedore(): void {
    const VALOR = {
      rfc: this.proveedoreForm.get('registroFederalContribuyente')?.value,
      razonSocial: this.proveedoreForm.get('razonSocial')?.value,
      domicilioFiscal: this.proveedoreForm.get('domicilioFiscal')?.value,
    }
    this.tramite420101Store.updateProveedoresTabla([VALOR]);
    this.ubicaccion.back();
  }

  cancelar(): void {
    this.ubicaccion.back();
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
