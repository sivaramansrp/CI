import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisProcedenciaComponent } from './pais-procedencia.component';

describe('PaisProcedenciaComponent', () => {
  let component: PaisProcedenciaComponent;
  let fixture: ComponentFixture<PaisProcedenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisProcedenciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisProcedenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
