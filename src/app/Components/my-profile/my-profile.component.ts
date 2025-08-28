import { Component, OnInit } from '@angular/core';
import { ProfileViewComponent } from '../../Gear/profile-view/profile-view.component';
import { MainService } from '../../Services/main.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  imports: [ProfileViewComponent,CommonModule,FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
    constructor(public service:MainService){}

    ngOnInit(): void {
      this.getProfileData()
      
    }
    profileData:any;
    imageUrl!:string;
    imageUrlStory!:string;
    caption!:string;
    userBio='';
    profileImageUrl='';
    fullname='';
    updateProfile(){
      this.service.editMyProfile(this.userBio,this.profileImageUrl,this.fullname).subscribe({
        next:(value)=> {
          console.log(value);
          this.profileData.profile.userBio=value.profile.userBio
        this.profileData.fullName=value.fullName
        this.profileData.profile.profileImageUrl=value.profile.profileImageUrl

        },
        error:(err)=>{
          console.log(err);
        }
      })
    }

    createPost(){
      if (!this.imageUrl) return;

      this.service.createPost(this.imageUrl,this.caption).subscribe({
        next:(value)=> {
          console.log(value);
          this.profileData.profile.posts.push(value)
          alert("new post created")
        },
        error:(err)=> {
          console.log(err);
        },
      })
    }
    createStory(){
      if(!this.imageUrlStory) return;
      this.service.createStory(this.imageUrlStory).subscribe({
        next:(value)=> {
          console.log(value);
          this.profileData.profile.stories.push(value)
          alert("new story created")
        },
        error:(err)=> {
          console.log(err);
        },
      })
    }
    getProfileData() {
    this.loading=true
    this.service.getProfileData().subscribe({
      next: (res) => {
        this.loading=false
        console.log(res);
        this.profileData = res;
        this.userBio=this.profileData.profile.userBio
        this.fullname=this.profileData.fullName
        this.profileImageUrl=this.profileData.profile.profileImageUrl
      },
      error: (err) => {
        this.loading=false
        console.log("we've got", err);
      },
    });
  }
    loading=false
    

}
