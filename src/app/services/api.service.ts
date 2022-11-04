import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  // Alter this code to post to a web api. Current code posting to json server that I created.

  postJob(data: any){
    return this.http.post<any>("http://localhost:3000/workItemForm/", data);
  }

  getJob(){
    return this.http.get<any>("http://localhost:3000/workItemForm/");
  }

  putJob(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/workItemForm/" +id,data);

  }

  deleteJob(id:number){
    return this.http.delete<any>("http://localhost:3000/workItemForm/"+id);
  }

}


