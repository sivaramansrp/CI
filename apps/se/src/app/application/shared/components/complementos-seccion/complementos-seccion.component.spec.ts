import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplementosSeccionComponent } from './complementos-seccion.component';

describe('ComplementosSeccionComponent', () => {
  let component: ComplementosSeccionComponent;
  let fixture: ComponentFixture<ComplementosSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementosSeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementosSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
