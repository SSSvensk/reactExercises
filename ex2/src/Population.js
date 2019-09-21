import {Person, MaritalStatus} from './Person';

const FIRST_NAME_TEMPLATE = [
	["D", "R", "J"],
	["on", "aughn", "ey"],
	["", "ald", "os"]
];

const LAST_NAME_TEMPLATE = [
	["W", "C", "S"],
	["olver", "amp", "eig"],
	["sue", "ton", "son"]
];

const TOWN_TEMPLATE = [
	["Lon", "Wol", "Mil", "Til"],
	["", "tin", "ver"],
	["ton", "ton", "don", "ville", "burgh"]
];

const COUNTRIES = ["China", "India", "USA", "Japan", "Indonesia", "Nigeria"];

class Population {
	constructor(country) {
		this.country = country;
		this.seed = 1;
		for (var i = 0; i < country.length; i++) {
			var character = country.charCodeAt(i);
			this.seed = ((this.seed<<5)-this.seed)+character;
			this.seed = this.seed & this.seed; // Convert to 32bit integer
		}
	}
	
	/**
	 * Returns a person object and increases the current person index.
	 * Calling this method several times returns a new person object each time.
	 * 
	 * @return Person object that was next in the population
	 */
	nextPerson() {
		this.seed++;
		return this.getPerson();
	}

	/**
	 * Returns a person object and decreases the current person index.
	 * Calling this method several times returns a new person object each time.
	 * 
	 * @return Person that was previous in the population
	 */
	previousPerson() {
		this.seed--;
		return this.getPerson();
	}
	
	getPerson() {
		// RNG per Park & Miller, CACM, 1998, (31), 10 ("Minimal standard")
		let sd = (16807 * this.seed) % 2147483647;
		let nextInt = (bound) => {
			sd = (16807 * sd) % 2147483647; 
			return Math.floor((sd / 2147483647)*bound)
		};
		
		let r = new Person();
		r.firstName = "";
		for (let i in FIRST_NAME_TEMPLATE)
			r.firstName += FIRST_NAME_TEMPLATE[i][nextInt(FIRST_NAME_TEMPLATE[i].length)];
		r.lastName = "";
		for (let i in LAST_NAME_TEMPLATE)
			r.lastName += LAST_NAME_TEMPLATE[i][nextInt(LAST_NAME_TEMPLATE[i].length)];
		r.birthCountry = (nextInt(10)<9?this.country:COUNTRIES[nextInt(COUNTRIES.length)]);
		r.birthTown = "";
		for (let i in TOWN_TEMPLATE)
			r.birthTown += TOWN_TEMPLATE[i][nextInt(TOWN_TEMPLATE[i].length)];
		let bd = new Date(new Date().getMilliseconds() - (24*60*60*1000*nextInt(100*365)));
		r.birthYear = bd.getFullYear();
		r.birthMonth = bd.getMonth()+1;
		r.birthDay = bd.getDate();
		let keys = Object.keys(MaritalStatus);
		r.maritalStatus = MaritalStatus[keys[nextInt(keys.length)]];
		return r;
	}
}

export default Population;