const fs = require('fs');

const firstNameMale = ['John', 'Steve', 'Tom', 'Jacob'];
const lastNameMale = ['Doe', 'Hanks', 'Johnson', 'Jobs'];

const firstNameFemale = ['Christina', 'Marry', 'Marie', 'Dixy'];
const lastNameFemale = ['Aguilera', 'Potter', 'Johnson', 'Loco'];

const identities = [];

for(let i = 0; i < 20; i++){
  const random = Math.random();

  const gender = random > 0.5 ? 'M' : 'F';
  const firstName = gender === 'M' ? firstNameMale[Math.floor(Math.random()*firstNameMale.length)] : firstNameFemale[Math.floor(Math.random()*firstNameMale.length)];
  const lastName = gender === 'M' ? lastNameMale[Math.floor(Math.random()*firstNameMale.length)] : lastNameFemale[Math.floor(Math.random()*firstNameMale.length)];
  const age = Math.floor(Math.random() * (99 - 18 + 1) + 18);

  identities.push({
    gender,
    firstName,
    lastName,
    age,
  })
}

const dataJSON = JSON.stringify(identities);

fs.writeFile('people.json', dataJSON, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});