function createAccount(pin, amount = 0) {
  return {
    balance: amount,
    checkBalance(enteredPin) {
      if (enteredPin === pin) {
        return `$${this.balance}`;
      } else {
        return "Invalid PIN.";
      }
    },
    deposit(enteredPin, depositAmt) {
      if (enteredPin !== pin) {
        return "Invalid PIN.";
      } else {
        this.balance += depositAmt;
        return `Successfully deposited $${depositAmt}. Current balance: $${this.balance}.`;
      }
    },
    withdraw(enteredPin, withdrawalAmt) {
      if (enteredPin !== pin) {
        return "Invalid PIN.";
      }
      if (withdrawalAmt <= this.balance) {
        this.balance -= withdrawalAmt;
        return `Successfully withdrew $${withdrawalAmt}. Current balance: $${this.balance}.`;
      } else {
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
      }
    },
    changePin(enteredOldPin, newPin) {
      if (enteredOldPin !== pin) {
        return "Invalid PIN.";
      } else {
        pin = newPin;
        return "PIN successfully changed!";
      }
    }
  };
}

module.exports = { createAccount };
