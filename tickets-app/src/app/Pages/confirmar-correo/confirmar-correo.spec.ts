import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCorreo } from './confirmar-correo';

describe('ConfirmarCorreo', () => {
  let component: ConfirmarCorreo;
  let fixture: ComponentFixture<ConfirmarCorreo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarCorreo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarCorreo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
