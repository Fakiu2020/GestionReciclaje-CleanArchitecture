import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../shared/helpers/must-match';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { IdentificationTypeService } from '../../../shared/services/identificationType.service';
import { RoleService } from '../../../shared/services/role.service';
import { Plant } from '../../../shared/models/plant';
import { PlantService } from '../../../shared/services/plant.service';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { RolesService } from '../../../shared/services/roles.service';
import { PlantFilter } from '../../../shared/models/plantFilter';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  user: User;
  roles: any = [];
  plants: Plant[];
  constructor(private route: ActivatedRoute, private plantService: PlantService, private router: Router, private fb: FormBuilder,
    private userService: UserService, private alertService: AlertifyService,
    private rolesSerice: RolesService) { }



  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = (data.user);
      this.createUpdateForm();
      this.getAllPlant();
      this.getAllRoles();

    });
  }

  createUpdateForm() {
    this.editUserForm = this.fb.group(
      {
        id: [this.user.id, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        phoneNumber: [this.user.phoneNumber],
        plantId: [this.user.plantId],
        roles: [this.user.roles]
      }
    );
  }
  get f() { return this.editUserForm.controls; }

  updateUser() {
    if (this.editUserForm.invalid) { return; }
    this.user = Object.assign({}, this.editUserForm.value);
    this.user.roles = this.getRolesSelected();
    this.userService.updateUser(this.user).subscribe(next => {
    }, error => {
      this.alertService.error(error);
    }, () => {
      this.alertService.success('Modified Successfully');
    });
  }

  getRolesSelected() {
    const result = [];
    this.roles.forEach((value, key: string) => {
      if (value.checked === true) {
        result.push(value.name);
      }
    });
    return result;
  }

  getAllRoles() {
    this.rolesSerice.getAllRoles().subscribe(data => {
      this.roles = data.roles;
    }, error => {
      this.alertService.error(error);
    }, () => {
      this.matchRoles();
    });
  }

  cancel() {
    this.router.navigate(['/users']);
  }

  matchRoles() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.user.roles.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.roles.length; j++) {
        if (this.user.roles[i] === this.roles[j].name) {
          this.roles[j].checked = true;
          break;
        }
      }
    }
  }

  getAllPlant() {
    const filter = new PlantFilter();
    filter.pageSize = 100;
    this.plantService.getAll(filter).subscribe(data => {
      this.plants = data.entity;
    }, error => {
      this.alertService.error(error);
    });
  }

}

