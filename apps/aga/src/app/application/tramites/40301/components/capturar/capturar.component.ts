import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapturarService } from '../../services/capturar.service';
import { map, Subject, takeUntil } from 'rxjs';
import { CATALOGOS_40301_ID } from '../../enum/caat-naviero.enum';
import { LayaoutCapturaTipoAgenteComponent } from '../layaoutCapturaTipoAgente/layaoutCapturaTipoAgente.component';
import { LayoutDirectorGeneralComponent } from '../layoutDirectorGeneral/layoutDirectorGeneral.component';
import { Catalogo } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.component.html',
  styleUrls: ['./capturar.component.scss']
})
export class CapturarComponent implements OnInit, OnDestroy {
  solicitudForm!: FormGroup;
  titulo!: string;
  idTramite!: string;
  rolesUsuario: string[] = [];
  agentCatalog: Catalogo[] = [];

  @ViewChild(LayaoutCapturaTipoAgenteComponent) tipoAgentsComponent!: LayaoutCapturaTipoAgenteComponent
  @ViewChild(LayoutDirectorGeneralComponent) layoutDirectorGeneral!: LayoutDirectorGeneralComponent

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private capturarService: CapturarService,
  ) {
    this.titulo = 'datos del tramite';
    this.idTramite = '';
    this.solicitudForm = this.fb.group({
      cveFolioCaat: [''],
      rol: [''],

    });
    this.rolesUsuario = [];
  }

  ngOnInit(): void {
    // Inicializar el formulario reactivo
    this.solicitudForm = this.fb.group({
      cveFolioCaat: [{ value: '', disabled: true }],
      rol: [{ value: '', disabled: true }],
      tipoAgente: ['', Validators.required],
    });

    // Obtener el título desde el servicio
    this.capturarService.obtenerTitulo(CATALOGOS_40301_ID.OBTENER_TITULO)
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((titulo: string) => {
          this.titulo = titulo;
        })
      )
      .subscribe();

    // Obtener idTramite desde el servicio
    // this.capturarService.obtenerIdTramite().subscribe((id: string) => {
    //   this.idTramite = id;
    // });

    // // Obtener metadata de campos y aplicar validación
    // this.capturarService.obtenerCamposMetadata().subscribe((metadata: string) => {
    //   this.camposMetadata = metadata;
    //   this.aplicarValidacion();
    // });

    // Obtener roles del usuario
    this.capturarService.obtenerRolesUsuario()
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((roles: string[]) => {
          this.rolesUsuario = roles;
        })
      )
      .subscribe();


    // this.formularioAgente = this.fb.group({
    //     tipoAgente: ['', Validators.required],
    //   });



    this.capturarService
      .getCatalogo(CATALOGOS_40301_ID.AGENT_CATALOG)
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((agentCatalog: Catalogo[]) => {
          this.agentCatalog = agentCatalog;
        })
      )
      .subscribe();
  }

  /**
   * @method isFormValid
   * @description
   * Verifica si el formulario dentro del componente `CancelarSolicitudComponent` es válido.
   * @returns {boolean} `true` si el formulario es válido, `false` en caso contrario.
   */
  isFormValid(): boolean {
    return this.tipoAgentsComponent?.formularioAgente.valid && this.layoutDirectorGeneral?.solicitudForm.valid;
  }
  
  /**
   * Método para obtener el valor del campo tipoAgente.
   * @returns string
   */
  limpiarAgente(): void {
    this.solicitudForm.reset();
  }

  /**
   * Método para obtener el valor del campo tipoAgente.
   * @returns string
   */
  conTipoAgenteData(control: string): Catalogo[] {
    console.log(`this.agentCatalog`, this.agentCatalog);
    console.log(this.solicitudForm.get(control)?.value);

    return this.agentCatalog.map((item) => {
      return {
        id: item.id,
        clave: item.clave,
        descripcion: item.descripcion,
      };
    });
  }

  onSubmit(): void {
    if (this.tipoAgentsComponent?.formularioAgente.valid && this.layoutDirectorGeneral?.solicitudForm.valid) {

    }
  }

  ngOnDestroy(): void {

    // Destruir el notificador para evitar fugas de memoria
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}