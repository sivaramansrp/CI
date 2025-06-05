import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LOGIN, PADDING } from '../../constantes/constantes';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { FirmaElectronicaService } from '../../../core/services/shared/firma-electronica/firma-electronica.service';

@Component({
  selector: 'firma-electronica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './firma-electronica.component.html',
  styleUrl: './firma-electronica.component.scss',
})
export class FirmaElectronicaComponent {
  @Input({ required: true }) tipo: string = '';
  @Output() valido = new EventEmitter<boolean>();
  @Output() firma = new EventEmitter<string>();
  @Output() datosFirma = new EventEmitter<{
    firma: string;
    serialNumber: string;
    rfc: string;
  }>();

  certFileObj?: File;
  keyFileObj?: File;
  isLoading = false;

  FormCertificado = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private formValidator: ValidacionesFormularioService,
    private firmaService: FirmaElectronicaService
  ) {}

  /**
   * Getter para saber si el componente esta siendo usado para hacer 'login'
   * @returns {boolean} Regresa un true si el componente se esta usando para autenticarse e iniciar sesión, de lo contrario retorna un false.
   */
  get login(): boolean {
    return this.tipo === LOGIN ? true : false;
  }

  /**
   * Metodo para saber si el campo del formulario es valido.
   * @param field El nombre del campo del formulario que se va a validar.
   * @returns {boolean | null} : Regresa un booleano si el campo es valido o no o puede regresar null si no se ha tocado el campo.
   */
  isValid(field: string): boolean | null {
    return this.formValidator.isValid(this.FormCertificado, field);
  }

  handleFile(type: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      
      if (type === 'cer') {
        this.certFileObj = file;
      } else if (type === 'key') {
        this.keyFileObj = file;
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.FormCertificado.invalid || !this.certFileObj || !this.keyFileObj) {
      this.FormCertificado.markAllAsTouched();
      this.toastrService.error('Por favor complete todos los campos y seleccione los archivos');
      return;
    }

    this.isLoading = true;
    const password = this.FormCertificado.get('password')?.value || '';

    try {
      // Verificar que los archivos sean válidos
      if (!(this.certFileObj instanceof File) || !(this.keyFileObj instanceof File)) {
        throw new Error('Los archivos seleccionados no son válidos');
      }
      
      // 1. Validar y firmar
      const resultado = await this.firmaService.firmarCadena(
        this.certFileObj,
        this.keyFileObj,
        password
      );

      // 2. Emitir eventos
      this.valido.emit(true);
      this.datosFirma.emit({
        firma: resultado.firma,
        serialNumber: resultado.serialNumber,
        rfc: resultado.rfc
      });

      this.toastrService.success('Firma electrónica generada correctamente');
      
    } catch (error) {
      console.error('Error al firmar:', error);
      this.valido.emit(false);
      this.toastrService.error(
        error instanceof Error ? error.message : 'Error al generar la firma'
      );
    } finally {
      this.isLoading = false;
    }
  }
}
