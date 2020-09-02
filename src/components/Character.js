import React from "react";

function Character(props) {
  return (
    <div className="text-center">
      <h1>{props.characterData.name}</h1>
      <p>
        {props.characterData.realm.name.en_US} {props.characterData.level}
      </p>
      <img src={props.mediaData.avatar_url} className="rounded" alt="avatar" />
      <p>Płeć: {props.characterData.gender.name.en_US}</p>
      <p>Frakcja: {props.characterData.faction.name.en_US}</p>
      <p>Rasa: {props.characterData.race.name.en_US}</p>
      <p>Klasa: {props.characterData.character_class.name.en_US}</p>
      <p>Specjalizacja: {props.characterData.active_spec.name.en_US}</p>
    </div>
  );
}

export default Character;
