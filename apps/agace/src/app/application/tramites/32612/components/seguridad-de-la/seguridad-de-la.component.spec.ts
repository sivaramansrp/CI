import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguridadDeLaComponent } from './seguridad-de-la.component';

describe('SeguridadDeLaComponent', () => {
  let component: SeguridadDeLaComponent;
  let fixture: ComponentFixture<SeguridadDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguridadDeLaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeguridadDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
