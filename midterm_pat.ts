interface ResortInterface {
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
abstract class Resort implements ResortInterface {

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

  checkIn(): string {
    return(`${this.guestName} successfullly checked in!`);
  }
  checkOut(): string {
    return(`${this.guestName} successfullly checked out!`)
  }
  confirmReservation(): void {
    this.withReservation === true ? (this.SeatingCapacity-this.totalGuests) : this.SeatingCapacity;
  }
  cancelReservation(): void {
    this.withReservation === true ? (this.SeatingCapacity + this.totalGuests) : this.SeatingCapacity;
  }
  
  verifyIdentification(): string {
    if (this.identification === true)
    { return('Verified')} 
    else
    {return ('Unfortunately we cannot accomodate you.')}
  }
  
  displayBill(Bill:number): string {
    return (`
    Guest Name: ${this.guestName}
    Total Bill: ${Bill}`)
  }
  checkParkingAvailability(parking: number):boolean {
    if (this.ParkingLotCapacity === parking) {
      return false
    } else {
      return true
    }
  }
  checkAdditionalCharges(): number {
    return 0
  }
  checkForDiscount():number {
    return 0
  }
  checkAvailablity(): boolean {
    return true
  }
  checkPaymentMethod(): string {
    return (`Payment methods here.`)
  }
  billOut(TotalMoney: number): string {
    return (`You paid Php ${TotalMoney}.`)
  }
  
  needOfAssistance(): boolean {
    if (this.guestAge >= 60) {
      return true;
    } else if (this.pwd === true) {
      return true;
    } else {
      return false;
    }
  }

}

class Recreation extends Resort {

  confirmReservation(): void {
      this.withReservation === true ? this.SeatingCapacity - this.totalGuests : this.SeatingCapacity;
  }

  cancelReservation(): void {
      this.withReservation === false ? this.SeatingCapacity + this.totalGuests : this.SeatingCapacity;
  }
  
  checkAccomodation(accomodation: string): any {

  }

  calculateAccomodationFee(): number {
    if ( this.checkAccomodation('room') ) {
      return 1500;
    } else if ( this.checkAccomodation('small cottage') ) {
      return 250;
    } else if ( this.checkAccomodation('regular cottage') ) {
      return 500;
    } else if ( this.checkAccomodation('large cottage') ) {
      return 1000;
    } else {
      return 0;
    }
  }

  checkForOutsideFood(food: boolean): any {
    
  }

  checkActivity(activity: string): any {

  }

  calculateActivityFee(): number {
    let activityFee: number = 0;
    if (this.checkActivity('swim')) {
      activityFee = 80;
    } else if ( this.checkActivity('hike')) {
      activityFee = 100;
    } else if (this.checkActivity('mountain climb')) {
      activityFee = 200; 
    }

    return activityFee;
  }

  verifyIdentification(): string {
    if ( this.identification === true ) {
      return 'Verified';
    } else {
      return 'Unfortunately we cannot verify your identity and cannot permit you entry into the resort';
    }
  }
  
  checkForDiscount(): number {
    let age = this.guestAge;
    let discount: number = 0;

    if ( age <= 2 ) {
      discount = 0.30;
    } else if (age <= 10 && age > 2) {
      discount = 0.24;
    } else if (age >= 60) {
      discount = 0.50;
    }

    return discount;
  }

  checkAdditionalCharges(): number {
    let additionalCharges: number;
    
    if ( this.checkForOutsideFood(false) ) {
      additionalCharges = 0;
    } else {
      additionalCharges = 150;
    }

    return additionalCharges;
  }

  calculateTotalAmmount(): number {
      let totalPayment:number = (this.totalGuests * 100 - this.checkForDiscount()) + this.checkAdditionalCharges() 
      + this.calculateActivityFee() + this.calculateAccomodationFee();

      return totalPayment;
  }

  DisplayBill(): string {
    return (`
    Name: ${this.guestName}
    Discount: ${this.checkForDiscount}
    Total: ${this.calculateTotalAmmount()}
    `);
  }

  billOut(TotalMoney: number): string {
    if (TotalMoney != this.calculateTotalAmmount()) {
      if (TotalMoney < this.calculateTotalAmmount()) {
        return `You are missing ${this.calculateTotalAmmount() - TotalMoney} from your payment`
      }
      else {
        return `You paid ${TotalMoney} and you have a change of ${TotalMoney - this.calculateTotalAmmount()}`
      }
    } else {
      return `You paid ${TotalMoney} and you have a change of ${TotalMoney - this.calculateTotalAmmount()}`
    }
  
  }
  
}

const Joker = new Recreation('Pat', 20, '09519903342', 1, true, false, false, false, 'cash', false, false, 100, 50)

console.log(Joker.checkAccomodation('room'));
console.log(Joker.checkForOutsideFood(true));
console.log(Joker.checkActivity('swim'));
console.log(Joker.DisplayBill());
console.log(Joker.billOut(10000));