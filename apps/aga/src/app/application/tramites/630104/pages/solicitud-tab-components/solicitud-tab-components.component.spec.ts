import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudTabComponentsComponent } from './solicitud-tab-components.component';

describe('SolicitudTabComponentsComponent', () => {
  let component: SolicitudTabComponentsComponent;
  let fixture: ComponentFixture<SolicitudTabComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudTabComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudTabComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
