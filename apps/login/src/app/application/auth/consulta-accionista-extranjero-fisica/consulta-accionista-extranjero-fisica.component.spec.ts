import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaAccionistaExtranjeroFisicaComponent } from './consulta-accionista-extranjero-fisica.component';

describe('ConsultaAccionistaExtranjeroFisicaComponent', () => {
  let component: ConsultaAccionistaExtranjeroFisicaComponent;
  let fixture: ComponentFixture<ConsultaAccionistaExtranjeroFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaAccionistaExtranjeroFisicaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ConsultaAccionistaExtranjeroFisicaComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
