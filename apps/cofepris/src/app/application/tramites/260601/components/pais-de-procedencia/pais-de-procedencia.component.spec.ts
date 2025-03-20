import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisDeProcedenciaComponent } from './pais-de-procedencia.component';

describe('PaisDeProcedenciaComponent', () => {
  let component: PaisDeProcedenciaComponent;
  let fixture: ComponentFixture<PaisDeProcedenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisDeProcedenciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisDeProcedenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
