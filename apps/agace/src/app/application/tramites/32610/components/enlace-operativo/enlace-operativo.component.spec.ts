import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnlaceOperativoComponent } from './enlace-operativo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { Solicitud32610Store } from '../../estados/solicitud32610.store';
import { Solicitud32610Query } from '../../estados/solicitud32610.query';

describe('EnlaceOperativoComponent', () => {
  let component: EnlaceOperativoComponent;
  let fixture: ComponentFixture<EnlaceOperativoComponent>;
  let tramiteStoreSpy: any;

  beforeEach(async () => {
    tramiteStoreSpy = {
      actualizarEstado: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [],
      providers: [
        { provide: Solicitud32610Store, useValue: tramiteStoreSpy },
        {
          provide: Solicitud32610Query,
          useValue: {
            selectSolicitud$: of({
              enlaceOperativoData: [],
              readonly: false,
            }),
          },
        },
        {
          provide: ConsultaioQuery,
          useValue: {
            selectConsultaioState$: of({ readonly: false }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnlaceOperativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('debería invalidar el formulario si "registro" está vacío o con formato incorrecto', () => {
    const control = component.enlaceOperativoForm.get('registro');

    control?.setValue('');
    expect(control?.valid).toBeFalsy();

    control?.setValue('123'); 
    expect(control?.valid).toBeFalsy();

    control?.setValue('XAXX010101000'); 
    expect(control?.valid).toBeTruthy();
  });

  it('debería mostrar notificación de formato incorrecto cuando "registro" es inválido', () => {
    const spyMostrarNotificacion = jest.spyOn(component, 'mostrarNotificacionFormatoIncorrecto');
    component.enlaceOperativoForm.get('registro')?.setValue('123'); 
    component.buscar();
    expect(spyMostrarNotificacion).toHaveBeenCalled();
  });

  it('debería cargar datos mock y mostrar notificación de búsqueda', () => {
    const spyMostrarNotificacion = jest.spyOn(component, 'mostrarNotificacionDeBusqueda');
    component.enlaceOperativoForm.get('registro')?.setValue('XAXX010101000');
    component.buscar();
    expect(spyMostrarNotificacion).toHaveBeenCalled();
    expect(component.enlaceOperativoForm.get('rfc')?.value).toBe('XAXX010101000');
    expect(component.enlaceOperativoForm.get('nombre')?.value).toBe('EUROFOODS DE MEXICO');
  });

  it('no debería enviar datos si el formulario es inválido', () => {
    const spyEnlaceInfoDatos = jest.spyOn(component, 'enlaceInfoDatos');
    component.enlaceOperativoForm.get('registro')?.setValue('');
    component.enviarDialogData();
    expect(spyEnlaceInfoDatos).not.toHaveBeenCalled();
  });

  it('debería enviar datos y limpiar formulario si es válido', () => {
    component.enlaceOperativoForm.get('registro')?.setValue('XAXX010101000');
    component.enlaceOperativoForm.get('rfc')?.enable();
    component.enlaceOperativoForm.get('rfc')?.setValue('XAXX010101000');

    const spyEnlaceInfoDatos = jest.spyOn(component, 'enlaceInfoDatos');
    const spyLimpiarFormulario = jest.spyOn(component, 'limpiarFormulario');
    const spyCambiarEstadoModal = jest.spyOn(component, 'cambiarEstadoModal');

    component.enviarDialogData();

    expect(spyEnlaceInfoDatos).toHaveBeenCalled();
    expect(spyLimpiarFormulario).toHaveBeenCalled();
    expect(spyCambiarEstadoModal).toHaveBeenCalled();
  });

  it('debería agregar un nuevo ítem y actualizar el estado del store', () => {
    component.modoEdicion = false;
    component.enlaceOperativoForm.get('registro')?.setValue('XAXX010101000');
    component.enlaceOperativoForm.get('rfc')?.enable();
    component.enlaceOperativoForm.get('rfc')?.setValue('XAXX010101000');
    component.enlaceOperativoForm.get('nombre')?.enable();
    component.enlaceOperativoForm.get('nombre')?.setValue('Test Nombre');

    component.enlaceInfoDatos();

    expect(tramiteStoreSpy.actualizarEstado).toHaveBeenCalled();
    expect(component.enlaceOperativoData.length).toBeGreaterThan(0);
  });

  it('debería eliminar ítems seleccionados y actualizar el store', () => {
    component.enlaceOperativoData = [
      { id: 1, registro: 'XAXX010101000' } as any,
      { id: 2, registro: 'XEXX010101000' } as any,
    ];
    component.listaFilaSeleccionadaEnlace = [component.enlaceOperativoData[0]];

    component.eliminarEnlaceItem(true);

    expect(component.enlaceOperativoData.find(item => item.id === 1)).toBeUndefined();
    expect(tramiteStoreSpy.actualizarEstado).toHaveBeenCalled();
  });

  it('debería mostrar notificación si se intenta modificar sin seleccionar fila', () => {
    component.listaFilaSeleccionadaEnlace = [];

    component.modificarItemEnlace();

    expect(component.esFilaSeleccionada).toBeTruthy();
    expect(component.nuevaNotificacion.mensaje).toContain('Seleccione un registro');
  });

  it('debería habilitar modo edición y abrir modal con datos al modificar un ítem seleccionado', () => {
    component.listaFilaSeleccionadaEnlace = [
      {
        id: 1,
        registro: 'XAXX010101000',
        rfc: 'XAXX010101000',
        nombre: 'Test',
        apellidoPaterno: '',
        apellidoMaterno: '',
        cuidad: '',
        cargo: '',
        telefono: '',
        correoElectronico: '',
        suplente: false,
      },
    ];

    const spyAgregarDialogo = jest.spyOn(component, 'agregarDialogoDatos');
    component.modificarItemEnlace();

    expect(component.modoEdicion).toBe(true);
    expect(component.registroEditandoId).toBe(1);
    expect(spyAgregarDialogo).toHaveBeenCalled();
  });
});
