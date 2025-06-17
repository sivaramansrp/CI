import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirmaElectronicaService } from '../../../core/services/shared/firma-electronica/firma-electronica.service';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { LOGIN } from '../../constantes/constantes';

@Component({
  selector: 'firma-electronica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './firma-electronica.component.html',
  styleUrl: './firma-electronica.component.scss',
})
export class FirmaElectronicaComponent {
  @Input({ required: true }) tipo: string = '';
  @Input() cadenaOriginal?: string;
  @Output() valido = new EventEmitter<boolean>();
  @Output() firma = new EventEmitter<string>();
  @Output() datosFirma = new EventEmitter<{
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  }>();

  certFileObj?: File;
  keyFileObj?: File;
  isLoading = false;
  cerInputElement?: HTMLInputElement;
  keyInputElement?: HTMLInputElement;
  passwordInputElement?: HTMLInputElement;


  FormCertificado = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private formValidator: ValidacionesFormularioService,
    private firmaService: FirmaElectronicaService
  ) { }

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

  /**
   * Metodo para saber si el campo del formulario es invalido.
   * @param field El nombre del campo del formulario que se va a validar.
   * @returns {boolean | null} : Regresa un booleano si el campo es invalido o no o puede regresar null si no se ha tocado el campo.
   */
  handleFile(type: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];

      // Validar extensión y tipo MIME
      if (type === 'cer') {
        if (!file.name.endsWith('.cer') && !file.type.includes('application/x-x509-ca-cert')) {
          this.toastrService.error('El archivo debe ser un certificado (.cer)');
          return;
        }
        this.certFileObj = file;
        this.cerInputElement = input;
      } else if (type === 'key') {
        if (!file.name.endsWith('.key') && !file.type.includes('application/x-pem-file')) {
          this.toastrService.error('El archivo debe ser una llave privada (.key)');
          return;
        }
        this.keyFileObj = file;
        this.keyInputElement = input;
      }
    }
  }

  /**
   * Método para manejar el evento de cambio en el campo de contraseña.
   * @param event El evento del input de contraseña.
   */
  async onSubmit(): Promise<void> {
    this.passwordInputElement = document.getElementById('password') as HTMLInputElement;

    if (this.FormCertificado.invalid) {
      this.FormCertificado.markAllAsTouched();
      this.toastrService.error('Por favor complete todos los campos');
      return;
    }

    if (!this.cerInputElement || !this.keyInputElement || !this.passwordInputElement) {
      this.toastrService.error('Por favor complete todos los campos');
      return;
    }

    this.isLoading = true;

    try {
      const esLogin = this.tipo === 'login';
      const resultado = await this.firmaService.firmarCadena(
        this.cerInputElement,
        this.keyInputElement,
        this.passwordInputElement,
        esLogin ? undefined : this.cadenaOriginal,
        esLogin
      );

      if (esLogin) {
        // Caso login: solo validación
        this.valido.emit(true);
      } else {
        // Caso firma: emitir datos completos
        if (!resultado.firma) {
          throw new Error('No se generó la firma electrónica');
        }

        this.valido.emit(true);
        this.datosFirma.emit({
          firma: resultado.firma,
          certSerialNumber: resultado.certificado,
          rfc: resultado.rfc,
          fechaFin: resultado.fechaFin,
        });
        this.toastrService.success('Firma electrónica generada correctamente');
      }

    } catch (error) {
      console.error('Error al firmar:', error);
      this.valido.emit(false);
      this.toastrService.error(
        error instanceof Error ? error.message : 'Error al validar la firma'
      );
    } finally {
      this.isLoading = false;
    }
  }
}

