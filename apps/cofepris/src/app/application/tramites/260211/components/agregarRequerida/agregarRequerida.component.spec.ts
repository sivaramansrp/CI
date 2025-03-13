import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarRequeridaComponent } from './agregarRequerida.component';

describe('AgregarRequeridaComponent', () => {
  let component: AgregarRequeridaComponent;
  let fixture: ComponentFixture<AgregarRequeridaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarRequeridaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarRequeridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
