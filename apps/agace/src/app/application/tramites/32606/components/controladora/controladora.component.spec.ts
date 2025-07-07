import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControladoraComponent } from './controladora.component';

describe('ControladoraComponent', () => {
  let component: ControladoraComponent;
  let fixture: ComponentFixture<ControladoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControladoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControladoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
