jest.mock(
  'libs/shared/theme/assets/json/220401/establecimiento-table.json',
  () => ({
    __esModule: true,
    default: {
      tableHeader: ['Column A', 'Column B'],
      tableBody: [{ tbodyData: ['Data A1', 'Data B1'] }]
    }
  })
);

jest.mock(
  'libs/shared/theme/assets/json/220401/destinatario-table.json',
  () => ({
    __esModule: true,
    default: {
      tableHeader: ['Column X', 'Column Y'],
      tableBody: []
    }
  })
);

jest.mock(
  'libs/shared/theme/assets/json/220401/importador-table.json',
  () => ({
    __esModule: true,
    default: {
      tableHeader: ['Column M', 'Column N'],
      tableBody: []
    }
  })
);


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';


describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let destroyNotifier$: Subject<void>;

  const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: true })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent],
      providers: [{ provide: ConsultaioQuery, useValue: mockConsultaioQuery }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    destroyNotifier$ = (component as any).destroyNotifier$;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize readonly state from query', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('should call getEstablecimiento and populate data', () => {
    component.getEstablecimiento();
    expect(component.establecimientoHeaderData.length).toBeGreaterThan(0);
    expect(component.establecimientoBodyData.length).toBeGreaterThan(0);
  });

  it('should call getDestinatario and populate data', () => {
    component.getDestinatario();
    expect(component.destinatarioHeaderData.length).toBeGreaterThan(0);
    expect(component.destinatarioBodyData.length).toBe(0); // as per mock
  });

  it('should call getImportador and populate data', () => {
    component.getImportador();
    expect(component.importadorHeaderData.length).toBeGreaterThan(0);
    expect(component.importadorBodyData.length).toBe(0); // as per mock
  });

  it('should set hasAgregar to true when agregar is called with "Agregar"', () => {
    component.hasAgregar = false;
    component.agregar('Agregar');
    expect(component.hasAgregar).toBe(true);
  });

  it('should not change hasAgregar when agregar is called with different value', () => {
    component.hasAgregar = false;
    component.agregar('NoAgregar');
    expect(component.hasAgregar).toBe(false);
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
