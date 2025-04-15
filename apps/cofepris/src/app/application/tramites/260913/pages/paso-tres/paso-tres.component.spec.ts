import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoTresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component', () => {
    // Verify that the component is created successfully
    expect(component).toBeTruthy();
  });

  // Add additional test cases here if the component has properties or methods to test
});
