import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import * as forge from 'node-forge';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { LOGIN, PADDING } from '../../constantes/constantes';

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

  certFile: string = '';
  keyFile: string = '';
  datosBinarios!: ArrayBuffer;
  mensajeValidacion: string = '';
  contrasenia: string = '';

  FormCertificado = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private formValidator: ValidacionesFormularioService
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
    return this.formValidator.isValidField(this.FormCertificado, field);
  }

  /**
   * Lee el archivo seleccionado y lo convierte a un ArrayBuffer.
   * @param type El tipo de archivo que se esta leyendo .cer o .key.
   * @param event El evento de cambio que se dispara cuando se selecciona un archivo.
   * @returns {void} No devuelve valor alguno.
   */
  handleFile(type: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const archivoOriginal = input.files[0];
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          if (type === 'cer') {
            const result = (await e.target.result) as ArrayBuffer;
            const der = new Uint8Array(result);
            const buff = forge.util.createBuffer(der);
            const asn1 = forge.asn1.fromDer(buff);
            const cert = forge.pki.certificateFromAsn1(asn1);
            const pem = forge.pki.certificateToPem(cert);
            this.certFile = pem;
          }
          if (type === 'key') {
            this.datosBinarios = (await e.target.result) as ArrayBuffer;
          }
        }
      };
      reader.readAsArrayBuffer(archivoOriginal);
    }
  }

  /**
   * Metodo que se ejecuta al dar click en el boton de 'Firmar'.
   * @returns {void} No regresa valor alguno.
   */
  onSubmit(): void {
    if (this.FormCertificado.invalid) {
      this.FormCertificado.markAllAsTouched();
      return;
    }

    const password = this.FormCertificado.get('password')?.value;
    this.contrasenia =
      password !== undefined && password !== null ? password : '';

    this.validateFilesBase(this.certFile, this.datosBinarios, this.contrasenia);
  }

  /**
   * Valida si el certificado y la llave privada coinciden.
   * @param certFile Datos del certificado en el formato pem (.cer).
   * @param binaryData Datos en binario de la llave privada (.key).
   * @param password contraseña de la llave privada.
   * @returns {void} No regresa valor alguno.
   */
  validateFilesBase(
    certFile: string,
    binaryData: ArrayBuffer,
    password: string
  ): void {
    try {
      const cert = forge.pki.certificateFromPem(certFile);
      const certPublicKey = cert.publicKey as forge.pki.rsa.PublicKey;

      const paddingStart = PADDING.INICIO;
      const paddingEnd = PADDING.FIN;
      const der = new Uint8Array(binaryData);
      const binaryString = String.fromCharCode(...der);
      const content = paddingStart + btoa(binaryString) + paddingEnd; // añadir paddings al string del certificado, para poder desencriptarlo.
      const privateKey = forge.pki.decryptRsaPrivateKey(content, password);

      if (privateKey && certPublicKey) {
        if (
          certPublicKey.n.t === privateKey.n.t &&
          certPublicKey.e.t === privateKey.e.t
        ) {
          this.valido.emit(true);
          this.toastrService.success(
            '¡Certificado válido y llave privada coinciden!'
          );

          if (!this.login) {
            const firma = this.firmar('hola', privateKey);
            console.log(firma);
          }
        } else {
          this.valido.emit(false);

          this.toastrService.error(
            'La llave privada no coincide con el certificado o la contraseña es incorrecta.'
          );
        }
      } else {
        this.valido.emit(false);

        this.toastrService.error(
          'La llave privada no coincide con el certificado o la contraseña es incorrecta.'
        );
      }
    } catch (error) {
      console.log(error);
      this.toastrService.error('Error en la validación');
    }
  }

  /**
   * Encripta una cadena de texto, usando la libreria forge.
   * @param cadena cadena a encriptar.
   * @param privateKey Llave privada en formato RSA.
   * @returns {string} Regresa la cadena encriptada.
   */
  firmar(cadena: string, privateKey: forge.pki.rsa.PrivateKey): string {
    const md = forge.md.sha256.create();
    md.update(cadena, 'utf8');
    return forge.util.encode64(privateKey.sign(md));
  }
}
