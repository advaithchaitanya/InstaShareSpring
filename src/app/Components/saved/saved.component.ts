import { Component, OnInit } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { PostsComponent } from '../../Gear/posts/posts.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved',
  imports: [PostsComponent,CommonModule],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css'
})
export class SavedComponent implements OnInit{
  constructor(public service:MainService){

  }
  savedPostsData!:any[];
    ngOnInit(): void {
      // this.savedPostsData=this.service.getSavedPosts();
      // console.log(this.savedPostsData)
    }
}
