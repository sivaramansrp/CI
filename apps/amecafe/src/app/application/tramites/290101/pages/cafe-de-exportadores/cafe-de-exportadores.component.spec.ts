import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeDeExportadoresComponent } from './cafe-de-exportadores.component';

describe('CafeExportadoresComponent', () => {
  let component: CafeDeExportadoresComponent;
  let fixture: ComponentFixture<CafeDeExportadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeDeExportadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CafeDeExportadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
