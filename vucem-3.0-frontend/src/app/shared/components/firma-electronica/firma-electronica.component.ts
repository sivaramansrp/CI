import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import * as forge from 'node-forge';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'firma-electronica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './firma-electronica.component.html',
  styleUrl: './firma-electronica.component.scss',
})
export class FirmaElectronicaComponent {
  @Input() tipo: string = '';
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

  get login() {
    return this.tipo === 'login' ? true : false;
  }

  /**
   *Verifica si un campo es válido o no
   * @param field - Nombre del campo a validar
   * @returns boolean | null
   */
  isValid(field: string): boolean | null {
    return this.formValidator.isValid(this.FormCertificado, field);
  }



  handleFile(type: string, event: Event) {
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

  onSubmit() {
    if (this.FormCertificado.invalid) {
      this.FormCertificado.markAllAsTouched();
      return;
    }

    const password = this.FormCertificado.get('password')?.value;
    this.contrasenia =
      password !== undefined && password !== null ? password : '';

    this.validateFilesBase(
      this.certFile,
      this.datosBinarios,
      this.contrasenia
    );
  }

  validateFilesBase(
    certFile: string,
    binaryData: ArrayBuffer,
    password: string
  ): void {
    try {
      const cert = forge.pki.certificateFromPem(certFile);
      const certPublicKey = cert.publicKey as forge.pki.rsa.PublicKey;

      const paddingStart = '-----BEGIN ENCRYPTED PRIVATE KEY-----\n';
      const paddingEnd = '\n-----END ENCRYPTED PRIVATE KEY-----';
      const der = new Uint8Array(binaryData);
      const binaryString = String.fromCharCode(...der);
      const content = paddingStart + btoa(binaryString) + paddingEnd; // añadir paddings
      const privateKey = forge.pki.decryptRsaPrivateKey(content, password);

      if (privateKey && certPublicKey) {
        if (
          certPublicKey.n.t === privateKey.n.t &&
          certPublicKey.e.t === privateKey.e.t
        ) {
          this.valido.emit(true);
          const firma = this.firmar('hola', privateKey);
          this.toastrService.success(
            '¡Certificado válido y llave privada coinciden!'
          );
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
   *
   * @param cadena
   * @param privateKey
   * @returns string, cadena encriptada
   */
  firmar(cadena: string, privateKey: forge.pki.rsa.PrivateKey): string {
    const md = forge.md.sha256.create();
    md.update(cadena, 'utf8');
    return forge.util.encode64(privateKey.sign(md));
  }
}
