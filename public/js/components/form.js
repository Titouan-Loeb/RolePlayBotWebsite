const Character = require("../schema/characters.schema.js");
const mongoose = require("mongoose");

const saveCharacter = async (req, res) => {
  const body = req.body;
  const newCharacter = await new Character({
    _id: new mongoose.Types.ObjectId(),
    owner: body.owner,
    characterName: body.name,
    imageURL: body.imageURL,
    description: body.description,
    po: body.gold,
    pv: body.pv,
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
    parseInt(body.force) +
    parseInt(body.mentir_convaincre) +
    parseInt(body.intelligence) +
    parseInt(body.courir_sauter) +
    parseInt(body.perception) +
    parseInt(body.connaissance) +
    parseInt(body.dexterite) +
    parseInt(body.combat) +
    parseInt(body.discretion);

  if (sum !== 45) {
    res.render("form/form", {
      owner: newCharacter.owner,
      error: `La somme des compétences doit être égale à 45, la votre et de ${sum}`,
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
    .catch((error) => {
      console.error(error);
      res.render("form/error");
      return;
    });
  res.render("form/success");
};

module.exports = saveCharacter;
