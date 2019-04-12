import React from "react";
import ReactDOM from "react-dom";
import IndecisionApp from "./components/IndecisionApp";
import "normalize.css/normalize.css";
import "./styles/style.scss";

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));

// class oldClass {
//   constructor() {
//     this.name = "panakjs";
//   }
//   getName() {
//     return this.name;
//   }
// }

// const oldClassInst = new oldClass();
// const getName = oldClassInst.getName;
// // console.log(getName());

// class newClass {
//   name = "Rahulxx";
//   getName = () => {
//     return this.name;
//   };
// }
// const newClassInst = new newClass();
// const getName2 = newClassInst.getName;
// console.log(getName2());
