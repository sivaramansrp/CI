import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CapturarService } from '../../services/capturar.service';
import { map, Subject, takeUntil } from 'rxjs';
import { CATALOGOS_40301_ID } from '../../enum/caat-naviero.enum';
import { CaatSolicitud, RegistroCaatNavieroService, SolicitudCaatNaviero } from '../../services/RegistroCaatNavieroController.service';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.component.html',
  styleUrls: ['./capturar.component.scss']
})
export class CapturarComponent implements OnInit {
  solicitudForm!: FormGroup;
  titulo!: string;
  idTramite!: string;
  camposMetadata: any;
  rolesUsuario: string[] = [];

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
        // this.solicitudForm.patchValue({
        //   'solicitud.cveFolioCaat': solicitud.cveFolioCaat
        // });
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

  aplicarValidacion(): void {
    // Migrar la validación de jQuery a TypeScript
    // $(function() { $.fn.stripesValidation('formId', camposMetadata); });
    // Implementación en TypeScript
    // this.capturarService.stripesValidation(this.camposMetadata.formId, this.camposMetadata);
  }

  onSubmit(): void {
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
}