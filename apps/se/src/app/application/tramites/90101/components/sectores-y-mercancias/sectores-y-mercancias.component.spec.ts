import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { ProsecService } from '../../services/prosec.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SectoresYMercanciasComponent } from './sectores-y-mercancias.component';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

describe('SectoresYMercanciasComponent', () => {
  let component: SectoresYMercanciasComponent;
  let fixture: ComponentFixture<SectoresYMercanciasComponent>;
  let prosecServiceMock: any;

  beforeEach(async () => {
    prosecServiceMock = {
      obtenerMenuDesplegable: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Sector 1' }]))
    };

    await TestBed.configureTestingModule({
      declarations: [SectoresYMercanciasComponent], // Declare only the main component
      imports: [ReactiveFormsModule, TablaDinamicaComponent, CatalogoSelectComponent], // Import the custom component
      providers: [
        { provide: ProsecService, useValue: prosecServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // Add this to allow any custom elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectoresYMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    expect(component.sectoresYMercancias).toBeDefined();
    expect(component.sectoresYMercancias.controls['sector']).toBeDefined();
    expect(component.sectoresYMercancias.controls['Fraccion_arancelaria']).toBeDefined();
  });

  it('should call obtenserLista on init', () => {
    const spy = jest.spyOn(component, 'obtenserListaEstado');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should populate sector array on obtenserListaEstado', () => {
    const MOCKDATA = [{ id: 1, nombre: 'Sector 1' }];
    prosecServiceMock.obtenerMenuDesplegable.mockReturnValue(of(MOCKDATA));

    component.obtenserListaEstado();

    expect(prosecServiceMock.obtenerMenuDesplegable).toHaveBeenCalledWith('sector.json');
    expect(component.sector.length).toBeGreaterThan(0);
    expect(component.sector[0].id).toBe(1);
  });

  it('should set TEXTO constant correctly', () => {
    expect(component.TEXTO).toBe('Para continuar con el trámite, debes agregar por lo menos una mercancía.');
  });

  it('should have correct sector columns configuration', () => {
    expect(component.sectorColumnsConfiguracion.length).toBe(2);
    expect(component.sectorColumnsConfiguracion[0].encabezado).toBe('Lista de sectores');
    expect(component.sectorColumnsConfiguracion[1].encabezado).toBe('Clave del sector');
  });
});