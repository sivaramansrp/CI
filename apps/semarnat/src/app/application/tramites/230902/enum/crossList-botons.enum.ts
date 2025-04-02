import { CrosslistComponent } from "@libs/shared/data-access-user/src";


export const createCrossListBotons = (component: CrosslistComponent) => [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => {
        if (component) {
          component.agregar('t');
        }
      },
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-primary',
      funcion: (): void => {
        if (component) {
          component.agregar('');
        }
      },
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-primary',
      funcion: (): void => {
        if (component) {
          component.quitar('');
        }
      },
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => {
        if (component) {
          component.quitar('t');
        }
      },
    },
  ];