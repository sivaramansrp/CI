import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportacionProductosComponent } from './importacion-productos.component';

describe('ImportacionProductosComponent', () => {
  let component: ImportacionProductosComponent;
  let fixture: ComponentFixture<ImportacionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportacionProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});