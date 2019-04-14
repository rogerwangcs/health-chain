import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";

const formImage = "https://i.imgur.com/sXKzPzR.png";

class HospitalForm extends Component {
  renderPatientInformation() {
    return this.props.patientInformation.map(info => {
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
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f7f7f7"
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
              src={this.props.patient.image[0].contentUrl}
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
                {this.props.patient.name}
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
        <div>
          <img src={formImage} style={{ width: "75%", height: "auto" }} />
        </div>
      </div>
    );
  }
}

export default withRouter(HospitalForm);
