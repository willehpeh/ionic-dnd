const functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addUserToDb = functions.auth.user().onCreate(
  (event) => {
    let email = event.data.email;
    let uid = event.data.uid;
    let newUser = {
      email: email,
      name: ''
    };
    admin.database().ref('users/' + uid).set(newUser);
  }
);

exports.indexSpellClasses = functions.database.ref('spells/all-spells/{pushId}').onWrite(
  (event) => {
    let data = event.data.val();
    let pushId = event.params.pushId;
    if(data.availableTo.bard) {
      admin.database().ref('spells/bard/' + pushId).set(true);
    }
    if(data.availableTo.cleric) {
      admin.database().ref('spells/cleric/' + pushId).set(true);
    }
    if(data.availableTo.druid) {
      admin.database().ref('spells/druid/' + pushId).set(true);
    }
    if(data.availableTo.paladin) {
      admin.database().ref('spells/paladin/' + pushId).set(true);
    }
    if(data.availableTo.ranger) {
      admin.database().ref('spells/ranger/' + pushId).set(true);
    }
    if(data.availableTo.sorcerer) {
      admin.database().ref('spells/sorcerer/' + pushId).set(true);
    }
    if(data.availableTo.warlock) {
      admin.database().ref('spells/warlock/' + pushId).set(true);
    }
    if(data.availableTo.wizard) {
      admin.database().ref('spells/wizard/' + pushId).set(true);
    }
}
)
