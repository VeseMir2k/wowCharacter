import React from "react";

class Character extends React.Component {
  render() {
    const { characterData, mediaData } = this.props;
    return (
      <div className="text-center">
        <h1>{characterData.name}</h1>
        <p>
          {characterData.realm.name.en_US} {characterData.level}
        </p>
        <img src={mediaData.avatar_url} className="rounded" alt="avatar" />
        <p>Płeć: {characterData.gender.name.en_US}</p>
        <p>Frakcja: {characterData.faction.name.en_US}</p>
        <p>Rasa: {characterData.race.name.en_US}</p>
        <p>Klasa: {characterData.character_class.name.en_US}</p>
        <p>Specjalizacja: {characterData.active_spec.name.en_US}</p>
      </div>
    );
  }
}

export default Character;
