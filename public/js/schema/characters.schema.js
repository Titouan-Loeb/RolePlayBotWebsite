const { Schema, model } = require('mongoose')

const CharactersSchema = new Schema({
    _id: Schema.Types.ObjectId,
    owner: { type: Schema.Types.String, required: true },
    characterName: { type: Schema.Types.String, required: true },
    imageURL: Schema.Types.String,
    description: String,
    po: { type: Schema.Types.Decimal128, required: true },
    pv: { type: Schema.Types.Number, minimum: 0, maximum: 7, required: true },
    competences: {
        type: new Schema({
            force: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
            mentir_convaincre: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
            intelligence: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
            courir_sauter: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
            perception: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
            connaissance: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
            dexterite: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
            combat: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
            discretion: { type: Schema.Types.Number, minimum: 0, maximum: 10, required: true },
        },
        { _id: false }),
        required: true,
    }
});

module.exports = model("GameMaster", CharactersSchema, "Characters");