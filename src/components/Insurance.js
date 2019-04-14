import React, { Component } from "react";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FaHome, FaFileMedicalAlt } from "react-icons/fa";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "../styles/insurance.css";

import PatientCard from "./PatientCard.jsx";

import "../styles/insurance.css";

export default class Insurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientKeys: [
        "rooterbuster.id.blockstack",
        "subraizahmed.id.blockstack",
        "alexkaang.id.blockstack"
      ],
      patientForms: [],
      patientProfiles: [],
      newForm: {},
      newForms: [],
      notification: false,
      index: 0
    };
  }

  async componentDidMount() {
    await this.state.patientKeys.forEach(async patientID => {
      this.getPatientProfile(patientID);
    });
    await setInterval(async () => {
      await this.getNewForm();
      await this.setState({ patientForms: [] });
      await this.state.patientKeys.forEach(async patientID => {
        this.getPatientForms(patientID);
      }, 1500);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.newForm.id !== prevState.newForm.id) {
      console.log(this.state.newForm);
      console.log("component updated");
      this.setState({ notification: true });
    }
  }

  renderNotification() {
    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: this.state.notification
            ? "rgba(0,0,0,.2)"
            : "rgba(0,0,0,0)",
          opacity: this.state.notification ? 1 : 0,
          display: "flex",
          transition: "all 1s ease-in-out",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            background: "linear-gradient(white, #f7f7f7)",
            width: "50%",
            padding: "30px 40px",
            borderRadius: 100,
            boxShadow: "1px 5px 10px rgba(0,0,0,.25)"
          }}
        >
          <p
            style={{
              margin: 0,
              color: "black",
              fontFamily: "Avenir",
              fontWeight: "600",
              fontSize: 26,
              alignSelf: "flex-start",
              marginBottom: 10
            }}
          >
            Incoming request from {this.state.newForm.name}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Avenir",
                fontWeight: "300",
                fontSize: 22,
                marginRight: 10
              }}
            >
              Payment Amount
            </p>
            <div
              style={{
                height: "2px",
                border: "1px dotted rgba(0,0,0,.4)",
                alignSelf: "center",
                flexGrow: 1,
                marginTop: "-10px",
                paddingLeft: "15px",
                paddingRight: "15px"
              }}
            />
            <p
              style={{
                margin: 0,
                marginLeft: 10,
                color: "black",
                fontFamily: "Avenir",
                fontWeight: "300",
                fontSize: 22
              }}
            >
              {this.state.newForm.requestAmount}
            </p>
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Avenir",
                fontWeight: "300",
                fontSize: 22,
                marginRight: 10
              }}
            >
              Transaction ID
            </p>
            <div
              style={{
                height: "2px",
                border: "1px dotted rgba(0,0,0,.4)",
                alignSelf: "center",
                flexGrow: 1,
                marginTop: "-10px",
                paddingLeft: "15px",
                paddingRight: "15px",
                marginBottom: "15px"
              }}
            />
            <p
              style={{
                margin: 0,
                marginLeft: 10,
                color: "black",
                fontFamily: "Avenir",
                fontWeight: "300",
                fontSize: 22
              }}
            >
              {this.state.newForm.id}
            </p>
          </div>
          <div
            style={{
              width: "95%",
              height: "1px",
              top: 10,
              backgroundColor: "rgba(0,0,0,.2)",
              margin: "0 auto"
            }}
          />
          <button
            style={{
              marginTop: "15px",
              borderRadius: 15,
              backgroundColor: "white",
              color: "black",
              fontFamily: "Avenir",
              boxShadow: "1px 4px 10px rbga(0,0,0,.2)"
            }}
            onClick={() => this.setState({ notification: false })}
          >
            Close Notification
          </button>
        </div>
      </div>
    );
  }

  getPatientProfile(patientID) {
    let patientProfiles = this.state.patientProfiles;
    lookupProfile(patientID)
      .then(profile => {
        profile.userId = patientID;
        patientProfiles.push(profile);
        this.setState({ patientProfiles });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPatientForms(patientID) {
    let patientForms = this.state.patientForms;
    const options = { username: patientID, decrypt: false };
    getFile("patientForms.json", options)
      .then(file => {
        var patientForms = JSON.parse(file || "[]");
        this.setState(prevState => ({
          patientForms: [...prevState.patientForms, patientForms]
        }));
      })
      .catch(error => {
        // console.log(error);
      });
  }

  getNewForm() {
    let newForm = this.state.newForm;
    const options = { decrypt: false };
    getFile("newForm.json", options)
      .then(file => {
        var newForm = JSON.parse(file || "[]");
        this.setState(prevState => ({
          newForm: newForm
        }));
      })
      .catch(error => {
        // console.log(error);
      });
  }

  mapPatientCards() {
    return this.state.patientProfiles.map((patient, index) => {
      return (
        <PatientCard
          key={index}
          patient={patient}
          setApprovalStatus={this.setApprovalStatus}
        />
      );
    });
  }

  setApprovalStatus(username, approvalStatus) {
    let options = { username: username, decrypt: false };
    getFile("patientForms.json", options).then(file => {
      let patientForms = JSON.parse(file || "[]");

      patientForms[0].status = approvalStatus;

      options = { username: username, encrypt: false };
      putFile("patientForms.json", JSON.stringify(patientForms), options)
        .then(() => {
          console.log("Sent Form Info");
        })
        .catch(err => {
          console.log("asd");
        });
    });
  }

  // getFormInformation() {
  //   let options = { username: 'rooterbuster.id.blockstack', decrypt: false };
  //   getFile("patientForms.json", options).then(file => {
  //     let patientForms = JSON.parse(file || "[]");
  //     console.log(patientForms);
  //   });
  // }

  render() {
    return (
      <div className="insuranceContainer">
        <SideNav
          onSelect={selected => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <FaHome size={20} style={{ marginBottom: 0 }} />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <FaFileMedicalAlt size={20} style={{ marginBottom: 0 }} />
              </NavIcon>
              <NavText>Transactions</NavText>
              <NavItem eventKey="charts/linechart">
                <NavText style={{ textAlign: "left" }}>
                  Past Transactions
                </NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText style={{ textAlign: "left" }}>
                  Pending Transactions
                </NavText>
              </NavItem>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <div
          style={{
            width: "93%",
            display: "flex",
            flexWrap: "wrap",
            padding: 0
          }}
        >
          {this.mapPatientCards()}
        </div>

        {this.renderNotification()}
      </div>
    );
  }
}
