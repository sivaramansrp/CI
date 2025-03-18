import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulariosDeCertiRegistroComponent } from './formularios-de-certi-registro.component';

describe('FormulariosDeCertiRegistroComponent', () => {
  let component: FormulariosDeCertiRegistroComponent;
  let fixture: ComponentFixture<FormulariosDeCertiRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulariosDeCertiRegistroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulariosDeCertiRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
