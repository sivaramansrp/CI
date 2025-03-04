import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DomiciliosDePlantasComponent } from './domicilios-de-plantas.component';
import { ProsecService } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user'; // Import the custom component

describe('DomiciliosDePlantasComponent', () => {
  let component: DomiciliosDePlantasComponent;
  let fixture: ComponentFixture<DomiciliosDePlantasComponent>;
  let prosecServiceMock: any;

  beforeEach(async () => {
    prosecServiceMock = {
      obtenerMenuDesplegable: jest.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [DomiciliosDePlantasComponent], // Declare only the main component
      imports: [ReactiveFormsModule, TituloComponent, CatalogoSelectComponent], // Import the custom component
      providers: [
        { provide: ProsecService, useValue: prosecServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // Add this to allow any custom elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomiciliosDePlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.forma).toBeDefined();
    expect(component.forma.controls['modalidad']).toBeDefined();
    expect(component.forma.controls['Estado']).toBeDefined();
    expect(component.forma.controls['RepresentacionFederal']).toBeDefined();
    expect(component.forma.controls['ActividadProductiva']).toBeDefined();
  });

  it('should call obtenserListaEstado and set estadoSeleccionar', () => {
    const mockData = [{ id: 1, nombre: 'Estado 1' }];
    prosecServiceMock.obtenerMenuDesplegable.mockReturnValue(of(mockData));

    component.obtenserListaEstado();

    expect(prosecServiceMock.obtenerMenuDesplegable).toHaveBeenCalledWith('estado.json');
    expect(component.estadoSeleccionar).toEqual(mockData);
  });

  it('should call obtenserListaFederal and set RepresentacionFederal', () => {
    const mockData = [{ id: 1, nombre: 'Federal 1' }];
    prosecServiceMock.obtenerMenuDesplegable.mockReturnValue(of(mockData));

    component.obtenserListaFederal();

    expect(prosecServiceMock.obtenerMenuDesplegable).toHaveBeenCalledWith('federal.json');
    expect(component.RepresentacionFederal).toEqual(mockData);
  });

  it('should call obtenserListaActividad and set ActividadProductiva', () => {
    const mockData = [{ id: 1, nombre: 'Actividad 1' }];
    prosecServiceMock.obtenerMenuDesplegable.mockReturnValue(of(mockData));

    component.obtenserListaActividad();

    expect(prosecServiceMock.obtenerMenuDesplegable).toHaveBeenCalledWith('actividad_productiva.json');
    expect(component.ActividadProductiva).toEqual(mockData);
  });

  it('should call obtenserLista and call obtenserListaFederal and obtenserListaActividad', () => {
    jest.spyOn(component, 'obtenserListaFederal');
    jest.spyOn(component, 'obtenserListaActividad');

    component.obtenserLista();

    expect(component.obtenserListaFederal).toHaveBeenCalled();
    expect(component.obtenserListaActividad).toHaveBeenCalled();
  });
});