import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaMercanciaComponent } from './datos-de-la-mercancia.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { of } from 'rxjs';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercanciaComponent>;
  let serviceMock: ImportacionDefinitivaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaMercanciaComponent, HttpClientTestingModule],
      providers: [ImportacionDefinitivaService]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    serviceMock = TestBed.inject(ImportacionDefinitivaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerFraccionArancelaria and obtenerUnidadDeMedida', () => {
    const obtenerFraccionArancelariaSpy = jest.spyOn(component, 'obtenerFraccionArancelaria');
    const obtenerUnidadDeMedidaSpy = jest.spyOn(component, 'obtenerUnidadDeMedida');
    component.ngOnInit();
    expect(obtenerFraccionArancelariaSpy).toHaveBeenCalled();
    expect(obtenerUnidadDeMedidaSpy).toHaveBeenCalled();
  });

  it('should complete destroyNotifier$', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call getFraccionArancelaria and populate fraccion_arancelaria field if opciones is undefined', () => {
      const mockResponse = [
        { id: 101, descripcion: 'Fracción 1' },
        { id: 102, descripcion: 'Fracción 2' }
      ];
      component.datosDeLaMercanciaFormData = [
        { campo: 'fraccion_arancelaria' } as any
      ];
      jest.spyOn(serviceMock, 'getFraccionArancelaria').mockReturnValue(of(mockResponse));
      component.obtenerFraccionArancelaria();
      fixture.detectChanges();
      const field = component.datosDeLaMercanciaFormData.find(f => f.campo === 'fraccion_arancelaria');
      expect(field?.opciones).toEqual([
        { id: 101, descripcion: 'Fracción 1' },
        { id: 102, descripcion: 'Fracción 2' }
      ]);
      expect(serviceMock.getFraccionArancelaria).toHaveBeenCalled();
    });

    it('should do nothing if fraccion_arancelaria field does not exist', () => {
      component.datosDeLaMercanciaFormData = [];
      jest.spyOn(serviceMock, 'getFraccionArancelaria').mockReturnValue(of([]));
      component.obtenerFraccionArancelaria();
      expect(serviceMock.getFraccionArancelaria).toHaveBeenCalled();
    });

    it('should not overwrite opciones if already set', () => {
      component.datosDeLaMercanciaFormData = [
        {
          campo: 'fraccion_arancelaria',
          opciones: [{ id: 999, descripcion: 'Existing' }]
        } as any
      ];
      jest.spyOn(serviceMock, 'getFraccionArancelaria').mockReturnValue(of([
        { id: 1, descripcion: 'New' }
      ]));
      component.obtenerFraccionArancelaria();
      const field = component.datosDeLaMercanciaFormData.find(f => f.campo === 'fraccion_arancelaria');
      expect(field?.opciones).toEqual([{ id: 999, descripcion: 'Existing' }]);
    });

    it('should call getUnidadDeMedida and populate unidad_de_medida field if opciones is undefined', () => {
      const mockResponse = [
        { id: 201, descripcion: 'Kilogramo' },
        { id: 202, descripcion: 'Litro' }
      ];
      component.datosDeLaMercanciaFormData = [
        { campo: 'unidad_de_medida' } as any
      ];
      jest.spyOn(serviceMock, 'getUnidadDeMedida').mockReturnValue(of(mockResponse));
      component.obtenerUnidadDeMedida();
      fixture.detectChanges();
      const field = component.datosDeLaMercanciaFormData.find(f => f.campo === 'unidad_de_medida');
      expect(field?.opciones).toEqual([
        { id: 201, descripcion: 'Kilogramo' },
        { id: 202, descripcion: 'Litro' }
      ]);
      expect(serviceMock.getUnidadDeMedida).toHaveBeenCalled();
    });

    it('should not overwrite opciones if already set', () => {
      component.datosDeLaMercanciaFormData = [
        {
          campo: 'unidad_de_medida',
          opciones: [{ id: 999, descripcion: 'Existente' }]
        } as any
      ];
      jest.spyOn(serviceMock, 'getUnidadDeMedida').mockReturnValue(of([
        { id: 1, descripcion: 'Nuevo' }
      ]));
      component.obtenerUnidadDeMedida();
      const field = component.datosDeLaMercanciaFormData.find(f => f.campo === 'unidad_de_medida');
      expect(field?.opciones).toEqual([{ id: 999, descripcion: 'Existente' }]);
    });
});
