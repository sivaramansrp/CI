import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosCertificadoComponent } from './datos-certificado.component';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let mockService: any;
  let mockQuery: any;
  let mockStore: any;

  beforeEach(async () => {
    mockService = {
      getDatosCertificado: jest.fn().mockReturnValue(of([{ id: 1, name: 'Dato 1' }])),
    };

    mockQuery = {
      lugar$: of('Lugar 1'),
      observaciones$: of('Observación 1'),
      tableDataDatos$: of([{ id: 1, name: 'Dato 1' }]),
    };

    mockStore = {
      almacenarValoresDeTabla: jest.fn(),
      setlugar: jest.fn(),
      setobservaciones: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosCertificadoComponent],
      declarations: [],
      providers: [
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: Tramite110218Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch table data on initialization', () => {
    expect(mockService.getDatosCertificado).toHaveBeenCalled();
    expect(component.datos).toEqual([{ id: 1, name: 'Dato 1' }]);
  });

  it('should subscribe to lugar$ and update the form', () => {
    expect(component.datosDelCertificado.get('lugar')?.value).toBe('Lugar 1');
  });

  it('should subscribe to observaciones$ and update the form', () => {
    expect(component.datosDelCertificado.get('observaciones')?.value).toBe('Observación 1');
  });

  it('should store selected row and emit event on form modification', () => {
    jest.spyOn(component.modificarEventCertificado, 'emit');
    const row = { id: 1, name: 'Row 1' };
    component.filaSeleccionada = row;
    component.enModificarFormulario();
    expect(mockStore.almacenarValoresDeTabla).toHaveBeenCalledWith(row);
    expect(component.modificarEventCertificado.emit).toHaveBeenCalledWith(false);
  });

  it('should update store on lugar change', () => {
    component.datosDelCertificado.get('lugar')?.setValue('Nuevo Lugar');
    component.enCambioDeDatosDelCertificado('lugar');
    expect(mockStore.setlugar).toHaveBeenCalledWith('Nuevo Lugar');
  });

  it('should update store on observaciones change', () => {
    component.datosDelCertificado.get('observaciones')?.setValue('Nueva Observación');
    component.enCambioDeDatosDelCertificado('observaciones');
    expect(mockStore.setobservaciones).toHaveBeenCalledWith('Nueva Observación');
  });

  

  it('should not update store if controlName is invalid', () => {
    const spyLugar = jest.spyOn(mockStore, 'setlugar');
    const spyObservaciones = jest.spyOn(mockStore, 'setobservaciones');

    component.enCambioDeDatosDelCertificado('invalidControl');
    expect(spyLugar).not.toHaveBeenCalled();
    expect(spyObservaciones).not.toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should handle empty table data gracefully', () => {
    mockService.getDatosCertificado.mockReturnValue(of([]));
    component.obtenerDatosDeTabla();
    expect(component.datos).toEqual([]);
  });

  
});