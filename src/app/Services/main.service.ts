import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';




@Injectable({
  providedIn: 'root'
})
export class MainService implements OnInit{

  constructor(public http:HttpClient,public cookie:CookieService) {
      this.setJwtToken(this.getJwtToken());
   }
   ngOnInit(): void {
     this.setJwtToken(this.getJwtToken());
   }

   searchPosts:any=[]
   isStoryEdit=false;
   isEdit=false;
   isEditProfile=false;
   isFollowerView=false;
   isFollowingView=false;
  //  isEditStory=false
   editShow(){
    this.isEdit=true
   }
   closeEdit(){
    this.isEdit=false;
   }
   editShowStory(){
    this.isStoryEdit=true
   }
   closeEditStory(){
    this.isStoryEdit=false;
   }
   editShowProfile(){
    this.isEditProfile=true
   }
   closeEditProfile(){
    this.isEditProfile=false;
   }
   showFollowerPannel(){
    this.isFollowerView=true
   }
   closeFollowerPannel(){
    this.isFollowerView=false;
   }
   showFollowingPannel(){
    this.isFollowingView=true
   }
   closeFollowingPannel(){
    this.isFollowingView=false;
   }
   loadingSearchedPosts=false
   cookieKey="savedPosts"
   jwtKey="jwtToken"
   jwtToken=""
   searchInput=""
   searchHandler(){
    this.loadingSearchedPosts=true
    if (this.searchInput.trim()!==''){
    
    }
    else{
        
    }
    
   }
  //   getSearchedPosts(){
  //   const searchInput=this.service.searchInput
  //   if (searchInput.trim()!==''){
  //      this.service.getSearchedPosts(searchInput).subscribe({
  //         next:(res)=>{
  //           console.log(res);
  //           this.searchPosts=res;
  //         }
  //         ,error:(err)=>{
  //           console.log(err)
            
  //         }
  //      })
  //   }
  // }
  //  option={
  //     headers: {
  //       Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"
  //     }
  //   }
    
   option={
      headers: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    }
    
  // getSavedPosts():Post[]{
  //   const cookiedata=this.cookie.get(this.cookieKey);
  //   return cookiedata?JSON.parse(cookiedata):[];
  //  }
  //  savePost(post: Post): void {
  //     const posts=this.getSavedPosts();
  //     const exists = posts.some((p: Post) => p.post_id === post.post_id);
  //     if (!exists){
  //       posts.push(post);
  //       this.savedPosts=posts
  //       this.cookie.set(this.cookieKey,JSON.stringify(posts),{expires:7,path:'/'})
  //     }
      

      
  //  }
   getMyLikes():Observable<any>{
    return this.http.get(`http://localhost:8080/api/likes/my-likes`,{
      headers:{
        "Authorization":`Bearer ${this.jwtToken}`
      }
    })

   }
   getMySaved():Observable<any>{
    return this.http.get(`http://localhost:8080/api/saved/my-saved`,{
      headers:{
        "Authorization":`Bearer ${this.jwtToken}`
      }
    })

   }
   getJwtToken(){
    const jwt_token=this.cookie.get(this.jwtKey);
    return jwt_token?jwt_token:'';
   }
   setJwtToken(token:string){
    this.cookie.set(this.jwtKey,token,{expires:7,path:"/"})
    this.jwtToken=token
   }
  //  reMoveSavePost(post:Post){
  //   const posts=this.getSavedPosts().filter((i:Post)=>i.post_id!=post.post_id)
  //   this.savedPosts=posts
  //   this.cookie.set(this.cookieKey,JSON.stringify(posts),{expires:7,path:'/'})
  //  }
   login(username:string,password:string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/auth/login`,{username,password})
   }
   
   register(username:string,password:string,fullname:string,email:string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/auth/register`,{username,password,fullname,email})
   }
   createPost(imageUrl:String,caption:String):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/posts/create`,{
      imageUrl,
      caption:caption?caption:'New Post'
    },{ headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }});
   }
   createStory(imageUrl:string):Observable<any>{
    return this.http.post(`http://localhost:8080/api/posts/story`,{imageUrl},{
       headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
    })
   }
   editMyProfile(userBio:string,profileImageUrl:string,fullname:string ):Observable<any>
{
  return this.http.put(`http://localhost:8080/api/user/edit-self`,{userBio,profileImageUrl,fullname},{
     headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
  })
}   
   createComment(id:string,commentText:string):Observable<any>
{
  return this.http.post(`http://localhost:8080/api/posts/${id}/comment`,{commentText},{
     headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
  })

}  
   followUser(id:string):Observable<any>
{
  return this.http.post(`http://localhost:8080/api/posts/follow/${id}`,'',{
     headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
  })

}  
   unfollow(id:string):Observable<any>
{
  return this.http.delete(`http://localhost:8080/api/posts/unfollow/${id}`,{
     headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
  })

}  
   getMe():Observable<any>
{
  return this.http.get(`http://localhost:8080/api/users/get-me`,{
     headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
  })

}   
  //  getAllPosts():Observable<any>{
 

  //   return this.http.get<any>(`https://apis.ccbp.in/insta-share/posts`,this.option)

  //  }
   getAllPosts():Observable<any>{
 
    console.log(this.jwtToken);
    return this.http.get<any>(`http://localhost:8080/api/posts`,{
      headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
    }

  
  
  
  )

   }
   getStories():Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/stories/all`,{
      "headers":{
        Authorization:`Bearer ${this.jwtToken}`
      }
    })
   }
  //  getStories():Observable<any>{
  //   return this.http.get<any>(`https://apis.ccbp.in/insta-share/stories`,this.option)
  //  }
   postLike(id:string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/posts/${id}/like`,{},{
      "headers":{
        Authorization:`Bearer ${this.jwtToken}`
      }
    });
   }
   savePost(id:string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/posts/${id}/save`,'',{
      "headers":{
        Authorization:`Bearer ${this.jwtToken}`
      }
    });
   }
   unsavePost(id:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/posts/${id}/unsave`,{
      "headers":{
        Authorization:`Bearer ${this.jwtToken}`
      }
    });
   }
   postUnLike(id:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/posts/${id}/unlike`,{
      "headers":{
        Authorization:`Bearer ${this.jwtToken}`
      }
    });
   }
  //  getSearchedPosts(searchInput:string):Observable<any[]>{
  //   return this.http.get<any[]>(`https://apis.ccbp.in/insta-share/posts?search=${searchInput}`,this.option)
  //  }
   getProfileData():Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/users/my-profile`,{
      headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
    }
)
   }
   getUserProfileData(userId:string):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/users/${userId}`,{
      headers:{
        Authorization:`Bearer ${this.jwtToken}`
      }
    }
)
   }
   deleteJwtKey(){
    this.cookie.delete(this.jwtKey);
   }
   
}

// {
//   "username": "rahul",
//   "password": "rahul@2021"
// }