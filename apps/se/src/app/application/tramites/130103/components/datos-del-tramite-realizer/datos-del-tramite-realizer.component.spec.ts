import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteRealizerComponent } from './datos-del-tramite-realizer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { of, Subject } from 'rxjs';

describe('DatosDelTramiteRealizerComponent', () => {
  let component: DatosDelTramiteRealizerComponent;
  let fixture: ComponentFixture<DatosDelTramiteRealizerComponent>;
  let importacionDefinitivaService: ImportacionDefinitivaService;

  const mockQuery = {
    selectImportacion$: of({ someKey: 'someValue' }),
  };

  const storeMock = {
    setDynamicFieldValue: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteRealizerComponent, HttpClientTestingModule],
      providers: [
        ImportacionDefinitivaService,
        { provide: 'tramite130103Query', useValue: mockQuery },
        { provide: 'tramite130103Store', useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteRealizerComponent);
    component = fixture.componentInstance;
    importacionDefinitivaService = TestBed.inject(ImportacionDefinitivaService);
    component['tramite130103Query'] = mockQuery as any;
    component['tramite130103Store'] = storeMock as any;
    component.datosDelTramiteFormData = [
      { campo: 'regimen' },
      { campo: 'clasificacion' }
    ] as any;
    component.consultaState = {
      readonly: false,
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerRegimenDestinara and obtenerRegimenClasificacion on ngOnInit', () => {
    const spy1 = jest.spyOn(component, 'obtenerRegimenDestinara');
    const spy2 = jest.spyOn(component, 'obtenerRegimenClasificacion');
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should populate regimen options in obtenerRegimenDestinara', () => {
    const response = {
      code: 200,
      data: [{ id: 1, descripcion: 'Regimen 1' }],
      message: 'Success'
    };
    jest.spyOn(importacionDefinitivaService, 'getRegimenMercancia').mockReturnValue(of(response));
    component.obtenerRegimenDestinara();
    expect(component.datosDelTramiteFormData[0].opciones).toEqual([
      { id: 1, descripcion: 'Regimen 1' }
    ]);
  });

  it('should populate clasificacion options in obtenerRegimenClasificacion', () => {
    const response = {
      code: 200,
      data: [{ id: 2, descripcion: 'Clasificacion 1' }],
      message: 'Success'
    };
    jest.spyOn(importacionDefinitivaService, 'getClasifiRegimen').mockReturnValue(of(response));
    component.obtenerRegimenClasificacion();
    expect(component.datosDelTramiteFormData[1].opciones).toEqual([
      { id: 2, descripcion: 'Clasificacion 1' }
    ]);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
