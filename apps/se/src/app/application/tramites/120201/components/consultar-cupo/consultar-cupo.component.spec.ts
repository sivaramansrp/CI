import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarCupoComponent } from './consultar-cupo.component';

describe('ConsultarCupoComponent', () => {
  let component: ConsultarCupoComponent;
  let fixture: ComponentFixture<ConsultarCupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarCupoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
