import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CapturarService } from '../../services/capturar.service';

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

  constructor(
    private fb: FormBuilder,
    private capturarService: CapturarService
  ) {
    this.titulo = 'datos del tramite';
    this.idTramite = '';
    this.camposMetadata = {};
    this.solicitudForm = this.fb.group({
      'solicitud.cveFolioCaat': [''],
      'rol': ['']
    });
    this.rolesUsuario = [];
   }

  ngOnInit(): void {
    // Inicializar el formulario reactivo
    this.solicitudForm = this.fb.group({
      'solicitud.cveFolioCaat': [''],
      'rol': ['']
    });

    // Obtener el título desde el servicio
    this.capturarService.obtenerTitulo().subscribe((titulo: string) => {
      this.titulo = titulo;
    });

    // Obtener idTramite desde el servicio
    this.capturarService.obtenerIdTramite().subscribe((id: string) => {
      this.idTramite = id;
    });

    // Obtener metadata de campos y aplicar validación
    this.capturarService.obtenerCamposMetadata().subscribe((metadata: string) => {
      this.camposMetadata = metadata;
      this.aplicarValidacion();
    });

    // Obtener roles del usuario
    this.capturarService.obtenerRolesUsuario().subscribe((roles: string[]) => {
      this.rolesUsuario = roles;
    });
  }

  aplicarValidacion(): void {
    // Migrar la validación de jQuery a TypeScript
    // $(function() { $.fn.stripesValidation('formId', camposMetadata); });
    // Implementación en TypeScript
    this.capturarService.stripesValidation(this.camposMetadata.formId, this.camposMetadata);
  }

  onSubmit(): void {
    if (this.solicitudForm.valid) {
      this.capturarService.enviarFormulario(this.solicitudForm.value).subscribe( (response: unknown) => {
        // Manejar la respuesta del backend
        // console.log('Formulario enviado con éxito', response);
        if(response!== null){
          // alert('Formulario enviado con éxito');
        }
      });
    }
  }
}