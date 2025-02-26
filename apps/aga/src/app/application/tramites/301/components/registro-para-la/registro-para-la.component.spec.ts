import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroParaLaComponent } from './registro-para-la.component';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { of } from 'rxjs'; // If you use observables

describe('RegistroParaLaComponent', () => {
  let component: RegistroParaLaComponent;
  let fixture: ComponentFixture<RegistroParaLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistroParaLaComponent,
        CatalogoSelectComponent,
        BtnContinuarComponent,
        AlertComponent,
        TituloComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroParaLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes to initialize component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Check if component is created successfully
  });

  it('should initialize the component and set default values', () => {
    expect(component.indice).toBe(1);
    expect(component.registro).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' }
    ]);
    expect(component.pasos).toEqual([]);
    expect(component.datosPasos.nroPasos).toBe(0); // Default nroPasos should be 0 initially
  });

  it('should call getRegistro() during ngOnInit()', () => {
    spyOn(component, 'getRegistro');
    component.ngOnInit(); // Call ngOnInit() method
    expect(component.getRegistro).toHaveBeenCalled(); // Ensure getRegistro was called
  });

  it('should populate registro and pasos correctly in getRegistro()', () => {
    component.getRegistro();
    expect(component.registro).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' }
    ]);
    expect(component.pasos).toEqual([]); // Assuming pasos is empty for now
    expect(component.datosPasos.nroPasos).toBe(0);
  });


  it('should define the method registroSeleccion()', () => {
    expect(component.registroSeleccion).toBeDefined(); // Ensure the method exists
  });

  it('should set TEXTOS and ADVERTENCIA constants correctly', () => {
    expect(component.TEXTOS).toBeTruthy(); // Should not be null/undefined
    expect(component.ADVERTENCIA).toBeTruthy(); // Should not be null/undefined
  });

  // Add more tests based on UI interaction and user flows if necessary
});
