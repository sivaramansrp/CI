import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMercanciaComponent } from './detalle-mercancia.component';

describe('DetalleMercanciaComponent', () => {
  let component: DetalleMercanciaComponent;
  let fixture: ComponentFixture<DetalleMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
