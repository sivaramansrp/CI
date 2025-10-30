import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { DatosBusquedaComponent } from './datos-busqueda.component';

describe('DatosBusquedaComponent', () => {
  let component: DatosBusquedaComponent;
  let fixture: ComponentFixture<DatosBusquedaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [DatosBusquedaComponent],
          providers: [
            { provide: ActivatedRoute, useValue: {} }, // Dummy provider
          ],
        }).compileComponents();
  
      fixture = TestBed.createComponent(DatosBusquedaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
