import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomiciliosDePlantasComponent } from './domicilios-de-plantas.component';

describe('DomiciliosDePlantasComponent', () => {
  let component: DomiciliosDePlantasComponent;
  let fixture: ComponentFixture<DomiciliosDePlantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomiciliosDePlantasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DomiciliosDePlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
