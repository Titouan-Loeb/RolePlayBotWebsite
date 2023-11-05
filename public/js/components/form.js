const Character = require('../schema/characters.schema.js');
const mongoose = require('mongoose');

const saveCharacter = async (body) => {
    const newCharacter = await new Character({
        _id: new mongoose.Types.ObjectId(),
        owner: "test",
        characterName: body.name,
        imageURL: body.imageURL,
        description: body.description,
        po: body.gold,
        pv: 7,
        competences: {
            force: body.force,
            mentir_convaincre: body.mentir_convaincre,
            intelligence: body.intelligence,
            courir_sauter: body.courir_sauter,
            perception: body.perception,
            connaissance: body.connaissance,
            dexterite: body.dexterite,
            combat: body.combat,
            discretion: body.discretion,
        }
    });

    await newCharacter.save().then(() => {
        console.log(`Character '${newCharacter.characterName}' created by '${newCharacter.owner}' was saved`);
    }).catch(console.error);
}

module.exports = saveCharacter;