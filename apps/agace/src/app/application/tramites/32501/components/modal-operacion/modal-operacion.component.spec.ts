import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ModalOperacionComponent } from './modal-operacion.component';
import { MercDesmSinMonService } from '../../services/merc-desm-sin-mon.service';
import { Solicitud32501Query } from '../../estados/solicitud32501.query';
import { Solicitud32501Store } from '../../estados/solicitud32501.store';

describe('ModalOperacionComponent', () => {
  let component: ModalOperacionComponent;
  let fixture: ComponentFixture<ModalOperacionComponent>;
  let mercDesmSinMonServiceMock: jest.Mocked<MercDesmSinMonService>;
  let solicitud32501QueryMock: jest.Mocked<Solicitud32501Query>;
  let solicitud32501StoreMock: jest.Mocked<Solicitud32501Store>;

  beforeEach(async () => {
    mercDesmSinMonServiceMock = {
      obtenerAvisoDelCatalogo: jest.fn(),
    } as unknown as jest.Mocked<MercDesmSinMonService>;

    solicitud32501QueryMock = {
      seleccionarSolicitud$: of({
        patente: '',
        rfc: '',
        pedimento: '',
        aduana: '',
      }),
    } as unknown as jest.Mocked<Solicitud32501Query>;

    solicitud32501StoreMock = {
      actualizarAduana: jest.fn(),
      actualizarPatente: jest.fn(),
      actualizaRFC: jest.fn(),
      actualizarPedimento: jest.fn(),
    } as unknown as jest.Mocked<Solicitud32501Store>;

    await TestBed.configureTestingModule({
      declarations: [ModalOperacionComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MercDesmSinMonService, useValue: mercDesmSinMonServiceMock },
        { provide: Solicitud32501Query, useValue: solicitud32501QueryMock },
        { provide: Solicitud32501Store, useValue: solicitud32501StoreMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.frmDatosOperacionImp).toBeDefined();
    expect(component.frmDatosOperacionImp.controls['patente']).toBeDefined();
    expect(component.frmDatosOperacionImp.controls['rfc']).toBeDefined();
    expect(component.frmDatosOperacionImp.controls['pedimento']).toBeDefined();
    expect(component.frmDatosOperacionImp.controls['aduana']).toBeDefined();
  });

  it('should call obtenerAvisoDelCatalogo on initialization', () => {
    mercDesmSinMonServiceMock.obtenerAvisoDelCatalogo.mockReturnValue(
      of({
        cveFraccionArancelaria: {
          catalogos: [
            {
              id: 1,
              descripcion: '01031001-Reproductors de raza..',
            },
            {
              id: 2,
              descripcion: '01031002-Reproductors de raza..',
            },
            {
              id: 3,
              descripcion: '01031003-Reproductors de raza..',
            },
          ],
          labelNombre: 'Fracción arancelaria',
          required: true,
          primerOpcion: 'Seleccione un valor',
        },
        entidadFederativa: {
          catalogos: [
            {
              id: 1,
              descripcion: 'MEXICO-1',
            },
            {
              id: 2,
              descripcion: 'MEXICO-2',
            },
            {
              id: 3,
              descripcion: 'MEXICO-3',
            },
          ],
          labelNombre: 'Entidad federativa',
          required: true,
          primerOpcion: 'Seleccione un valor',
        },
        delegacionMunicipio: {
          catalogos: [
            {
              id: 1,
              descripcion: 'ATENCO-1',
            },
            {
              id: 2,
              descripcion: 'ATENCO-2',
            },
            {
              id: 3,
              descripcion: 'ATENCO-3',
            },
          ],
          labelNombre: 'Alcaldía o municipio',
          required: true,
          primerOpcion: 'Seleccione un valor',
        },
        colonia: {
          catalogos: [
            {
              id: 1,
              descripcion: 'LA NORIA-1',
            },
            {
              id: 2,
              descripcion: 'LA NORIA-2',
            },
            {
              id: 3,
              descripcion: 'LA NORIA-3',
            },
          ],
          labelNombre: 'Colonia',
          required: true,
          primerOpcion: 'Seleccione un valor',
        },
        aduanaDeImportacion: {
          catalogos: [
            {
              id: 1,
              descripcion: 'Test-1',
            },
            {
              id: 2,
              descripcion: 'Test-2',
            },
            {
              id: 3,
              descripcion: 'Test-3',
            },
          ],
          labelNombre: 'Aduana de importación',
          required: true,
          primerOpcion: 'Seleccione un valor',
        },
        opcionTipoDeDocumento: {
          labelNombre: 'Tipo de documento',
          required: false,
          primerOpcion: 'Seleccione un tipo de documento',
          catalogos: [
            {
              id: 1,
              descripcion: 'Manifiesto',
            },
            {
              id: 2,
              descripcion: 'ID Oficial',
            },
            {
              id: 3,
              descripcion: 'Actas',
            },
            {
              id: 4,
              descripcion: 'Poderes',
            },
            {
              id: 5,
              descripcion: 'Otros',
            },
          ],
        },
      })
    );
    component.obtenerAvisoDelCatalogo();
    expect(
      mercDesmSinMonServiceMock.obtenerAvisoDelCatalogo
    ).toHaveBeenCalled();
  });

  it('should update aduana when actualizarAduana is called', () => {
    const mockCatalogo = { id: 1, descripcion: 'Aduana1' };
    component.actualizarAduana(mockCatalogo);
    expect(solicitud32501StoreMock.actualizarAduana).toHaveBeenCalledWith(1);
  });

  it('should update patente when actualizarPatente is called', () => {
    const mockEvent = { target: { value: 'ABC123' } } as unknown as Event;
    component.actualizarPatente(mockEvent);
    expect(solicitud32501StoreMock.actualizarPatente).toHaveBeenCalledWith(
      'ABC123'
    );
  });

  it('should update RFC when actualizaRFC is called', () => {
    const mockEvent = { target: { value: 'RFC123' } } as unknown as Event;
    component.actualizaRFC(mockEvent);
    expect(solicitud32501StoreMock.actualizaRFC).toHaveBeenCalledWith('RFC123');
  });

  it('should update pedimento when actualizarPedimento is called', () => {
    const mockEvent = { target: { value: 'PED123' } } as unknown as Event;
    component.actualizarPedimento(mockEvent);
    expect(solicitud32501StoreMock.actualizarPedimento).toHaveBeenCalledWith(
      'PED123'
    );
  });

  it('should return true if a form control is invalid and touched in noEsValido', () => {
    component.frmDatosOperacionImp.controls['patente'].setErrors({
      required: true,
    });
    component.frmDatosOperacionImp.controls['patente'].markAsTouched();
    expect(component.noEsValido('patente')).toBe(true);
  });

  it('should return false if a form control is valid in esValido', () => {
    component.frmDatosOperacionImp.controls['patente'].setValue('ValidValue');
    expect(component.esValido('patente')).toBe(false);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
