import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AduanerasInformacionesComponent } from './aduaneras-informaciones.component';

describe('AduanerasInformacionesComponent', () => {
  let component: AduanerasInformacionesComponent;
  let fixture: ComponentFixture<AduanerasInformacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AduanerasInformacionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AduanerasInformacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
