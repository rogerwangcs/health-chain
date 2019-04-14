import React, { Component } from "react";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";

import { FaArrowRight } from "react-icons/fa";

import "../styles/hospital.css";

export default class Hospital extends Component {
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
      patientInformation: [
        { key: "Insurance Plan ID", value: "W267123-DF43" },
        { key: "GRP#", value: "894213-06TH" },
        { key: "PCP", value: "Kang, Alex" },
        { key: "IPA", value: "Mass General Hospital" },
        { key: "Date of Birth", value: "Nov. 3rd, 1997" }
      ]
    };
  }

  componentWillMount() {
    this.fetchData();
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username
    });
  }

  fetchData() {
    const options = { decrypt: false };
    getFile("userData.json", options)
      .then(file => {
        var statuses = JSON.parse(file || "[]");
        this.setState({
          statusIndex: statuses.length,
          statuses: statuses
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  renderPatientInformation() {
    return this.state.patientInformation.map(info => {
      return (
        <div
          key={info.key}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20
          }}
        >
          <p
            style={{
              fontFamily: "Avenir",
              fontWeight: "800",
              margin: 0
            }}
          >
            {info.key}
          </p>
          <p
            style={{
              fontFamily: "Avenir",
              fontWeight: "100",
              margin: 0
            }}
          >
            {info.value}
          </p>
        </div>
      );
    });
  }

  render() {
    console.log(this.state.statuses);
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#191919",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div
          style={{
            float: "left",
            width: "450px",
            height: "100%",
            backgroundColor: "#450059"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2%",
              paddingBottom: "3%",
              borderBottom: ".5px solid violet"
            }}
          >
            <img
              src={this.state.person.avatarUrl()}
              style={{
                width: "20%",
                height: "auto",
                boxShadow: "1px 2px 5px rgba(0,0,0,.3)",
                borderRadius: "50%"
              }}
            />
            <div
              style={{
                marginLeft: "4%",
                fontFamily: "Avenir",
                marginTop: "4%"
              }}
            >
              <p style={{ fontWeight: "600", textAlign: "left" }}>
                {this.state.person.name()}
              </p>
              <p style={{ fontWeight: "200", textAlign: "left" }}>
                Mass Mutual Health Insurance
              </p>
            </div>
          </div>
          <div
            style={{
              marginTop: "2%",
              width: "100%",
              padding: "10px 20px",
              backgroundColor: "rgba(0,0,0,.4)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <p
              style={{
                fontFamily: "Avenir",
                fontWeight: "600",
                margin: 0
              }}
            >
              Current Balance
            </p>
            <p
              style={{
                fontFamily: "Avenir",
                fontWeight: "200",
                margin: 0
              }}
            >
              $10,000.00
            </p>
          </div>
          <div style={{ width: "100%", padding: "25px" }}>
            {this.renderPatientInformation()}
          </div>
        </div>
        <div
          style={{
            zIndex: "100",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e7e7e7",
            flexDirection: "column"
          }}
        >
          <h1
            style={{ marginBottom: 0, color: "purple", fontFamily: "Avenir" }}
          >
            Patient Agreement
          </h1>
          <div
            style={{
              marginTop: "25px",
              backgroundColor: "white",
              width: "80%",
              padding: "30px 15px",
              borderRadius: "25px"
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "30px 30px"
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%"
              }}
            >
              <input type="checkbox" />
              <p
                style={{
                  color: "black",
                  fontFamily: "Avenir",
                  marginLeft: "2%",
                  fontSize: "16px"
                }}
              >
                I agree to the terms and services
              </p>
            </div>
            <p
              size={32}
              style={{
                backgroundColor: "purple",
                borderRadius: 22,
                color: "#f7f7f7",
                padding: 5,
                width: "6%",
                height: "auto"
              }}
            >
              Next
            </p>
          </div>
        </div>
      </div>
    );
  }
}
