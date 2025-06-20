import { AgregarComplimentosComponent } from './agregar-complimentos.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { of } from 'rxjs';
import { DatosComplimentos } from '../../../../shared/models/complimentos.model';

describe('AgregarComplimentosComponent', () => {
  let component: AgregarComplimentosComponent;
  let fixture: ComponentFixture<AgregarComplimentosComponent>;
  let mockStore: jest.Mocked<Tramite80101Store>;
  let mockQuery: jest.Mocked<Tramite80101Query>;
  
  beforeEach(async () => {
    mockStore = {
      setDatosComplimentos: jest.fn(),
      agregarTablaDatosComplimentos: jest.fn(),
      agregarTablaDatosComplimentosExtranjera: jest.fn(),
      eliminarTablaDatosComplimentos: jest.fn(),
      eliminarTablaDatosComplimentosExtranjera: jest.fn(),
    } as any;

    mockQuery = {
      selectDatosComplimento$: of({
        razonSocial: 'Empresa XYZ',
        cumpleNormativa: true,
        modalidad: '',
        programaPreOperativo: '',
        datosGeneralis: {},
        obligacionesFiscales: {},
        datosIdentificacion: {},
        domicilioFiscal: {},
      } as unknown as DatosComplimentos),
      selectTablaDatosComplimentos$: of([]),
      selectTablaDatosComplimentosExtranjera$: of([]),
    } as any;

    await TestBed.configureTestingModule({
      imports: [AgregarComplimentosComponent, HttpClientTestingModule],
      providers: [
        { provide: Tramite80101Store, useValue: mockStore },
        { provide: Tramite80101Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarComplimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose tablaDatosComplimentos$ observable from query', (done) => {
    component.tablaDatosComplimentos$.subscribe((val) => {
      expect(val).toEqual([]);
      done();
    });
  });

  it('should expose tablaDatosComplimentosExtranjera$ observable from query', (done) => {
    component.tablaDatosComplimentosExtranjera$.subscribe((val) => {
      expect(val).toEqual([]);
      done();
    });
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
