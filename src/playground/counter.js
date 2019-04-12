class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  componentDidMount() {
    const countStr = localStorage.getItem("count");
    const count = parseInt(countStr, 10);
    if (!isNaN(count)) {
      this.setState(() => ({ count }));
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      localStorage.setItem("count", this.state.count);
    }
  }
  handleIncrement() {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  }
  handleDecrement() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1
      };
    });
  }
  handleReset() {
    this.setState({
      count: 0
    });
  }
  render() {
    return (
      <div>
        <h1>Count:{this.state.count} </h1>
        <button onClick={this.handleIncrement}>+1</button>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("app"));
