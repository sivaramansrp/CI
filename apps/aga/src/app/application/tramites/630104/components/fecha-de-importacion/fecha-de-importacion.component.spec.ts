import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FechaDeImportacionComponent } from './fecha-de-importacion.component';

describe('FechaDeImportacionComponent', () => {
  let component: FechaDeImportacionComponent;
  let fixture: ComponentFixture<FechaDeImportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FechaDeImportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FechaDeImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
