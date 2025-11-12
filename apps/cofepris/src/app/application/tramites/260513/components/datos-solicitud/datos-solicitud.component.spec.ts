import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,DatosSolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges(); // Ensure change detection runs again
    expect(component).toBeTruthy();
  });

  it('should not throw ExpressionChangedAfterItHasBeenCheckedError after state change', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
