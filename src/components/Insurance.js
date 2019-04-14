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

import "../styles/insurance.css";

const cornerImage = "https://i.imgur.com/GLShQNf.png";

const randomBillingDates = ["April 23, 2019", "May 5, 2019", "May 17, 2019"];

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
      patientProfiles: []
    };
  }

  // async componentWillMount() {
  //   this.state.patientKeys.forEach(patientID => {
  //     this.getPatientProfile(patientID);
  //   });
  //   setInterval(() => {
  //     this.setState({ patientForms: [] });
  //     this.state.patientKeys.forEach(patientID => {
  //       this.getPatientForms(patientID);
  //     }, 500);
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    this.state.patientForms.forEach(patient => {
      if (this.state.patientForms !== prevState.patientForms) {
        console.log("update form information!");
        console.log(this.state.formInformation);
      }
      console.log(this.state.patientForms);
    });
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

      patientForms.forEach(user => {
        console.log("important");
        console.log(user);
      });

      // options = { username: username, encrypt: false };
      // putFile("patientForms.json", JSON.stringify(patientForms), options)
      //   .then(() => {
      //     console.log("Sent Form Info");
      //   })
      //   .catch(err => {
      //     console.log("asd");
      //   });
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
      </div>
    );
  }
}

const PatientCard = props => {
  return (
    <div className="patientCard">
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start"
          }}
        >
          <p
            style={{
              fontFamily: "Avenir",
              fontWeight: "700",
              fontSize: 33,
              marginBottom: 2
            }}
          >
            {props.patient.name}
          </p>
          <p
            style={{
              fontFamily: "Avenir",
              fontWeight: "200",
              fontSize: 15,
              marginBottom: 2
            }}
          >
            {props.patient.userId}
          </p>
        </div>
        <img
          src={props.patient.image[0].contentUrl}
          style={{
            width: "20%",
            height: "20%",
            borderRadius: "50%",
            border: ".5px dashed navy"
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexDirection: "column"
        }}
      >
        <p
          style={{
            fontFamily: "Avenir",
            fontWeight: "700",
            fontSize: 16,
            marginBottom: 2,
            marginTop: 10
          }}
        >
          {props.patient.description || "Hack the Heights 2019"}
        </p>
        <p>Next Billing Date: {randomBillingDates[0]}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          marginTop: "7%",
          fontFamily: "Avenir"
        }}
      >
        <button
          style={{
            marginRight: 15,
            width: "85px",
            padding: "5px 5px",
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: "green"
          }}
          onClick={() =>
            props.setApprovalStatus(props.patient.userId, "Approved")
          }
        >
          Approve
        </button>
        <button
          style={{
            width: "85px",
            padding: "5px 5px",
            marginRight: 15,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "red"
          }}
          onClick={() =>
            props.setApprovalStatus(props.patient.userId, "Rejected")
          }
        >
          Reject
        </button>
      </div>
      <img
        src={"https://i.imgur.com/GLShQNf.png"}
        style={{
          width: "40%",
          height: "auto",
          marginTop: "-10%",
          marginLeft: "70%",
          opacity: 0.75
        }}
      />
    </div>
  );
};
