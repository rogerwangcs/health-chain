import React from "react";
import "../styles/insurance.css";

const cornerImage = "https://i.imgur.com/GLShQNf.png";

const randomBillingDates = ["April 23, 2019", "May 5, 2019", "May 17, 2019"];

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

export default PatientCard;
