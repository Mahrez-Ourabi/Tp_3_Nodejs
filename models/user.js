//create model of user document
const mongoose = require ("mongoose")
//on a user donc il a besoin d'un password qui doit etre haché , on va le haché avec la bib bcrypt
const bcrypt = require('bcrypt');//bch tkhalina naamlou mdp haché
const userSchema = new mongoose.Schema({
    username:{type:String,unique:true}, //unique:true yaani yetaawedch
    password:String
})

//kif tebda aadna méthode bchtaaml traitement me tetaada ll baaed ella me tji l réponse heki : await
//une méthode qui a "await" elle va avoir de maniere automatique "async"
//async : testanna chway waqt 
//promessse: khayeb wela behy rani bch nrajaalk haja


//Middleware de hachage du mot de passe avant la sauvegarde :
//mehech  best practice bch naamlou hachage f wost service donc naamlouh
userSchema.pre('save', async function(next){
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});


//explication :
/* userSchema.pre('save', ...) signifie que cette fonction middleware doit être exécutée avant que la méthode save soit appelée sur un document utilisateur.
La fonction middleware utilise async function(next) pour gérer des opérations asynchrones avec await.
this fait référence à l'instance du modèle utilisateur qui est sur le point d'être sauvegardée.
user.isModified("password") vérifie si le champ du mot de passe a été modifié. Cela est souvent utilisé pour éviter de ré-hasher le mot de passe à chaque sauvegarde, même si d'autres champs du document ont été modifiés.
Si le mot de passe a été modifié, la fonction utilise bcrypt.hash pour hacher le mot de passe avant de le sauvegarder dans la base de données. 10 est le coût du hachage, qui détermine le nombre d'itérations pour renforcer la sécurité du hachage.
Enfin, next() est appelé pour indiquer à Mongoose de continuer le processus de sauvegarde après l'exécution de cette fonction middleware.

*/
const User = mongoose.model('User',userSchema)//aamlna alias yaani kol me nahkiw aal collection User noqsdou bih userSchema

module.exports = User; //n'exporti l collection bch najm nestaamlouµ