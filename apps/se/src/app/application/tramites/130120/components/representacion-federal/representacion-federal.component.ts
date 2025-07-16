import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, SeccionLibState, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosGrupos } from '../../models/permiso-importacion-modification.model';
import { PermisoImportacionService } from '../../services/permiso-importacion.service';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';


@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.css',
})
export class RepresentacionFederalComponent implements OnInit {

  datosFederal!: FormGroup;

  entidadOpcion: Catalogo[] = []

  representacionOpcion: Catalogo[] = []

  private seccionState!: SeccionLibState;

  esFormularioSoloLectura: boolean = false;
  
  public destroyNotifier$: Subject<void> = new Subject();

  private datosState!: DatosGrupos

  constructor(
    public fb: FormBuilder,
    public store: PermisoImportacionStore,
    public query: Tramite130120Query,
    public consultaQuery: ConsultaioQuery,
    public permisoImportacionService: PermisoImportacionService
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
    this.obtenerEntidadSelectList();
    this.obtenerRepresentacionSelectList();
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
    this.datosFederal = this.fb.group({
      entidad_federativa: [this.datosState.datosFederal.entidad_federativa, Validators.required],
      representacion_federal: [this.datosState.datosFederal.representacion_federal, Validators.required]
    });
    
  }

  obtenerEntidadSelectList(): void {
    this.permisoImportacionService.obtenerMenuDesplegable(
        'entidad_federativa.json'
      )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
      next: (data) => {
        this.entidadOpcion = data as Catalogo[];
      },
      });
    }

  obtenerRepresentacionSelectList(): void {
      this.permisoImportacionService.obtenerMenuDesplegable(
        'representacion_federal.json'
      )
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe({
          next: (data) => {
            this.representacionOpcion = data as Catalogo[];
          },
        });
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
  

}
