interface ResortEstablishments {
  guestName: string;
  guestAge: number;
  telephoneNumber: string;
  totalGuests: number;
  identification: boolean;
  withPets: boolean;
  withTransportation: boolean;
  withProhibitedObjects: boolean;
  paymentMethod: string;
  withReservation: boolean;
  pwd: boolean;
  SeatingCapacity: number;
  ParkingLotCapacity: number;

  
  checkIn(): string;
  checkOut(): string;
  confirmReservation():void;
  cancelReservation(): void;
  verifyIdentification():void;
  displayBill(Bill:number): string;
  checkParkingAvailability(parking: number):boolean;
  checkAdditionalCharges(): number;
  checkForDiscount(): number;
  checkAvailablity(): boolean;
  checkPaymentMethod(): string;
  billOut(TotalMoney: number): string;
  needOfAssistance(): boolean;

}

//parent class
abstract class Resort implements ResortEstablishments {

public guestName: string;
public guestAge: number;
public telephoneNumber: string;
public totalGuests: number;
public identification: boolean;
public withPets: boolean;
public withTransportation: boolean;
public withProhibitedObjects: boolean;
public paymentMethod: string;
public withReservation: boolean;
public pwd: boolean;
public SeatingCapacity: number;
public ParkingLotCapacity: number;

constructor (
  guestName: string,
  guestAge: number,
  telephoneNumber: string,
  totalGuests: number,
  identification: boolean,
  withPets: boolean,
  withTransportation: boolean,
  withProhibitedObjects: boolean,
  paymentMethod: string,
  withReservation: boolean,
  pwd: boolean,
  SeatingCapacity: number,
  ParkingLotCapacity: number,
){
  this.guestName = guestName;
  this.guestAge = guestAge;
  this.telephoneNumber = telephoneNumber;
  this.totalGuests = totalGuests;
  this.identification = identification;
  this.withPets = withPets;
  this.withTransportation = withTransportation;
  this.withProhibitedObjects = withProhibitedObjects;
  this.paymentMethod = paymentMethod;
  this.withReservation = withReservation;
  this.pwd = pwd;
  this.SeatingCapacity = SeatingCapacity;
  this.ParkingLotCapacity = ParkingLotCapacity;
}

public checkIn(): string {
  return(`${this.guestName} successfullly checked in!`);
}
public checkOut(): string {
  return(`${this.guestName} successfullly checked out!`)
}
public confirmReservation(): void {
  this.withReservation === true ? (this.SeatingCapacity-this.totalGuests) : this.SeatingCapacity;
}
public cancelReservation(): void {
  this.withReservation === true ? (this.SeatingCapacity + this.totalGuests) : this.SeatingCapacity;
}

public verifyIdentification(): string {
  if (this.identification === true)
  { return('Verified')} 
  else
  {return ('Unfortunately we cannot accomodate you.')}
}

public displayBill(Bill:number): string {
  return (`
  Guest Name: ${this.guestName}
  Total Bill: ${Bill}`)
}
public checkParkingAvailability(parking: number):boolean {
  if (this.ParkingLotCapacity === parking) {
    return false
  } else {
    return true
  }
}
public checkAdditionalCharges(): number {
  return 0
}
public checkForDiscount():number {
  return 0
}
public checkAvailablity(): boolean {
  return true
}
public checkPaymentMethod(): string {
  return (`Payment methods here.`)
}
public billOut(TotalMoney: number): string {
  return (`You paid Php ${TotalMoney}.`)
}

public needOfAssistance(): boolean {
  if (this.guestAge >= 60) {
    return true;
  } else if (this.pwd === true) {
    return true;
  } else {
    return false;
  }
}

}

// child classes
class Hotel extends Resort {

public rooms: number;
public hotelPayments: string; 
public numOfDays: number;

constructor (guestName: string,
  guestAge: number,
  telephoneNumber: string,
  totalGuests: number,
  identification: boolean,
  withPets: boolean,
  withTransportation: boolean,
  withProhibitedObjects: boolean,
  paymentMethod: string,
  withReservation: boolean,
  pwd: boolean,
  SeatingCapacity: number,
  ParkingLotCapacity: number,
  //additional attributes
  rooms: number, 
  hotelPayments: string,
  numOfDays: number){
  super(guestName,
    guestAge,
    telephoneNumber,
    totalGuests,
    identification,
    withPets,
    withTransportation,
    withProhibitedObjects,
    paymentMethod,
    withReservation,
    pwd,
    SeatingCapacity,
    ParkingLotCapacity)
  this.rooms = rooms;
  this.hotelPayments = hotelPayments;
  this.numOfDays = numOfDays;
}


public checkIn(): string {
  if (this.withProhibitedObjects === true) {
    return(`Sorry we cannot check you in!`);
  } else {
    this.rooms -= this.totalGuests;
  return(`${this.guestName} successfullly checked in!`);
  }
}

public checkOut(): string {
  this.rooms += this.totalGuests;
  return(`${this.guestName} successfullly checked out!`)
}

public confirmReservation(): void {
  this.withReservation === true ? (this.rooms-this.totalGuests)
  : this.rooms;
  console.log(`Reservation for ${this.guestName} has been confirmed.`)
}

public cancelReservation(): void {
  this.withReservation === true ? (this.rooms + this.totalGuests)
  : this.rooms;
  console.log(`Reservation for ${this.guestName} has been cancelled.`)
}

public checkPaymentMethod(): string {
  if (this.paymentMethod.includes(this.hotelPayments)) {
    return (`You can pay us though your ${this.paymentMethod}`)
  } else {
    return (`We accept payments thru ${this.hotelPayments}. Thank You!`)
  }
}

public checkForDiscount():number {
  let discount: number = 0;
  if (this.guestAge <= 5 && this.guestAge >= 60) {
    discount = 0.50
    console.log(`50% discount.`)
  } else if (this.guestAge >= 6 && this.guestAge >= 10){
    discount = 0.25
    console.log(`25% discount.`)
  } else if (this.pwd === true) {
    discount = 0.45
    console.log(`45% discount.`)
  } else {
    discount = 0
    console.log(`Not eligible for discount.`)
  }
  return discount;
}

private calculateBill(days = this.numOfDays): number {
  let bill: number =  days * 1000;
  let discount: number = bill * this.checkForDiscount();
  let totalBill: number = bill - discount;
  return totalBill;
}

public generateReceipt(): string {
  let bill: number =  this.numOfDays * 1000;
  let discount: number = bill * this.checkForDiscount();
  return (`
  Guest Name: ${this.guestName}
  Subtotal: ${bill} Php
  Discount: ${discount} Php
  
  TOTAL: ${this.calculateBill()} Php`)
}

public billOut(TotalMoney: number): string {
  if (TotalMoney === this.calculateBill()) {
    return (`Your payment of ${TotalMoney} Php was succesful.`)
  } else if (TotalMoney > this.calculateBill()) {
    let change: number = TotalMoney - this.calculateBill()
    return (`Your change is ${change} Php.`)
  } else {
    let balance: number = this.calculateBill() - TotalMoney
    return (`Your balance is ${balance}.`)
  }
}

public greetGuest(): string {
  return (`Welcome to our hotel. Please enjoy your stay!`)
}

public getGuestInfo(): string {
  return (`
  Guest Name: ${this.guestName}
  Contact Number: ${this.telephoneNumber}`)
}

public specialPromo(code: string) {
  if (code === "sanaolGABALIK") {
    console.log("You received 50% discount for your next stay with us!")
  } else {
    console.log("Invalid code.")
  }
}

}

let Okda = new Hotel (" Sarah J.", 18, "09271324597", 2,
true, true, false, false, "cash", true, false, 500, 200,
50, "cash, credit", 5)

console.log(Okda.checkIn());
console.log(Okda.checkOut());
Okda.confirmReservation();
Okda.cancelReservation();
console.log(Okda.checkPaymentMethod());
console.log(Okda.checkForDiscount());
console.log(Okda.generateReceipt());
console.log(Okda.billOut(10000));
console.log(Okda.greetGuest());
console.log(Okda.getGuestInfo());
console.log(Okda.specialPromo("sanaolGABALIK"));
