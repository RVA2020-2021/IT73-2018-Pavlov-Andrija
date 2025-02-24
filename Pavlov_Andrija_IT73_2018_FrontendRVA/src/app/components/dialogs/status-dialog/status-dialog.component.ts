import { Subscription } from 'rxjs';
import { StatusService } from './../../../services/status.service';

import { Status } from './../../../models/status';

import { Component, OnInit, Inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  public flag: number;
  subscription: Subscription;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StatusDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Status,
              public statusService: StatusService ) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public add(): void {
    this.subscription = this.statusService.addStatus(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspesno dodat status: ' + this.data.naziv , 'U redu', {
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name + '--->' + error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
        duration: 2500
      });
    };
  }


  public update(): void {
    this.subscription = this.statusService.updateStatus(this.data)
    .subscribe(data => {
      this.snackBar.open('Uspesno modifikovan status: ' + data.naziv, 'U redu', {
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name + '--->' + error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
        duration: 2500
      });
    };
  }

  public delete(): void {
    this.subscription = this.statusService.deleteStatus(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspesno obrisan status: ', 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '--->' + error.message);
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
          duration: 2500
      });
    };
  }


  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena!', 'U redu', {
      duration: 1000
    });
  }


}
