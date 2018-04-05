

let students = [
	{
		first: "Angelica",
		last: "de Wit",
		day: 21,
		month: 12,
		gender: "dragon"
	},
	{
		first: "Nataly",
		last: "Garzon",
		day: 23,
		month: 11,
		gender: "unicorn"
	},
	{
		first: "Daniel",
		last: "McMillan",
		day: 30,
		month: 4,
		gender: "male"
	},
	{
		first: "Erin",
		last: "Miller",
		day: 7,
		month: 11,
		gender: "female"
	},
	{
		first: "Ashley",
		last: "Pollard",
		day: 24,
		month: 7,
		gender: "female"
	},
	{
		first: "Ekaterina",
		last: "Sudakova",
		day: 2,
		month: 3,
		gender: "female"
	},	
]


let winterBabies = students.filter(function(student) {
	if (student.month === 12) return true;
	if (student.month === 1) return true;
	if (student.month === 2) return true;
})
console.log('winter babies')
console.table(winterBabies);

/*


let fallBabies = students.filter(function(student) {
	if (student.month === 9) return true;
	if (student.month === 10) return true;
	if (student.month === 11) return true;
})
console.log('fall babies')
console.table( fallBabies );



let shortNamedStudents = students.filter(function (student) {
	if (student.first.length <= 6) return true
})
console.log('short named students')
console.table(shortNamedStudents )




let femaleStudents = students.filter(function (student) {
	if (student.gender === "female") return true	
})
console.log('female students')
console.table(femaleStudents )

*/

/*
const compareMonth = function(studentA, studentB) {
	if (studentA.month < studentB.month) {
		return -1
	} else if (studentA.month > studentB.month) {
		return 1
	} else {
		return 0
	}
}



const compareMonthAndDay = function(studentA, studentB) {
	if (studentA.month < studentB.month) {
		return -1
	} else if (studentA.month > studentB.month) {
		return 1
	} else { // same month
		if (studentA.day < studentB.day) {
			return -1
		} else if ( studentA.day > studentB.day) {
			return 1
		} else { // same month AND day
			return 0
		}
	}
}


students.sort( compareMonthAndDay )
console.log("students sorted by month and day")
console.table(students)
*/


let namesAndSalutations = students.map(function(student) {
	return student.first + " " + student.last;
})

console.table(namesAndSalutations)


