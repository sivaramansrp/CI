import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroTrasportistaComponent } from './registro-trasportista.component';

describe('RegistroTrasportistaComponent', () => {
  let component: RegistroTrasportistaComponent;
  let fixture: ComponentFixture<RegistroTrasportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroTrasportistaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroTrasportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
