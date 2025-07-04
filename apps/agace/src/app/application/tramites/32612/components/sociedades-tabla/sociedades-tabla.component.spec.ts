import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SociedadesTablaComponent } from './sociedades-tabla.component';

describe('SociedadesTablaComponent', () => {
  let component: SociedadesTablaComponent;
  let fixture: ComponentFixture<SociedadesTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SociedadesTablaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SociedadesTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
