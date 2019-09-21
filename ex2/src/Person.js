const MaritalStatus = {"SINGLE": 0, "COHABITING": 1, "MARRIED_REGISTERED": 2, "WIDOW": 3};

class Person {
	constructor() {
		this.name = {first: null, last: null};
		this.birthDate = new Date();
		this.birthPlace = {town: null, country: null};
		this.marital = null;
	}
	
	toString() {
		let r = 
			(this.firstName!=null?this.firstName:"null") + " " + 
			(this.lastName!=null?this.lastName:"null") + ", born " +
			this.birthDay + "." + (this.birthMonth) + "." + this.birthYear + " in " +
			(this.birthTown!=null?this.birthTown:"null") + ", " + 
			(this.birthCountry!=null?this.birthCountry:"null");
		if (this.maritalStatus != null) {
			r += ", relationship status is ";
			switch (this.maritalStatus) {
				case MaritalStatus.COHABITING: 
					r += "living together";
					break;
				case MaritalStatus.MARRIED_REGISTERED: 
					r += "in registered relationship";
					break;
				case MaritalStatus.WIDOW: 
					r += "widowed";
					break;
				default: 
					r += "single";
			}
		}
		return r;
	}
	
	/**
	* Get the value of firstName
	*
	* @return the value of firstName
	*/
	get firstName() {
		return this.name.first;
	}
	
	/**
	* Set the value of firstName
	*
	* @param firstName new value of firstName
	*/
	set firstName(firstName) {
		this.name.first = firstName;
	}
	
	/**
	* Get the value of lastName
	*
	* @return the value of lastName
	*/
	get lastName() {
		return this.name.last;
	}
	
	/**
	* Set the value of lastName
	*
	* @param lastName new value of lastName
	*/
	set lastName(lastName) {
		this.name.last = lastName;
	}
	
	/**
	* Get the value of maritalStatus.
	*
	* @return the value of maritalStatus
	*/
	get maritalStatus() {
		return this.marital;
	}
		
	/**
	* Set the value of maritalStatus
	*
	* @param status new value of maritalStatus
	*/
	set maritalStatus(status) {
		this.marital = status;
	}
	
	/**
	* Get the value of birthCountry
	*
	* @return the value of birthCountry
	*/
	get birthCountry() {
		return this.birthPlace.country;
	}
	
	/**
	* Set the value of birthCountry
	*
	* @param birthCountry new value of birthCountry
	*/
	set birthCountry(birthCountry) {
		this.birthPlace.country = birthCountry;
	}
	
	/**
	* Get the value of birthTown
	*
	* @return the value of birthTown
	*/
	get birthTown() {
		return this.birthPlace.town;
	}
	
	/**
	* Set the value of birthTown
	*
	* @param birthTown new value of birthTown
	*/
	set birthTown(birthTown) {
		this.birthPlace.town = birthTown;
	}
	
	/**
	* Get the value of birth year.
	*
	* @return the year value of birthDate
	*/
	get birthYear() {
		return this.birthDate.getFullYear()
	}
	
	/**
	* Get the value of birth month, in range of 1..12.
	*
	* @return the month value of birthDate
	*/
	get birthMonth() {
		return this.birthDate.getMonth() + 1;
	}
	
	/**
	* Get the value of birth date, i.e., the number of day of month.
	*
	* @return the day of month value of birthDate
	*/
	get birthDay() {
		return this.birthDate.getDate();
	}
	
	/**
	* Set the year value of birthDate, other parts of the date remain the same.
	*
	* @param year int value of year to be set to birthDate
	*/
	set birthYear(year) {
		this.birthDate.setFullYear(year);
	}
	
	/**
	* Set the year value of birthDate, other parts of the date remain the same.
	*
	* @param month int value of month in range 1..12 to be set to birthDate
	*/
	set birthMonth(month) {
		this.birthDate.setMonth(month-1);
	}
	
	/**
	* Set the day of month value of birthDate, other parts of the date remain the same.
	*
	* @param day int value of day to be set to birthDate
	*/
	set birthDay(day) {
		this.birthDate.setDate(day);
	}
}

export {MaritalStatus, Person};
