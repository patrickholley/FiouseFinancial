export default class Budget {
  constructor(id, userId, name, lengthType, balance) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.lengthType = lengthType;
    this.balance = balance;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      lengthType: this.lengthType,
      balance: this.balance,
    };
  }

  static fromJSON(obj) {
    return new this(obj);
  }
}
