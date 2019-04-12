import React from "react";
import AddOption from "./AddOptions";
import Options from "./Options";
import Header from "./Header";
import Action from "./Action";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };
  handleClearOptionModal = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  };
  handleRemoveOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handleRemoveOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  };
  handlePick = () => {
    let randNum = Math.floor(Math.random() * this.state.options.length);
    let option = this.state.options[randNum];
    this.setState(() => ({ selectedOption: option }));
  };
  handleAddOption = option => {
    if (!option) {
      return "Enter valid value to add option!";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists!";
    }
    //here we don't explicitely return anything, so 'undefined' is returned implicitely
    this.setState(prevState => ({
      options: prevState.options.concat([option])
    }));
  };

  componentDidMount() {
    try {
      const options = JSON.parse(localStorage.getItem("options"));
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      //do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  render() {
    const app = {
      title: "Indecision",
      subtitle: "Don't worry we will decision for you."
    };
    return (
      <div>
        <Header title={app.title} subtitle={app.subtitle} />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleRemoveOptions={this.handleRemoveOptions}
              handleRemoveOption={this.handleRemoveOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>

        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearOptionModal={this.handleClearOptionModal}
        />
      </div>
    );
  }
}
