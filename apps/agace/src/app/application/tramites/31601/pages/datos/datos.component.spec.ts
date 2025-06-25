import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe retornar true en showIMMEXSensiblesSection si regimen_0 está seleccionado', () => {
    component.solicitudState = { regimen_0: true } as any;
    expect(component.showIMMEXSensiblesSection).toBe(true);
  });

  it('debe retornar true en showDepositoFiscalSection si regimen_1 está seleccionado', () => {
    component.solicitudState = { regimen_1: true } as any;
    expect(component.showDepositoFiscalSection).toBe(true);
  });

  it('debe retornar true en showRecintoFiscalizadoSection si regimen_2 está seleccionado', () => {
    component.solicitudState = { regimen_2: true } as any;
    expect(component.showRecintoFiscalizadoSection).toBe(true);
  });

  it('debe retornar true en showRecintoEstrategicoSection si regimen_3 está seleccionado', () => {
    component.solicitudState = { regimen_3: true } as any;
    expect(component.showRecintoEstrategicoSection).toBe(true);
  });

  it('debe retornar false en todos los getters si ningún régimen está seleccionado', () => {
    component.solicitudState = {} as any;
    expect(component.showIMMEXSensiblesSection).toBeFalsy();
    expect(component.showDepositoFiscalSection).toBeFalsy();
    expect(component.showRecintoFiscalizadoSection).toBeFalsy();
    expect(component.showRecintoEstrategicoSection).toBeFalsy();
  });
});