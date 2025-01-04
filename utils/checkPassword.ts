export class PasswordChecker {
  private password: string;

  constructor(password: string) {
    this.password = password;
  }

  isContainsUpperCase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  isContainsLowerCase(): boolean {
    return /[a-z]/.test(this.password);
  }

  isContainsNumeric(): boolean {
    return /[0-9]/.test(this.password);
  }

  isContainsSpecial(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  }

  isValidLength(): boolean {
    return this.password.length >= 8;
  }

  isValidPassword(): boolean {
    return (
      this.isContainsUpperCase() &&
      this.isContainsLowerCase() &&
      this.isContainsNumeric() &&
      this.isContainsSpecial() &&
      this.isValidLength()
    );
  }
}
