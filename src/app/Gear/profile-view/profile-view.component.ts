import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-profile-view',
  imports: [CommonModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent implements OnChanges,OnInit {
  @Input() profileData!: any;
  @Input() isMe!:boolean;
  following=true;
  activeTab: 'posts' | 'liked' | 'saved' = 'posts';
  constructor(public service: MainService, public userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['profileData'] && this.profileData) {
      const user = this.userService.getCurrentUser();
        this.following = this.profileData.profile.followers.some(
        (follower: any) => follower.userId === user?.id
      );

      this.isMe = user?.id === this.profileData.id;
      // console.log('Child profileData:', this.profileData);
      // console.log('Current user:', user);
      // console.log('isMe:', this.isMe);
    }
  }
   setActiveTab(tab: 'posts' | 'liked' | 'saved') {
    this.activeTab = tab;
  }
  likedPosts: any[] = [];
  savedPosts: any[] = [];
  ngOnInit(): void {
    this.service.getMyLikes().subscribe({
      next:(value)=> {
        console.log(value);
        this.likedPosts=value
        console.log("fgh",this.likedPosts);
      },
      error:(err)=> {
        console.log(err);
      },
    })
    this.service.getMySaved().subscribe({
      next:(value)=> {
        console.log(value);
        this.savedPosts=value
        console.log("saved return",value);
        console.log("saved got",this.savedPosts);
      },
      error:(err)=> {
        console.log(err);
      },
    })
  }
  fnu(){
    if (!this.following){
      this.follow()
    }
    else{
      this.unfollow()
    }
  }
  follow(){
    this.service.followUser(this.profileData.id).subscribe({
      next:(value)=> {
        console.log(value);
        this.following=true;
        this.profileData.profile.followersCount++;
        this.profileData.profile.followers.push(value);

      },
      error:(err)=> { 
        console.log(err);
      },
    })
  }
  unfollow(){
    this.service.unfollow(this.profileData.id).subscribe({
      next:(value)=> {
        console.log(value);
        this.following=false;
        this.profileData.profile.followersCount--;
        this.profileData.profile.followers=this.profileData.profile.followers.filter((i:any)=>i.userId!==value.userId);
      
      },
      error:(err)=> { 
        console.log(err);

      },
    })
  }
}
