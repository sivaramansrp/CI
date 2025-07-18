import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercializadoraImportadoraComponent } from './comercializadora-importadora.component';

describe('ComercializadoraImportadoraComponent', () => {
  let component: ComercializadoraImportadoraComponent;
  let fixture: ComponentFixture<ComercializadoraImportadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComercializadoraImportadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComercializadoraImportadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
