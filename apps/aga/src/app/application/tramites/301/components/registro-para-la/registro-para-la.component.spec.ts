import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroParaLaComponent } from './registro-para-la.component';
import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';

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
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); 
  });

  it('should initialize the component and set default values', () => {
    expect(component.indice).toBe(1);
    expect(component.registroOptions).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' }
    ]);
    expect(component.pasos).toEqual([]);
    expect(component.datosPasos.nroPasos).toBe(0); 
  });

  it('should call getRegistro() during ngOnInit()', () => {
    const spy = jest.spyOn(component, 'getRegistro');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set TEXTOS and ADVERTENCIA constants correctly', () => {
    expect(component.TEXTOS).toBeTruthy(); 
    expect(component.ADVERTENCIA).toBeTruthy(); 
  });

});