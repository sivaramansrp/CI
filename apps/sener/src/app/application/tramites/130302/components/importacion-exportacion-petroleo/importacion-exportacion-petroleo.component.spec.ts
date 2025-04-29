import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportacionExportacionPetroleoComponent } from './importacion-exportacion-petroleo.component';

describe('ImportacionExportacionPetroleoComponent', () => {
  let component: ImportacionExportacionPetroleoComponent;
  let fixture: ComponentFixture<ImportacionExportacionPetroleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportacionExportacionPetroleoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportacionExportacionPetroleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
