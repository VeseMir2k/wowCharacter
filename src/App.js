import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form.js";
import Character from "./components/Character.js";

class App extends React.Component {
  state = {
    accessToken: "",
    name: "thomgnar",
    realm: "burning-legion",
    region: "EU",
    characterData: null,
    mediaData: null,
  };

  authorizationApi = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );

  handleAPI = () => {
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

  handleCharacterData = () => {
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
        this.setState({ characterData: data });
        this.handleMediaData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleMediaData = () => {
    fetch(
      `${this.state.characterData.media.href}&access_token=${this.state.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ mediaData: data });
      });
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.handleCharacterData();
  };

  componentDidMount = () => {
    this.handleAPI();
  };

  render() {
    const { characterData, mediaData } = this.state;
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Form
                handleChange={this.handleChange}
                handleClick={this.handleClick}
              />
            </div>
            <div className="col">
              {characterData && mediaData ? (
                <Character
                  characterData={characterData}
                  mediaData={mediaData}
                />
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
