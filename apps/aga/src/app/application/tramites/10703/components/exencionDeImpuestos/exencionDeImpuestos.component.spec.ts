import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExencionDeImpuestosComponent } from './exencionDeImpuestos.component';

describe('ExencionDeImpuestosComponent', () => {
  let component: ExencionDeImpuestosComponent;
  let fixture: ComponentFixture<ExencionDeImpuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExencionDeImpuestosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExencionDeImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
