import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CapturarService } from '../../services/capturar.service';
import { map, Subject, takeUntil } from 'rxjs';
import { CATALOGOS_40301_ID } from '../../enum/caat-naviero.enum';
import { CaatSolicitud, RegistroCaatNavieroService, SolicitudCaatNaviero } from '../../services/RegistroCaatNavieroController.service';
import { LayaoutCapturaTipoAgenteComponent } from '../layaoutCapturaTipoAgente/layaoutCapturaTipoAgente.component';
import { LayoutDirectorGeneralComponent } from '../layoutDirectorGeneral/layoutDirectorGeneral.component';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.component.html',
  styleUrls: ['./capturar.component.scss']
})
export class CapturarComponent implements OnInit, OnDestroy {
  solicitudForm!: FormGroup;
  titulo!: string;
  idTramite!: string;
  camposMetadata: any;
  rolesUsuario: string[] = [];
  @ViewChild(LayaoutCapturaTipoAgenteComponent) tipoAgentsComponent!: LayaoutCapturaTipoAgenteComponent
  @ViewChild(LayoutDirectorGeneralComponent) layoutDirectorGeneral!: LayoutDirectorGeneralComponent

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();
  
  constructor(
    private fb: FormBuilder,
    private capturarService: CapturarService,
    private registroCaatNavieroService: RegistroCaatNavieroService
  ) {
    this.titulo = 'datos del tramite';
    this.idTramite = '';
    this.camposMetadata = {};
    this.solicitudForm = this.fb.group({
      'cveFolioCaat': [''],
      'rol': ['']
    });
    this.rolesUsuario = [];
   }

  ngOnInit(): void {
    // Inicializar el formulario reactivo
    this.solicitudForm = this.fb.group({
      'cveFolioCaat': [''],
      'rol': ['']
    });


    this.registroCaatNavieroService.getUserRole()
    .pipe(
      takeUntil(this.destruirNotificador$),
      map((userRole: string[]) => {
        this.solicitudForm.patchValue({
          'rol': userRole
        });
      })
    )
    .subscribe();

    this.registroCaatNavieroService.getSolicitud()
    .pipe(
      takeUntil(this.destruirNotificador$),
      map((solicitud: SolicitudCaatNaviero) => {
        this.solicitudForm.patchValue({
          'cveFolioCaat': solicitud.caatSolicitudes[0]?.cveFolioCaat
        });
      })
    )
    .subscribe();
    

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
        console.log('Roles de usuario:', roles);
        this.rolesUsuario = roles;
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
      // console.log(this.tipoAgentsComponent?.formularioAgente.valid, this.layoutDirectorGeneral?.solicitud.valid);
      return this.tipoAgentsComponent?.formularioAgente.valid && this.layoutDirectorGeneral?.solicitud.valid;
    }

  onSubmit(): void {
    if(this.tipoAgentsComponent?.formularioAgente.valid && this.layoutDirectorGeneral?.solicitud.valid){
      const solicitud: CaatSolicitud = {
        cveFolioCaat: this.solicitudForm.get('cveFolioCaat')?.value,
        rol: this.solicitudForm.get('rol')?.value,
        caatSolicitudes: [
          {
            cveFolioCaat: this.solicitudForm.get('cveFolioCaat')?.value,
            rol: this.solicitudForm.get('rol')?.value,
            // Otros campos de la solicitud
          }
        ]
      };
    }
      
    if (this.solicitudForm.valid) {
    //   this.capturarService.enviarFormulario(this.solicitudForm.value).subscribe( (response: unknown) => {
    //     // Manejar la respuesta del backend
    //     // console.log('Formulario enviado con éxito', response);
    //     if(response!== null){
    //       // alert('Formulario enviado con éxito');
    //     }
    //   });
    }
  }
  
  ngOnDestroy(): void {

    // Destruir el notificador para evitar fugas de memoria
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}