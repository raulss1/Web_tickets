import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header';
import { MenuComponent } from '../../Components/menu/menu';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {

}
