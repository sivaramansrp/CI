import { Component, OnInit } from '@angular/core';
import { CapturaSolicitudeService } from 'libs/shared/data-access-user/src/core/services/220402/captura-solicitude.service';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

import { CatalogosSelect } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  styleUrl: './pago-de-derecho.component.scss',
})
export class PagoDeDerechoComponent implements OnInit {
  FormSolicitud!: FormGroup;

  answer: string = '';

  public mercancia!: CatalogosSelect;

  bancode!: Catalogo;

  banco!: CatalogosSelect;

  constructor(
    private fb: FormBuilder,
    private captuaservice: CapturaSolicitudeService
  ) {
    this.fetchBancoData();
  }

  actualizarBanco(e: Catalogo): void {
    this.bancode = e;
  }

  fetchBancoData(): void {
    this.captuaservice.getBanco().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.banco = {
          labelNombre: 'Banco*',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }
  /**
   * Hook del ciclo de vida de Angular que se llama después de que la vista del componente se ha inicializado completamente.
   *
   * Este método realiza las siguientes acciones:
   * - Llama al método `getMercancia` para inicializar el objeto `mercancia`.
   * - Inicializa el grupo de formularios `FormSolicitud` con controles de formulario anidados y validadores.
   */

  ngOnInit(): void {
    this.getMercancia();
    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        exentoDePago: ['No', Validators.required],
        nombreImportExport: ['', Validators.required],
        justificacion: ['', Validators.required],
        claveDeReferencia: ['', Validators.required],
        cadenaDependencia: ['', Validators.required],
        llaveDePago: ['', Validators.required],
        fechaPago: [' ', Validators.required],
        importePago: ['', Validators.required],
      }),
    });
    // Activa la lógica cuando el formulario se ha inicializado

    this.actualizarCamposDeFormularioBasadosEnExentoDePago('No');

    // Escuchar los cambios en el campo 'exentoDePago'
    this.FormSolicitud.get(
      'datosImportadorExportador.exentoDePago'
    )?.valueChanges.subscribe((value) => {
      this.actualizarCamposDeFormularioBasadosEnExentoDePago(value);
    });
  }

  /**
   * Actualiza los campos del formulario en función del valor de 'exentoDePago'.
   *
   * Si el valor es 'No', establece valores específicos en los campos del formulario y los desactiva.
   * De lo contrario, restablece y desactiva los campos del formulario.
   *
   * @param value - El valor de 'exentoDePago' para determinar las actualizaciones de los campos del formulario.
   */

  actualizarCamposDeFormularioBasadosEnExentoDePago(value: string): void {
    if (value === 'No') {
      this.FormSolicitud.get(
        'datosImportadorExportador.claveDeReferencia'
      )?.setValue('454000554');
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.setValue(
        '594.0'
      );

      this.FormSolicitud.get(
        'datosImportadorExportador.justificacion'
      )?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.claveDeReferencia'
      )?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.importePago'
      )?.disable();
    } else {
      this.FormSolicitud.get(
        'datosImportadorExportador.justificacion'
      )?.reset();
      this.FormSolicitud.get(
        'datosImportadorExportador.cadenaDependencia'
      )?.reset();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.reset();

      this.FormSolicitud.get(
        'datosImportadorExportador.claveDeReferencia'
      )?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.cadenaDependencia'
      )?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.importePago'
      )?.disable();
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.llaveDePago'
      )?.disable();
    }
  }
  /**
   * Inicializa el objeto `mercancia` con propiedades y valores predefinidos.
   *
   * El objeto `mercancia` contiene las siguientes propiedades:
   * - `labelNombre`: Una cadena de texto que se establece en 'Mercancía', utilizada como etiqueta o título.
   * - `required`: Un valor booleano que se establece en `true`, indicando que este campo es obligatorio.
   * - `primerOpcion`: Una cadena de texto que se establece en 'Seleccione un valor', utilizada como opción predeterminada o de marcador de posición en un menú desplegable.
   * - `catalogos`: Un arreglo de objetos que representan las opciones en el catálogo. Cada objeto tiene:
   *   - `id`: Un identificador único para la opción.
   *   - `descripcion`: Una cadena de texto que describe la opción. Actualmente, ambas opciones tienen la misma descripción 'Opción 1'.
   */

  public getMercancia() {
    this.mercancia = {
      labelNombre: 'Mercancía',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Opción 1',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        },
      ],
    };
  }
  /**
   * Valida el formulario y registra los valores del formulario si el formulario es válido.
   *
   * Este método verifica si el grupo de formularios FormSolicitud es válido.
   * Si el formulario es válido, registra los valores del formulario en la consola.
   */
  validarFormulario() {
    if (this.FormSolicitud.valid) {
      console.log(this.FormSolicitud.value);
    }
  }
  public static docSeleccionado(e: unknown): void {
    console.log(e);
  }
}
