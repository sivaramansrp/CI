import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  const mockSolicitanteService = { 
    validateTab: jest.fn().mockImplementation((tabIndex: number) => {
      return tabIndex > 0 && tabIndex <= 5; 
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports:[],
      providers: [
        { provide: 'SolicitanteService', useValue: mockSolicitanteService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default value of indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should validate the tab index using the mock service', () => {
    const isValid = mockSolicitanteService.validateTab(3); 
    expect(isValid).toBe(true); 
  
    const isInvalid = mockSolicitanteService.validateTab(6); 
    expect(isInvalid).toBe(false); 
  });

  it('should handle negative values in seleccionaTab', () => {
    component.seleccionaTab(-1);
    expect(component.indice).toBe(-1);
  });

  it('should handle zero in seleccionaTab', () => {
    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });
});
