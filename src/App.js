import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form.js";
import Character from "./components/Character.js";
import Equipment from "./components/Equipment.js";

class App extends React.Component {
  state = {
    accessToken: "",
    name: "thomgnar",
    realm: "burning-legion",
    region: "EU",
    character: { data: null, isReady: false },
    mediaCharacter: { data: null, isReady: false },
    equipment: { data: null, isReady: false },
    mediaEquipment: { data: [], isReady: false },
    isReadyData: false,
  };

  // CLIENT_ID i CLIENT_SECRET na BASE64
  authorizationApi = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );

  fetchAPI = () => {
    fetch("https://us.battle.net/oauth/token", {
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${this.authorizationApi}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ accessToken: data.access_token });
      });
  };

  fetchCharacter = () => {
    fetch(
      `https://${this.state.region.toLowerCase()}.api.blizzard.com/profile/wow/character/${
        this.state.realm
      }/${
        this.state.name
      }?namespace=profile-${this.state.region.toLowerCase()}&access_token=${
        this.state.accessToken
      }`
    )
      .then((response) => {
        if (response.status === 404 || response.status === 401) {
          alert("Wprowadź poprawne dane!!!");
        }
        return response.json();
      })
      .then((data) => {
        this.setState((prev) => ({
          character: { ...prev.character, data, isReady: true },
        }));
        this.fetchMediaCharacter();
        this.fetchEquipment();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fetchMediaCharacter = () => {
    fetch(
      `${this.state.character.data.media.href}&access_token=${this.state.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState((prev) => ({
          mediaCharacter: { ...prev.mediaCharacter, data, isReady: true },
        }));
      });
  };

  fetchEquipment = () => {
    fetch(
      `${this.state.character.data.equipment.href}&access_token=${this.state.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState((prev) => ({
          equipment: { ...prev.equipment, data, isReady: true },
        }));
        this.imgMediaEquipment();
      });
  };

  fetchMediaEquipment = (item) => {
    fetch(`${item.media.key.href}&access_token=${this.state.accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prev) => ({
          mediaEquipment: {
            ...prev.mediaEquipment,
            data: [...prev.mediaEquipment.data, data],
            isReady: true,
          },
        }));
        this.isReadyData();
      });
  };

  imgMediaEquipment = () => {
    this.state.equipment.data.equipped_items.map((item) =>
      this.fetchMediaEquipment(item)
    );
  };

  isReadyData = () => {
    const { character, mediaCharacter, equipment, mediaEquipment } = this.state;

    if (
      character.isReady &&
      mediaCharacter.isReady &&
      equipment.isReady &&
      mediaEquipment.isReady
    ) {
      this.setState({ isReadyData: true });
    }
  };

  isReadyDataReset = () => {
    const { isReadyData } = this.state;

    if (isReadyData) {
      this.setState((prev) => ({
        isReadyData: false,
        character: { ...prev.character, isReady: false },
        mediaCharacter: { ...prev.mediaCharacter, isReady: false },
        equipment: { ...prev.equipment, isReady: false },
        mediaEquipment: { ...prev.mediaEquipment, data: [], isReady: false },
      }));
    }
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.isReadyDataReset();
    this.fetchCharacter();
  };

  componentDidMount = () => {
    this.fetchAPI();
  };

  render() {
    const {
      character,
      mediaCharacter,
      equipment,
      mediaEquipment,
      isReadyData,
    } = this.state;
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col">
              <Form
                handleChange={this.handleChange}
                handleClick={this.handleClick}
              />
            </div>
          </div>
          {isReadyData ? (
            <div className="row">
              <div className="col">
                <Character
                  characterData={character.data}
                  mediaData={mediaCharacter.data}
                />
                <Equipment
                  equipment={equipment.data}
                  mediaEquipment={mediaEquipment}
                />
              </div>
            </div>
          ) : (
            false
          )}
        </div>
      </div>
    );
  }
}

export default App;
