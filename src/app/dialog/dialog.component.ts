import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  workItemForm !: FormGroup;
  actionBtn: string = "Save";

  // inject API service in here:
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.workItemForm = this.formBuilder.group({
      points: ['', Validators.required],
      equipmentNumber: ['', Validators.required],
      status: ['', Validators.required],
      technician: ['', Validators.required],
      notes: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.workItemForm.controls['points'].setValue(this.editData.points)
      this.workItemForm.controls['equipmentNumber'].setValue(this.editData.equipmentNumber)
      this.workItemForm.controls['status'].setValue(this.editData.status)
      this.workItemForm.controls['technician'].setValue(this.editData.technician)
      this.workItemForm.controls['notes'].setValue(this.editData.notes)
    }
  }

addJob() {

  if (!this.editData){
    if (this.workItemForm.valid) {
      this.api.postJob(this.workItemForm.value)
        .subscribe({
          next: (res) => {
            alert("Job added successfully");
            this.workItemForm.reset();
            this.dialogRef.close('save');
          },

          error: () => {
            alert("Error while adding the job")
          }
        }
        )
    }
  }else{
  this.updateJob()
}
}

updateJob(){
 this.api.putJob(this.workItemForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
         alert("Job updated successfully!");
         this.workItemForm.reset();
         this.dialogRef.close('update');
       },
      error: () => {
        alert("Error while updating the job")
      }
    })
 }
}
