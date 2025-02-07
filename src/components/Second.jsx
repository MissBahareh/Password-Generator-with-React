import { Component } from "react";
import secondStyle from "../secondStyle.module.css";
import { Copy, Eye, CheckSquareFill, EyeSlash } from "react-bootstrap-icons";

export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      myType: "text",
      upperFill: "rgba(255, 255, 255, 0.461)",
      lowerFill: "rgba(255, 255, 255, 0.461)",
      numFill: "rgba(255, 255, 255, 0.461)",
      symFill: "rgba(255, 255, 255, 0.461)",
    };
  }

  updatePower() {
    let password = 0;
    const strange = this.state.username;
    let upperFill = "rgba(255, 255, 255, 0.461)";
    let lowerFill = "rgba(255, 255, 255, 0.461)";
    let numFill = "rgba(255, 255, 255, 0.461)";
    let symFill = "rgba(255, 255, 255, 0.461)";

    if (strange.length > 3) password++;
    if (strange.length > 6) password++;
    if (strange.match(/[a-z]/)) {
      password++;
      lowerFill = "green";
    }
    if (strange.match(/[A-Z]/)) {
      password++;
      upperFill = "green";
    }
    if (strange.match(/[0-9]/)) {
      password++;
      numFill = "green";
    }
    if (strange.match(/[^a-zA-Z0-9]/)) {
      password++;
      symFill = "green";
    }

    this.setState({ upperFill, lowerFill, numFill, symFill });

    return Math.round((password / 6) * 100);
  }

  getPower() {
    const strange = this.state.username;
    let password = 0;

    if (strange.length > 3) password++;
    if (strange.length > 6) password++;
    if (strange.match(/[a-z]/)) password++;
    if (strange.match(/[A-Z]/)) password++;
    if (strange.match(/[0-9]/)) password++;
    if (strange.match(/[^a-zA-Z0-9]/)) password++;

    return Math.round((password / 6) * 100);
  }

  getPowerColor() {
    const power = this.getPower();
    let backgroundColor = "red";
    if (power > 0) backgroundColor = "red";
    if (power > 20) backgroundColor = "orangered";
    if (power > 40) backgroundColor = "orange";
    if (power > 60) backgroundColor = "gold";
    if (power > 80) backgroundColor = "blue";
    if (power == 100) backgroundColor = "green";
    return { backgroundColor };
  }

  GeneratePass() {
    let result = "";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 0; i < 20; i++) {
      let upper = Math.random() < 0.2;
      let lower = Math.random() < 0.2;
      let num = Math.random() < 0.3;
      let sym = Math.random() < 0.3;
      let uppercase = Math.floor(Math.random() * 26 + 65);
      let lowercase = Math.floor(Math.random() * 26 + 97);
      let nums = Math.floor(Math.random() * (57 - 48) + 48);

      if (upper) {
        let rndChar = String.fromCharCode(uppercase);
        result += rndChar;
      } else if (lower) {
        let rndChar = String.fromCharCode(lowercase);
        result += rndChar;
      } else if (num) {
        let rndChar = String.fromCharCode(nums);
        result += rndChar;
      } else if (sym) {
        let rndChar = symbols[Math.floor(Math.random() * symbols.length)];
        result += rndChar;
      }
    }

    return result;
  }

  render() {
    return (
      <>
        <div className={secondStyle.card}>
          <h1 className={secondStyle.h1}>Password Generator</h1>
          <div className={secondStyle.divInput}>
            <input
              type={this.state.myType}
              value={this.state.username}
              onChange={(e) => {
                this.setState({ username: e.target.value }, () =>
                  this.updatePower()
                );
              }}
              className={secondStyle.input}
            />
            <span className={secondStyle.divInputSpan}>
              <Copy
                onClick={() => {
                  navigator.clipboard.writeText(this.state.username);
                  this.state.username !== ""
                    ? alert("password copied!")
                    : alert("Enter your password !!!!");
                }}
                className={secondStyle.divInputbtn}
              />
            </span>
            <button
              onClick={(e) => {
                e.target.innerHTML ===
                <EyeSlash className={secondStyle.divInputbtn} />
                  ? (e.target.innerHTML = (
                      <Eye className={secondStyle.divInputbtn} />
                    ))
                  : (e.target.innerHTML = (
                      <EyeSlash className={secondStyle.divInputbtn} />
                    ));

                this.setState({
                  myType: this.state.myType === "text" ? "password" : "text",
                });
              }}
              className={secondStyle.divInputType}
            >
              {this.state.myType === "text" ? (
                <EyeSlash className={secondStyle.divInputbtn} />
              ) : (
                <Eye className={secondStyle.divInputbtn} />
              )}
            </button>
          </div>
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.13)",
              width: 100,
              textAlign: "center",
              height: "4px",
              display: "flex",
              transform: "scale(2.4)",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                width: this.getPower(),
                ...this.getPowerColor(),
              }}
            ></div>
          </div>
          <div style={{ color: "white", fontFamily: "Lora" }}>
            {" "}
            {this.getPower()}
            <span style={{ margin: " 0 5px", fontFamily: "ZillaSlab" }}>%</span>
          </div>
          <div className={secondStyle.controlPs}>
            <p className={secondStyle.controlPsp}>
              Including Number
              <CheckSquareFill
                style={{
                  fontSize: 20,
                  fill: this.state.numFill,
                }}
              />
            </p>
            <p className={secondStyle.controlPsp}>
              Includes Uppercase
              <CheckSquareFill
                style={{
                  fontSize: 20,
                  fill: this.state.upperFill,
                }}
              />
            </p>
            <p className={secondStyle.controlPsp}>
              Includes Lowercase
              <CheckSquareFill
                style={{
                  fontSize: 20,
                  fill: this.state.lowerFill,
                }}
              />
            </p>
            <p className={secondStyle.controlPsp}>
              Includes Symbols
              <CheckSquareFill
                style={{
                  fontSize: 20,
                  fill: this.state.symFill,
                }}
              />
            </p>
          </div>
          <button
            onClick={() => {
              this.setState({ username: this.GeneratePass() }, () =>
                this.updatePower()
              );
            }}
            className={secondStyle.btnGenerate}
          >
            Generate Password
          </button>
        </div>
      </>
    );
  }
}
