import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainService } from './Services/main.service';
import { UserService } from './Services/user.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  constructor(public service:UserService){}
  ngOnInit(): void {
    this.service.loadCurrentUser();
  }
  title = 'App';
}

export interface MyDetailsDTO {
  id: string;
  username: string;
  profileUrl: string;
}