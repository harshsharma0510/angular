import { Component, OnInit } from '@angular/core';
import{User, Customer, Role} from '../app/user.model'

class UserData {
  private userData: User[];
  private customerData: Customer[];
  private roleData: Role[];

  constructor() {
    this.userData = [];
    this.customerData = [];
    this.roleData = [];
    
  }
  getCustomerNameById(customerId: number): string {
    console.log('getCustomerNameById - customerId:', customerId);
    const customer = this.customerData.find((c) => c.id === customerId);
    console.log('getCustomerNameById - customer:', customer);
    return customer ? customer.name : '';
  }
  getRoleNameById(roleId: number): string {
    console.log('getRoleNameById - roleId:', roleId);
    const role = this.roleData.find((r) => r.id === roleId);
    console.log('getRoleNameById - role:', role);
    return role ? role.name : '';
  }


  getCustomerData(): Customer[] {
    return this.customerData;
  }

  getRoleData(): Role[] {
    return this.roleData;
  }

  async getCustomers(): Promise<Customer[]> {
    const response = await fetch('http://localhost:3000/api/customers');
    const data = await response.json();
    this.customerData = data;
    return this.customerData;
  }

  async getRoles(): Promise<Role[]> {
    const response = await fetch('http://localhost:3000/api/roles');
    const data = await response.json();
    this.roleData = data;
    return this.roleData;
  }

  async getAll(): Promise<User[]> {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    this.userData = data;
    return this.userData;
  }

  async create(user: User): Promise<void> {

    const { customer_id, role_id, role, ...rest } = user;
    const requestData = {
      ...rest,
      customer_id,
      role_id,
    };
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    if (response.ok) {
      const data = await response.json();
      data.customer_name = this.getCustomerNameById(data.customer_id);
      data.role_name = this.getRoleNameById(data.role_id);
      console.log('Processed data:', data);
      this.userData.push(data);
    } else {
      
      console.error('Error creating user:', response.status, response.statusText);
    }

  }

  async update(user: User): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const index = this.userData.findIndex((u) => u.id === data.id);
    if (index !== -1) {
      this.userData[index] = data;
    }
  }
  async deleteUserFromServer(userId: number): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error('Error deleting user:', response.status, response.statusText);
    }
  }
  

  async delete(id: number): Promise<void> {
    this.userData = this.userData.filter((u) => u.id !== id);
    try {
      await this.deleteUserFromServer(id);
      //this.userData = this.userData.filter((u) => u.id !== id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private userData: UserData = new UserData();
  private userTable: HTMLTableElement | null | undefined;
  private loadDataButton: HTMLButtonElement | null | undefined;
  private createUserButton!: HTMLButtonElement | null;

  ngOnInit(): void {
    this.init();
  }

  async init(): Promise<void> {
    await Promise.all([this.userData.getCustomers(), this.userData.getRoles()]);

    this.userTable = document.getElementById('userDataTable') as HTMLTableElement;
    this.loadDataButton = document.getElementById('loadDataButton') as HTMLButtonElement;
    this.createUserButton = document.getElementById('createUserButton') as HTMLButtonElement;

    this.loadDataButton!.addEventListener('click', this.loadData.bind(this));
    this.createUserButton!.addEventListener('click', this.createUser.bind(this));
  }

  async loadData(): Promise<void> {
    const data = await this.userData.getAll();
    this.renderTable(data);
    this.loadDataButton!.innerHTML = 'Refresh';
    this.loadDataButton!.removeEventListener('click', this.loadData);
    this.loadDataButton!.addEventListener('click', this.refreshData.bind(this));
  }

  async refreshData(): Promise<void> {
    const data = await this.userData.getAll();
    this.renderTable(data);
  }

  renderTable(data: User[]): void {
    const tbody = this.userTable!.querySelector('tbody');
    tbody!.innerHTML = '';
    data.forEach((user) => {
      const row = this.createRow(user);
      tbody!.appendChild(row);
    });
  }

  createRow(user: User): HTMLTableRowElement {
    const row = document.createElement('tr');
    row.dataset['userId'] = user.id.toString();
    row.innerHTML = `
      <td>${user.first_name}</td>
      <td>${user.middle_name}</td>
      <td>${user.last_name}</td>
      <td>${user.email}</td>
      <td>${user.phone_number}</td>
      <td>${user.address}</td>
      <td>${user.customer_name}</td>
      <td>${user.role_name}</td>
      <td>${user.created_at}</td>
      <td>${user.modified_on}</td>
      <td>
        <button class="editButton">Edit</button>
        <button class="deleteButton">Delete</button>
      </td>
    `;
    const editButton = row.querySelector('.editButton') as HTMLButtonElement;
    const deleteButton = row.querySelector('.deleteButton') as HTMLButtonElement;
    editButton.addEventListener('click', this.editRow.bind(this, row, user));
    deleteButton.addEventListener('click', this.deleteRow.bind(this, row, user.id));
    return row;
  }

  editRow(row: HTMLTableRowElement, user: User): void {
    row.classList.add('editing');
    this.createEditableRow(row, user);
  }

  createEditableRow(row: HTMLTableRowElement, user: User): void {
    row.innerHTML = `
      <td><input type="text" name="first_name" value="${user.first_name}" placeholder =" First Name"></td>
      <td><input type="text" name="middle_name" value="${user.middle_name}" placeholder =" Middle Name"></td>
      <td><input type="text" name="last_name" value="${user.last_name}" placeholder ="Last Name"></td>
      <td><input type="text" name="email" value="${user.email}" placeholder ="Email"></td>
      <td><input type="text" name="phone_number" value="${user.phone_number}" placeholder ="Phone Number"></td>
      <td><input type="text" name="address" value="${user.address}" placeholder ="Address"></td>
      <td>
        <select name="customer_id">
        <option value="0" disabled selected>Select Customer</option>
          ${this.userData.getCustomerData().map(customer => `<option value="${customer.id}"${customer.id === user.customer_id ? ' selected' : ''}>${customer.name}</option>`).join('')}
        </select>
      </td>
      <td>
        <select name="role_id">
        <option value="0" disabled selected>Select Role</option>
          ${this.userData.getRoleData().map(role => `<option value="${role.id}"${role.id === user.role_id ? ' selected' : ''}>${role.name}</option>`).join('')}
        </select>
      </td>
      <td>${user.created_at}</td>
      <td>${user.modified_on}</td>
      <td>
        <button class="saveButton">Save</button>
        <button class="cancelButton">Cancel</button>
      </td>
    `;
    const saveButton = row.querySelector('.saveButton') as HTMLButtonElement;
    const cancelButton = row.querySelector('.cancelButton') as HTMLButtonElement;
    saveButton.addEventListener('click', this.saveRow.bind(this, row, user));
    cancelButton.addEventListener('click', this.cancelEdit.bind(this, row, user));
  }

  async saveRow(row: HTMLTableRowElement, user: User): Promise<void> {
    user.first_name = (row.querySelector('input[name="first_name"]') as HTMLInputElement).value;
    user.middle_name = (row.querySelector('input[name="middle_name"]') as HTMLInputElement).value;
    user.last_name = (row.querySelector('input[name="last_name"]') as HTMLInputElement).value;
    user.email = (row.querySelector('input[name="email"]') as HTMLInputElement).value;
    user.phone_number = (row.querySelector('input[name="phone_number"]') as HTMLInputElement).value;
    user.address = (row.querySelector('input[name="address"]') as HTMLInputElement).value;

    const customerSelect = row.querySelector('select[name="customer_id"]') as HTMLSelectElement;
    const roleSelect = row.querySelector('select[name="role_id"]') as HTMLSelectElement;

    user.customer_id = parseInt(customerSelect.value, 10);
    user.customer_name = customerSelect.options[customerSelect.selectedIndex].text;
    user.role_id = parseInt(roleSelect.value, 10);
    user.role_name = roleSelect.options[roleSelect.selectedIndex].text;
    user.role = roleSelect.value;

    await this.userData.create(user);
    row.classList.remove('editing');
    const newRow = this.createRow(user);
    const editButton = newRow.querySelector('.editButton') as HTMLButtonElement;
    const deleteButton = newRow.querySelector('.deleteButton') as HTMLButtonElement;
    editButton.addEventListener('click', this.editRow.bind(this, newRow, user));
    deleteButton.addEventListener('click', this.deleteRow.bind(this, newRow, user.id));
    row.parentNode!.replaceChild(newRow, row);
  }

  cancelEdit(row: HTMLTableRowElement, user: User): void {
    row.classList.remove('editing');
    const newRow = this.createRow(user);
    const editButton = newRow.querySelector('.editButton') as HTMLButtonElement;
    const deleteButton = newRow.querySelector('.deleteButton') as HTMLButtonElement;
    editButton.addEventListener('click', this.editRow.bind(this, newRow, user));
    deleteButton.addEventListener('click', this.deleteRow.bind(this, newRow, user.id));
    row.parentNode!.replaceChild(newRow, row);
  }

  async deleteRow(row: HTMLTableRowElement, userId: number): Promise<void> {
    await this.userData.delete(userId);
    if (row && row.parentNode) {
    row.parentNode!.removeChild(row);
    }
  }
  

  async createUser(): Promise<void> {
    const emptyUser: User = {
      id: 0,
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      customer_id: 0,
      customer_name: '',
      role_id: 0,
      role_name: '',
      created_at: new Date(),
      modified_on: new Date(),
      role:''
    };
    
    const newRow = this.createRow(emptyUser);

    const tbody = this.userTable!.querySelector('tbody');
    tbody!.insertBefore(newRow, tbody!.firstChild);

    const cancelButton = newRow.querySelector('.cancelButton') as HTMLButtonElement;
    if (cancelButton) {
      cancelButton.addEventListener('click', () => this.cancelCreate(newRow, emptyUser));
    }
    this.editRow(newRow, emptyUser);
    
  }

  cancelCreate(row: HTMLTableRowElement, user: User): void {
    if (user.id === 0) {
      row.parentNode!.removeChild(row);
    } else {
      row.classList.remove('editing');
      const newRow = this.createRow(user);
      const editButton = newRow.querySelector('.editButton') as HTMLButtonElement;
      const deleteButton = newRow.querySelector('.deleteButton') as HTMLButtonElement;
      editButton.addEventListener('click', () => this.editRow(newRow, user)); 
      deleteButton.addEventListener('click', () => this.deleteRow(newRow, user.id)); 
      row.parentNode!.replaceChild(newRow, row);
    
    }
  }
}
