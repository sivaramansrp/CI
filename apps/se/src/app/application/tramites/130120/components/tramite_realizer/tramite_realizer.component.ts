import { Catalogo, CatalogoSelectComponent, CatalogosService, ConsultaioQuery, SeccionLibState, SeccionLibStore, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosRealizer } from '../../models/permiso-importacion-modification.model';
import { PermisoImportacionService } from '../../services/permiso-importacion.service';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';




@Component({
  selector: 'app-tramite-realizer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent],
  templateUrl: './tramite_realizer.component.html',
  styleUrl: './tramite_realizer.component.css',
})
export class TramiteRealizerComponent implements OnInit, OnDestroy {

  datosRealizer!: FormGroup;

  regimenOpciones: Catalogo[] = [];

  classificationRegimenOpciones: Catalogo[] = [];

  esFormularioSoloLectura: boolean = false;

  public destroyNotifier$: Subject<void> = new Subject();

  private seccionState!: SeccionLibState;

  private realizarState!: DatosRealizer

  constructor( public readonly fb: FormBuilder, 
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public seccionStore: SeccionLibStore,
    public catalogosServicios: CatalogosService,
    public permisoImportacionService: PermisoImportacionService,
    public consultaQuery: ConsultaioQuery) {
    this.initActionFormBuild();
  }

  ngOnInit(): void {
    this.obtenerRegimenSelectList();

    this.query.selectDatosEmpresa$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((state) => {
        this.realizarState = state as DatosRealizer;
      })
    )
    .subscribe();

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
    this.datosRealizer = this.fb.group({
      regimen: ['',Validators.required],
      classificion_regimen: ['', Validators.required],
    })
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

  obtenerRegimenSelectList(): void {
      this.permisoImportacionService.obtenerMenuDesplegable(
        'regimen.json'
      )
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe({
          next: (data) => {
            this.regimenOpciones = data as Catalogo[];
          },
        });
  }

  obtenerClassificionRegimenSelectList(): void {
      this.permisoImportacionService.obtenerMenuDesplegable(
        'classificion_regimen.json'
      )
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe({
          next: (data) => {
            this.classificationRegimenOpciones = data as Catalogo[];
          },
        });
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
