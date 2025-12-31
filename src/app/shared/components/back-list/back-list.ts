import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-back-list',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './back-list.html',
  styleUrl: './back-list.scss',
})
export class BackList {

}
