import React, { Component } from "react";
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile
} from "blockstack";
import { withRouter } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";

import "../styles/hospital.css";

class Hospital extends Component {
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
      patientInformation: this.props.patientInformation
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
              width: "500px",
              height: "76%",
              padding: "25px 30px",
              borderRadius: "5px",
              overflowY: "scroll"
            }}
          >
            <p
              style={{
                color: "black",
                fontSize: 14,
                textAlign: "justify",
                fontFamily: "Helvetica"
              }}
            >
              We here at Health Chain are making a commitment to work with you
              in your efforts to get better. To help you in this work, we agree
              that: We will help you schedule regular appointments for medicine
              refills. If we have to cancel or change your appointment for any
              reason, we will make sure you have enough medication to last until
              your next appointment. We will make sure that this treatment is as
              safe as possible. We will check regularly to make sure you are not
              having bad side effects. We will keep track of your prescriptions
              and test for drug use regularly to help you feel like you are
              being monitored well. We will help connect you with other forms of
              treatment to help you with your condition. We will help set
              treatment goals and monitor your progress in achieving those
              goals. We will work with any other doctors or providers you are
              seeing so that they can treat you safely and effectively. We will
              work with your medical insurance providers to make sure you do not
              go without medicine because of paperwork or other things they may
              ask for. If you become addicted to these medications, we will help
              you get treatment and get off of the medications that are causing
              you problems safely, without getting sick.
            </p>
            <p
              style={{
                color: "black",
                fontSize: 14,
                textAlign: "justify",
                fontFamily: "Helvetica"
              }}
            >
              A release of liability, commonly referred to as a waiver of
              reliability, a release form, a liability release form, an
              assumption of risk form, a hold harmless agreement, or legal
              release, is a legal document between two parties, referenced as
              the Releasor and the Releasee. The purpose of a release of
              liability, is to free the Releasee from legal liability for any
              damages incurred by the Releasor. Put simply, it's an agreement
              not to sue if the person or business involved in a risky activity
              that's offered is somehow hurt or is subjected to some form of
              damage.
            </p>
            <div
              style={{ float: "left", display: "flex", alignItems: "center" }}
            >
              <input
                style={{ width: "300px" }}
                value={this.state.userId}
                placeholder="Blockstack Signature"
                disabled
              />
              <p
                onClick={() =>
                  this.setState({ userId: this.props.patient.patientID })
                }
                style={{
                  color: "black",
                  backgroundColor: "green",
                  borderRadius: 5,
                  marginBottom: 0,
                  marginLeft: "2%",
                  width: 140,
                  fontSize: 12,
                  color: "white",
                  fontFamily: "Avenir",
                  fontWeight: "600",
                  padding: "4px 20px"
                }}
              >
                Sign With BlockStack ID
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "40%",
              margin: "0 auto",
              padding: "30px 20px",
              alignItems: "center"
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
              onClick={() => this.props.history.push("/hospitalform")}
              size={32}
              style={{
                backgroundColor: "purple",
                borderRadius: 22,
                color: "#f7f7f7",
                padding: 5,
                width: "60px",
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

export default withRouter(Hospital);
