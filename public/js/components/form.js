const Character = require("../schema/characters.schema.js");
const mongoose = require("mongoose");

const saveCharacter = async (req, res) => {
  const body = req.body;
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
    },
  });

  const sum =
    newCharacter.force +
    newCharacter.mentir_convaincre +
    newCharacter.intelligence +
    newCharacter.courir_sauter +
    newCharacter.perception +
    newCharacter.connaissance +
    newCharacter.dexterite +
    newCharacter.combat +
    newCharacter.discretion;

  if (sum !== 45) {
    res.render("form", {
      error:
        "La somme des compétences doit être égale à 45, la votre et de " +
        sum +
        ".",
    });
    return;
  }

  await newCharacter
    .save()
    .then(() => {
      console.log(
        `Character '${newCharacter.characterName}' created by '${newCharacter.owner}' was saved`
      );
    })
    .catch(console.error);
};

module.exports = saveCharacter;
