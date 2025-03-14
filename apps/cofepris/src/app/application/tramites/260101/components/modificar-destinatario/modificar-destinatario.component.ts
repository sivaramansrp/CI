import { Component } from '@angular/core';
import { Catalogo, CatalogosSelect } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-modificar-destinatario',
  templateUrl: './modificar-destinatario.component.html',
  styleUrl: './modificar-destinatario.component.scss',
})
export class ModificarDestinatarioComponent {
  tipoRadioOptions = [
    {
      label: 'Fisica',
      value: 'fisica',
    },
    {
      label: 'Moral',
      value: 'moral',
    },
  ];
  tipoPublicos = 'moral';

  paisCatalogo: CatalogosSelect = {
    labelNombre: 'Pais',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  estadoCatalogo: CatalogosSelect = {
    labelNombre: 'Estado/localidad',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  municipioCatalogo: CatalogosSelect = {
    labelNombre: 'Municipio/alcaldia',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  localidadCatalogo: CatalogosSelect = {
    labelNombre: 'Localidad',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  codigoCatalogo: CatalogosSelect = {
    labelNombre: 'Codigo postal o equivalente',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };
  coloniaCatalogo: CatalogosSelect = {
    labelNombre: 'Colonia',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };

  seleccionaPais(event: Catalogo): void {
    console.log(event);
  }

  seleccionaEstado(event: Catalogo): void {
    console.log(event);
  }

  seleccionaMunicipio(event: Catalogo): void {
    console.log(event);
  }

  seleccionaLocalidad(event: Catalogo): void {
    console.log(event);
  }

  seleccionaCodigo(event: Catalogo): void {
    console.log(event);
  }

  seleccionaEspecificar(event: Catalogo): void {
    console.log(event);
  }
}
