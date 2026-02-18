import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNum } from './ticket-num';

describe('TicketNum', () => {
  let component: TicketNum;
  let fixture: ComponentFixture<TicketNum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketNum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketNum);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
