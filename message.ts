//10 common attributes
//10 common methods

import { resolveObjectURL } from "buffer";

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
// Manang Peyt
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
    if (TotalMoney === this.calculateBill(this.numOfDays)) {
      return (`Your payment of ${TotalMoney} Php was succesful.`)
    } else if (TotalMoney > this.calculateBill(this.numOfDays)) {
      let change: number = TotalMoney - this.calculateBill(this.numOfDays)
      return (`Your change is ${change} Php.`)
    } else {
      let balance: number = this.calculateBill(this.numOfDays) - TotalMoney
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



//Pat
class Recreation extends Resort {

  public confirmReservation(): void {
      this.withReservation === true ? this.SeatingCapacity - this.totalGuests : this.SeatingCapacity;
  }

  public cancelReservation(): void {
      this.withReservation === false ? this.SeatingCapacity + this.totalGuests : this.SeatingCapacity;
  }
  
  public checkAccomodation(accomodation: string): any {

  }

  public calculateAccomodationFee(): number {
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

  public checkForOutsideFood(food: boolean): any {
    
  }

  public checkActivity(activity: string): any {

  }

  public calculateActivityFee(): number {
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

  public verifyIdentification(): string {
    if ( this.identification === true ) {
      return 'Verified';
    } else {
      return 'Unfortunately we cannot verify your identity and cannot permit you entry into the resort';
    }
  }
  
  public checkForDiscount(): number {
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

  public checkAdditionalCharges(): number {
    let additionalCharges: number;
    
    if ( this.checkForOutsideFood(false) ) {
      additionalCharges = 0;
    } else {
      additionalCharges = 150;
    }

    return additionalCharges;
  }

  public calculateTotalAmmount(): number {
      let totalPayment:number = (this.totalGuests * 100 - this.checkForDiscount()) + this.checkAdditionalCharges() 
      + this.calculateActivityFee() + this.calculateAccomodationFee();

      return totalPayment;
  }

  public DisplayBill(): string {
    return (`
    Name: ${this.guestName}
    Discount: ${this.checkForDiscount}
    Total: ${this.calculateTotalAmmount()}
    `);
  }

  public billOut(TotalMoney: number): string {
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

//thelnu
class Restaurant extends Resort{

  public checkIn(): string {
    if(this.verifyIdentification()=== 'Verified'){
    this.SeatingCapacity - this.totalGuests;
    this.SeatingCapacity != 0 ? console.log('You may take a seat') : console.log('Sorry we cannot seat you yet. Please wait for a few minutes');
    }
      return(`I'm sorry${this.guestName} we cannot seat you without verifying your identity.`);
  }

  public checkOut(): string {
    this.SeatingCapacity+= this.totalGuests;
    return ('Thank you for choosing us! Have a great day!');
  }

  public Reservation(): void {
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

  //override
  
  public checkAdditionalCharges(): number {
    let addedcharges = 0
    this.withPets === true ? addedcharges = 150 : addedcharges
    this.withProhibitedObjects === true ? addedcharges + 200 : addedcharges
    this.withReservation === true ? addedcharges + 200 : addedcharges
    return addedcharges
  }

  //overrides
  public checkForDiscount(): number {
    let age = this.guestAge;
    let discount: number = 0;
    if ( age <= 2 ) {
      discount += 2;
    } else if (age >= 60) {
      discount += 5;
    } else{
      discount
    }
    this.paymentMethod === 'card'? discount + 1.2 :discount
    this.pwd === true ? discount + 5 : discount
    return discount;
  }
  public checkAvailablity(): boolean {
    if (this.SeatingCapacity-this.totalGuests != 0){
      return true
    }
    return false
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

  public DisplayMenu(menu: number): void{
  let price = 0
  let menu1 = ['large fries ','2 Burgers,Drinks']
  let menu2 = ['Pizza ', 'Chicken Fingers ', 'Lassagna ','Cucumber Pitcher']
  let menu3 = ['Large bucket of Chicken ','Large Fries ', 'Strawberry milkshake']
  if (menu === 1){
    price = 280
    console.log(`You have odrered mealcombo ${menu1} 
    Your total Price is: ${price}`)
  }else if (menu === 2){
    price = 480
    console.log(`You have odrered mealcombo ${menu2} 
    Your total Price is: ${price}`)
  } else if (menu === 3){
    console.log(`You have odrered mealcombo ${menu3} 
    Your total Price is: ${price}`)
  }
  }
  
  public raffle():void{
    let rafflenumber: number = Math.floor(Math.random()*21)
    let Customernumber: number = Math.floor(Math.random()*21)
    if (rafflenumber === Customernumber){
      console.log(`Congratulations ${this.guestName}!! You Won 5 free Ice Cream Sundaes!`)
    }
    console.log(`Don't feel too bad ${this.guestName}, You can try again later.`)
  }
  
  
  public Calculatetotalbill(Order:number, Quantity:number, TOTALMONEY: number):string{
    let price:number = 0
    if(Order === 1){
      price = 280
    }else if (Order === 2){
      price === 480
    }
    else if (Order === 3){
      price = 380
    }
    let foodbill:number = price * Quantity
    let bill: number = TOTALMONEY - (foodbill + this.checkAdditionalCharges() - this.checkForDiscount()) + this.Alcohol()
    return (`Yiur total bill is: ${bill}`)
  }
  
  public Alcohol():number{
    if (this.guestAge >= 21){
      console.log(`Here is your glass of wine ${this.guestName}`)
      return 50
    }
    console.log('Sorry, you are below the age of 21. We cannot give you alcohol.')
    return 0
  }
  
  public Water():void{
    console.log(`Here is your glass of water ${this.guestName}`)
  }


}

const MacDoe = new Restaurant('Thel',21,'0992345221',12,true, true,true,false,'Cash',true,false,200,200)
MacDoe.checkIn()
MacDoe.DisplayMenu(1)
console.log(MacDoe.checkAdditionalCharges())
MacDoe.raffle()
console.log (MacDoe.Calculatetotalbill(1,3,2000))
MacDoe.Alcohol()
MacDoe.Water()