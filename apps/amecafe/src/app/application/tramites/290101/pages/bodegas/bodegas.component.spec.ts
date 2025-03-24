import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeExportadoresComponent } from './cafe-exportadores.component';

describe('CafeExportadoresComponent', () => {
  let component: CafeExportadoresComponent;
  let fixture: ComponentFixture<CafeExportadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeExportadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CafeExportadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
