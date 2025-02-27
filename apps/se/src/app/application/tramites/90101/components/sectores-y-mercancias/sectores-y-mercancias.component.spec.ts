import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
import { SectoresYMercanciasComponent } from './sectores-y-mercancias.component';

describe('SectoresYMercanciasComponent', () => {
  let component: SectoresYMercanciasComponent;
  let fixture: ComponentFixture<SectoresYMercanciasComponent>;
  let prosecServiceMock: any;

  beforeEach(async () => {
    prosecServiceMock = {
      obtenerMenuDesplegable: jasmine.createSpy('obtenerMenuDesplegable').and.returnValue(of([])),
      obtenerTablaDatos: jasmine.createSpy('obtenerTablaDatos').and.returnValue(of({ sectors: [] }))
    };

    await TestBed.configureTestingModule({
      declarations: [SectoresYMercanciasComponent],
      providers: [
        FormBuilder,
        { provide: ProsecService, useValue: prosecServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectoresYMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    expect(component.sectoresYMercancias).toBeDefined();
  });

  it('should call obtenserListaEstado on ngOnInit', () => {
    spyOn(component, 'obtenserListaEstado');
    component.ngOnInit();
    expect(component.obtenserListaEstado).toHaveBeenCalled();
  });

  it('should set sector data on obtenserListaEstado', () => {
    const mockData = [{ id: 1, descripcion: 'Sector 1' }];
    prosecServiceMock.obtenerMenuDesplegable.and.returnValue(of(mockData));
    component.obtenserListaEstado();
    expect(component.sector).toEqual(mockData);
  });

  it('should handle error on obtenserListaEstado', () => {
    prosecServiceMock.obtenerMenuDesplegable.and.returnValue(throwError('error'));
    component.obtenserListaEstado();
    expect(component.sector).toEqual([]);
  });

  it('should set sectorsDatos on recuperarDatos', () => {
    const mockResponse = { sectors: [{ tbodyData: 'data' }] };
    prosecServiceMock.obtenerTablaDatos.and.returnValue(of(mockResponse));
    component.recuperarDatos();
    expect(component.sectorsDatos).toEqual([{ tbodyData: 'data' }]);
  });

  it('should handle error on recuperarDatos', () => {
    prosecServiceMock.obtenerTablaDatos.and.returnValue(throwError('error'));
    component.recuperarDatos();
    expect(component.sectorsDatos).toEqual([]);
  });
});
