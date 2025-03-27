import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoDesistirComponent } from './permisoDesistir.component';

describe('PermisoDesistirComponent', () => {
  let component: PermisoDesistirComponent;
  let fixture: ComponentFixture<PermisoDesistirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisoDesistirComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoDesistirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
