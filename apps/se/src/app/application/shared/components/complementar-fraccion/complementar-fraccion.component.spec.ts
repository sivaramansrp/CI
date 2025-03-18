import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplementarFraccionComponent } from './complementar-fraccion.component';

describe('ComplementarFraccionComponent', () => {
  let component: ComplementarFraccionComponent;
  let fixture: ComponentFixture<ComplementarFraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementarFraccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementarFraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
