import {Component, OnInit} from '@angular/core';
import {SalleService} from "../services/salle.service";
import {Salle} from "../models/salle.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit{
 public   messageError !:string;
  public salles:Salle[]=[];
  public salleForm!: FormGroup;
  public  ShownFormNewSalle=false;
 public  ShownFormAllSalles= true;
  public editingSalle: Salle | null = null;
  constructor( private serviceSalle:SalleService,private fb :FormBuilder) {
    // Initilaiser le formulaire réactif avec Validation
    this.salleForm = this.fb.group({
      capacite:[0,[Validators.required,Validators.min(1),Validators.max(10000000)]],
      disponibilite: [false, Validators.required],
      localisation: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }



  ngOnInit(): void {
    this.handleGetAllSalles();
  }

  handleGetAllSalles() {
    this.ShownFormAllSalles = true;
    this.serviceSalle.getAllSalles().subscribe({
      next: (data: Salle[]) => {
        this.salles = data.map(salle => {
          return {
            ...salle,
            id: salle.id || salle._id // Mappez correctement les identifiants
          };
        });
      },
      error: (err) => {
        this.messageError = err;
      }
    });
  }
  handleNewSalle() {
    if (this.editingSalle) {
      this.updateSalle();
    } else {
      this.createSalle();
    }
  }


  createSalle() {
    this.serviceSalle.createSalle(this.salleForm.value).subscribe({
      next: (data) => {
        this.handleGetAllSalles();
        this.ShownFormNewSalle = false;
        this.ShownFormAllSalles = true;
      },
      error: (err) => {
        this.messageError = err;
      }
    });
  }

  updateSalle() {
    if (this.editingSalle) {
      const updatedSalle: Salle = {
        id: this.editingSalle.id,
        capacite: this.salleForm.value.capacite,
        disponibilite: this.salleForm.value.disponibilite,
        localisation: this.salleForm.value.localisation,
        nom: this.salleForm.value.nom
      };

      this.serviceSalle.updateSalle(updatedSalle).subscribe({
        next: () => {
          this.handleGetAllSalles();
          this.resetForm();
          this.editingSalle = null;
          this.ShownFormAllSalles=true;
          this.ShownFormNewSalle=false;
        },
        error: (err) => {
          this.messageError = err;
        }
      });
    }
  }
  resetForm() {
    this.salleForm.reset({
      capacite: 0,
      disponibilite: false,
      localisation: "",
      nom: ""
    });
  }


  deleteSalle(salle: Salle) {
    if (confirm("Are you sure you want to delete this room?")) {
      if (salle.id && typeof salle.id === 'string') { // Check if salle.id exists and is a string
        this.serviceSalle.deleteSalle(salle.id).subscribe({
          next: () => {
            this.handleGetAllSalles();
          },
          error: (err) => {
            this.messageError = err;
          }
        });
      } else {
        console.error("Salle ID is not a string or is undefined.");
      }
    }
  }


  editSalle(salle: Salle) {
    this.editingSalle = salle;
    this.ShownFormAllSalles = false;
    this.ShownFormNewSalle = true;
    this.populateForm(salle);
  }

  populateForm(salle: Salle) {
    this.salleForm.patchValue({
      capacite: salle.capacite,
      disponibilite: salle.disponibilite,
      localisation: salle.localisation,
      nom: salle.nom
    });
  }
  newSalle():void{
      this.ShownFormAllSalles=false
      this.ShownFormNewSalle=true;
    this.salleForm.reset({
      capacite: 0,
      disponibilite: false,
      localisation: "",
      nom: ""
    });
    }

  getErrorMessage(fieldname: string, error: any) {
    if (error['required']) {
      return fieldname + ' est requis';
    } else if (error['minlength']) {
      return fieldname + ' doit comporter au moins ' + error['minlength']['requiredLength'] + ' caractères';
    } else if (error['maxlength']) {
      return fieldname + ' ne peut pas dépasser ' + error['maxlength']['requiredLength'] + ' caractères';
    } else if (error['min']) {
      return 'La valeur de ' + fieldname + ' doit être au moins ' + error['min']['min'];
    } else if (error['max']) {
      return 'La valeur de ' + fieldname + ' ne peut pas dépasser ' + error['max']['max'];
    }
    return '';
  }



  handlecancelCreation() {
    this.editingSalle = null;
    this.ShownFormNewSalle=false;
    this.ShownFormAllSalles=true;
    this.resetForm();
  }
}
