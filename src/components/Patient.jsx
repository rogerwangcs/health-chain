import React, { Component } from "react";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";

import { FaSignOutAlt, FaBars } from "react-icons/fa";

const avatarFallbackImage =
  "https://s3.amazonaws.com/onename/avatar-placeholder.png";

const backgroundImage = "https://i.imgur.com/2p9NWcr.jpg";

export default class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return "Anonymous";
        },
        avatarUrl() {
          return avatarFallbackImage;
        }
      },
      username: "",
      newStatus: "",
      statuses: [],
      statusIndex: 0,
      isLoading: false,
      approvalStatus: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.fetchData();
    setInterval(() => {
      console.log("fetching...");
      this.fetchData();
    }, 500);
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username
    });
  }

  fetchData() {
    this.setState({ isLoading: true });
    if (this.isLocal()) {
      const options = { decrypt: false };
      getFile("patientForms.json", options)
        .then(file => {
          var statuses = JSON.parse(file || "[]");
          console.log(statuses);
          this.setState({
            person: new Person(loadUserData().profile),
            username: loadUserData().username,
            statusIndex: statuses.length,
            statuses: statuses
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else {
      const username = this.props.match.params.username;
      lookupProfile(username)
        .then(profile => {
          this.setState({
            person: new Person(profile),
            username: username
          });
        })
        .catch(error => {
          console.log("could not resolve profile");
        });

      const options = { username: username, decrypt: false };
      getFile("patientForms.json", options)
        .then(file => {
          var statuses = JSON.parse(file || "[]");
          this.setState({
            statusIndex: statuses.length,
            statuses: statuses
          });
        })
        .catch(error => {
          console.log("could not fetch statuses");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  isLocal() {
    return this.props.match.params.username ? false : true;
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;

    return !isSignInPending() && person ? (
      <div
        className="container"
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="row"
          style={{
            width: "45%",
            height: "90%",
            borderRadius: "30px",
            margin: "0 auto",
            overflow: "hidden",
            boxShadow: "1px 3px 20px rgba(0,0,0,.5)",
            backgroundColor: "white"
          }}
        >
          <div>
            <div>
              <div
                className="avatar-section"
                style={{
                  background: "linear-gradient(#ed9a63, #ed7763)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <FaBars
                    style={{
                      zIndex: 2,
                      color: "white",
                      marginLeft: "4%",
                      marginTop: "4%"
                    }}
                    size={27}
                  />
                  <FaSignOutAlt
                    onClick={handleSignOut.bind(this)}
                    style={{
                      zIndex: 2,
                      color: "white",
                      marginRight: "4%",
                      marginTop: "4%"
                    }}
                    size={27}
                  />
                </div>
                <img
                  src={
                    person.avatarUrl()
                      ? person.avatarUrl()
                      : avatarFallbackImage
                  }
                  className="img-rounded avatar"
                  id="avatar-image"
                  style={{
                    borderRadius: "50%",
                    border: "white 3px solid",
                    minWidth: "25%",
                    height: "auto"
                  }}
                />
                <div className="username" style={{ fontFamily: "Avenir" }}>
                  <h1 style={{ fontWeight: "800" }}>
                    <span id="heading-name">
                      {person.name() ? person.name() : "Nameless Person"}
                    </span>
                  </h1>
                  <p style={{ textAlign: "center", fontWeight: "600" }}>
                    Mass Mutual Health Insurance
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "200",
                      marginBottom: 50
                    }}
                  >
                    {username}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                width: "60%",
                paddingTop: "10px",
                paddingBottom: "10px",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                borderRadius: "50px",
                marginTop: -50,
                boxShadow: "1px 3px 20px rgba(244, 152, 66, .4)"
              }}
            >
              <p
                style={{
                  color: "orange",
                  marginTop: "2%",
                  fontFamily: "Avenir",
                  fontSize: 18
                }}
              >
                Past Visits
              </p>
            </div>
            <div
              className="col-md-12 statuses"
              style={{
                overflowY: "scroll",
                height: 280,
                paddingTop: 0,
                marginTop: 10
              }}
            >
              {this.state.isLoading}
              {this.state.statuses.map((status, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                    marginBottom: 15,
                    padding: 0,
                    borderBottom: ".2px solid black",
                    fontSize: 16,
                    fontFamily: "Avenir",
                    color: "black"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start"
                    }}
                  >
                    <p>
                      Visit #{this.state.statuses.length - index}: {status.name}
                    </p>
                    <p style={{ color: "grey", fontWeight: "100" }}>
                      April 14, 2019
                    </p>
                  </div>
                  <p
                    style={{
                      color: status.status === "Rejected" ? "orange" : "green"
                    }}
                  >
                    {status.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
