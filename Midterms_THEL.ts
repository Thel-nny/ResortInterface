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