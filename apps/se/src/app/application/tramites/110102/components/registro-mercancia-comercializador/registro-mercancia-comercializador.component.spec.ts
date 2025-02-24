import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroMercanciaComercializadorComponent } from "./registro-mercancia-comercializador.component";

describe('RegistroMercanciaComercializadorComponent', () => {
  let component: RegistroMercanciaComercializadorComponent;
  let fixture: ComponentFixture<RegistroMercanciaComercializadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMercanciaComercializadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      RegistroMercanciaComercializadorComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
