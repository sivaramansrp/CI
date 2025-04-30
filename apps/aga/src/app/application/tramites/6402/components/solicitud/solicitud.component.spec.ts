// aviso.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AvisoComponent } from './aviso.component';
import { Tramite6402Store } from '../../estados/tramite6402.store';
import { Tramite6402Query } from '../../estados/tramite6402.query';
import { AvisoDestruccionService } from '../../services/aviso-destruccion.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { provideHttpClient } from '@angular/common/http';describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AvisoComponent],
      providers: [FormBuilder, Tramite6402Store, Tramite6402Query, AvisoDestruccionService, ValidacionesFormularioService, provideHttpClient()],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
  });

  it('should initialize the form', () => {
    component.inicializarFormulario();
    expect(component.avisoFormulario).toBeDefined();
    expect(component.avisoFormulario.controls['adaceFormulario']).toBeDefined();
    expect(component.avisoFormulario.controls['datosEmpresa']).toBeDefined();
    expect(component.avisoFormulario.controls['datosAviso']).toBeDefined();
    expect(component.avisoFormulario.controls['direccionOrigen']).toBeDefined();
    expect(component.avisoFormulario.controls['tipoCarga']).toBeDefined();
    expect(component.avisoFormulario.controls['archivoMasivo']).toBeDefined();
  });
});
