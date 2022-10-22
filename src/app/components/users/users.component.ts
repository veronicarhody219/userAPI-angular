import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user';
import { Response } from '../../interface/response';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  response: Response;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers(15).subscribe((results) => {
      console.log(results);

      this.response = results;
    });
  }
}
