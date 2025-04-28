import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvioDigitalComponent } from './envio-digital.component';

describe('EnvioDigitalComponent', () => {
  let component: EnvioDigitalComponent;
  let fixture: ComponentFixture<EnvioDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioDigitalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnvioDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
