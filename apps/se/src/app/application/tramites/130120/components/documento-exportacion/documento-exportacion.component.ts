import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { FECHA_DOCUMENTO } from '../../constants/permiso-importacion-modification.enum';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';


@Component({
  selector: 'app-documento-exportacion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, TituloComponent, InputFechaComponent],
  templateUrl: './documento-exportacion.component.html',
  styleUrl: './documento-exportacion.component.css',
})
export class DocumentoExportacionComponent implements OnInit, OnDestroy {

  datosExporta!: FormGroup;

  esFormularioSoloLectura: boolean = false;

  fechaDocumentoDatos: InputFecha = FECHA_DOCUMENTO

  public destroyNotifier$: Subject<void> = new Subject();

  private datosState!: DatosGrupos

  constructor(public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaQuery: ConsultaioQuery
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.query.selectDatos$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((state) => {
        this.datosState = state as DatosGrupos;
      })
    )
    .subscribe();
    await this.initActionFormBuild();

    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
  }

  initActionFormBuild(): void {
    this.datosExporta = this.fb.group({
      numero_documento: [this.datosState.datosExporta.número_documento, Validators.required],
      fecha_documento: [this.datosState.datosExporta.fecha_documento, Validators.required],
      descripcionExportacion: [this.datosState.datosExporta.descripcionExportacion, [Validators.required, Validators.maxLength(4000)]],
      codigo_arancelario: [this.datosState.datosExporta.codigo_arancelario, Validators.required],
      cantidad_umt: [this.datosState.datosExporta.cantidad_umt, Validators.required],
      valor_usd: [this.datosState.datosExporta.valor_usd, Validators.required],
      precio_unitario_usd: [this.datosState.datosExporta.precio_unitario_usd, Validators.required],
    });
  }

  fechaDocumento(evento: string): void {
    this.datosExporta.patchValue({
        fecha_documento: evento 
      });
    this.store.setFecha_documento(evento);
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof PermisoImportacionStore,
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
