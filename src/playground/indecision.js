class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.handleRemoveOptions = this.handleRemoveOptions.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
  }
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
  handleRemoveOptions() {
    this.setState(() => ({ options: [] }));
  }
  handleRemoveOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  }
  handlePick() {
    let randNum = Math.floor(Math.random() * this.state.options.length);
    let option = this.state.options[randNum];
    alert(option);
  }
  handleAddOption(option) {
    if (!option) {
      return "Enter valid value to add option!";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists!";
    }
    //here we don't explicitely return anything, so 'undefined' is returned implicitely
    this.setState(prevState => ({
      options: prevState.options.concat([option])
    }));
  }
  render() {
    const app = {
      title: "Indecision",
      subtitle: "Don't worry we will decision for you."
    };
    return (
      <div>
        <Header title={app.title} subtitle={app.subtitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleRemoveOptions={this.handleRemoveOptions}
          handleRemoveOption={this.handleRemoveOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};
Header.defaultProps = { title: "test" };

const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.handleRemoveOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add option to get started!</p>}
      {props.options.map((option, index) => (
        <Option
          key={index}
          option={option}
          handleRemoveOption={props.handleRemoveOption}
        />
      ))}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      {props.option}
      <button
        onClick={e => {
          props.handleRemoveOption(props.option);
        }}
      >
        Remove
      </button>
    </div>
  );
};
class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
      //error is by default set to 'undefined' because if this.props.handleAddOption doesn't returns any error then it returns 'undefined' value
    };
    this.handleAddOption = this.handleAddOption.bind(this);
  }
  handleAddOption(e) {
    e.preventDefault();
    let option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));
    if (!error) {
      e.target.elements.option.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
ReactDOM.render(<IndecisionApp />, document.getElementById("app"));
