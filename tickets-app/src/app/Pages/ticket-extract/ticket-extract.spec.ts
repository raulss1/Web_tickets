import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketExtract } from './ticket-extract';

describe('TicketExtract', () => {
  let component: TicketExtract;
  let fixture: ComponentFixture<TicketExtract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketExtract]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketExtract);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
