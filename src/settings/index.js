export class SettingsIndex {
  constructor() {
    this.firstName = 'John';
    this.lastName = 'Doe';  
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  submit() {
    alert('Settings saved!');
  }
}
