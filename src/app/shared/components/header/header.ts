import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
