import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SubApp';

  displayedColumns: string[] = ['points', 'equipmentNumber', 'status', 'technician','notes','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private api:ApiService){

  }
  ngOnInit(): void {
    this.getAllJobs();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllJobs();
      }
    })
  }

  editJob(row:any){

    this.dialog.open(DialogComponent,{

      width:"30%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllJobs();
      }
    })
    


  }

  getAllJobs(){
    this.api.getJob()
    .subscribe({
      next:(res)=>{
        
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the records...")
      }
    })
  }

  deleteJob(id:number){
    this.api.deleteJob(id)
    .subscribe({
      next:(res)=>{
        alert("job deleted successfully")
      },
      error:()=>{
        alert("Error while deleting the job")
      }
      })
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}
}
