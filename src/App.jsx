import React from 'react';
import moment from 'moment';

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {       //states initialise

      arr: [{ Question: "What is your name?", Answer: "", isInput: true },
      {
        Question: "Who is the best cricketer in the world?", Answer: "",
        isInput: false, isOption: true
      },
      {
        Question: "What are the colors in the Indian national flag? ", Answer: {},
        isInput: false, isOption: false, isMultiOption: true
      }],

      currentItem: { Question: "What is your name?", Answer: "", isInput: true },
      index: 1,
      isShowFinishButtons: false,
      checkedGreen: false,
      checkedOrange: false,
      checkedWhite: false,
      checkedYellow: false,
      inputRequired: false,
      inputValue: "",
      isShowHistoryPage: false,
      historyItems: {}

    }

  }




  onNextItem() {                  //on click on next button


    if (this.state.inputValue) {           // check input value 

      this.setState({ inputRequired: false });           // input field show required false


      if (this.state.index === this.state.arr.length - 1) {   // for showing finish button at last page

        this.setState({ isShowFinishButtons: true });

      }

      this.setState({
        currentItem: this.state.arr[this.state.index],   // set current question on page
        index: this.state.index + 1
      });

    }

    else {

      this.setState({ inputRequired: true });
    }



  }

  onFinish() {         // on click on finish button


    let data = [...this.state.arr];  // copy data with states arr with spread operator
    let date = new Date();        // get current date
    let obj = {};                 // init empty object

    let key = (String(date.getDate()) + String(date.getMonth() + 1) + String(date.getFullYear()) +
      String(date.getHours()) +
      String(date.getMinutes()) + String(date.getSeconds()));  // key for new data



    if (localStorage.getItem("historyData")) {        // if local stroage contains a history data

      obj = JSON.parse(localStorage.getItem("historyData"));  // reassign the obj with history data


      obj[key] = { data, createdAt: date };   // add new data in obj with new date


      localStorage.setItem("historyData", JSON.stringify(obj));  // store data in localStorage


    }

    else {          // if local stroage doesn`t contains a history data



      obj[key] = { data, createdAt: date };   // add new data in obj with new date


      localStorage.setItem("historyData", JSON.stringify(obj));   // store data in localStorage  

    }



    this.onNewGame();         // for reset the all states

  }



  handleInputChange(event) {          // on changes on input name


    if (event.target.value) {     // check input value 

      this.setState({ inputRequired: false });    // input field show required false   

      let data = [...this.state.arr];       // copy data with states arr with spread operator

      data[0].Answer = event.target.value;  // first answer value

      this.setState({ arr: data });     // set new data into state arr

      this.setState({ inputValue: event.target.value });    // set inputValue state

    }

    else {

      this.setState({ inputRequired: true });   // input field show required true  

      this.setState({ inputValue: event.target.value });  // set inputValue state


    }

  }

  handleOptionsChange(event) {  // on Changes on Options 


    let data = [...this.state.arr];   // copy data with states arr with spread operator

    data[1].Answer = event.target.value; // set second answer

    this.setState({ arr: data });     // set new data into state arr


  }

  async handleCheckBoxChange(event) {  // on Changes on Multiple Options 

    event.persist();                  // use for async operations

    let data = [...this.state.arr];  // copy data with states arr with spread operator

    let obj = data[2].Answer;   // assign obj with second answer object

    if (event.target.value === "White") {     // if option is White

      await this.setState({ checkedWhite: !this.state.checkedWhite });  // checkedWhite toggle checkbox

      if (this.state.checkedWhite) {  // if White checkbox is checked

        obj[event.target.value] = event.target.value;  // store key White on obj

        data[2].Answer = obj;  // set Answer on data

        this.setState({ arr: data });  // set new data into state arr


      }

      else {  // if White checkbox is not checked


        delete obj[event.target.value];  // delete White key from obj

        data[2].Answer = obj;   // set Answer on data 

        this.setState({ arr: data });   // set new data into state arr


      }


    }

    else if (event.target.value === "Yellow") {  // if option is Yellow

      await this.setState({ checkedYellow: !this.state.checkedYellow }); // checkedYellow toggle checkbox

      if (this.state.checkedYellow) { // if Yellow checkbox is checked

        obj[event.target.value] = event.target.value;  // store key Yellow on obj

        data[2].Answer = obj;   // set Answer on data

        this.setState({ arr: data });  // set new data into state arr


      }

      else {      // if Yellow checkbox is not checked


        delete obj[event.target.value];  // delete Yellow key from obj

        data[2].Answer = obj;   // set Answer on data 

        this.setState({ arr: data });   // set new data into state arr

      }



    }
    else if (event.target.value === "Orange") {    // if option is Orange


      await this.setState({ checkedOrange: !this.state.checkedOrange }); // checkedOrange toggle checkbox

      if (this.state.checkedOrange) {   // if Orange checkbox is checked

        obj[event.target.value] = event.target.value;  // store key Orange on obj

        data[2].Answer = obj;   // set Answer on data

        this.setState({ arr: data });  // set new data into state arr

      }

      else {      // if Orange checkbox is not checked


        delete obj[event.target.value];  // delete Orange key from obj

        data[2].Answer = obj;   // set Answer on data 

        this.setState({ arr: data });   // set new data into state arr

      }



    }

    else if (event.target.value === "Green") {    // if option is Green


      await this.setState({ checkedGreen: !this.state.checkedGreen });  // checkedGreen toggle checkbox

      if (this.state.checkedGreen) {    // if Green checkbox is checked


        obj[event.target.value] = event.target.value;  // store key Green on obj

        data[2].Answer = obj;   // set Answer on data

        this.setState({ arr: data });  // set new data into state arr


      }

      else {     // if Green checkbox is not checked


        delete obj[event.target.value];  // Green White key from obj

        data[2].Answer = obj;   // set Answer on data 

        this.setState({ arr: data });   // set new data into state arr

      }



    }


  }


  onNewGame() {    // Reset all states

    this.setState({
      arr: [{ Question: "What is your name?", Answer: "", isInput: true },
      { Question: "Who is the best cricketer in the world?", Answer: "", isInput: false, isOption: true },
      {
        Question: "What are the colors in the Indian national flag? ", Answer: {}, isInput: false,
        isOption: false, isMultiOption: true
      }],
      currentItem: { Question: "What is your name?", Answer: "", isInput: true },
      index: 1,
      isShowFinishButtons: false,
      checkedGreen: false,
      checkedOrange: false,
      checkedWhite: false,
      checkedYellow: false,
      inputRequired: false,
      inputValue: "",
      isShowHistoryPage: false
    })

  }



  onHistory() {   // on Click on history button


    this.setState({ isShowHistoryPage: true }); // show history page true

    if (localStorage.getItem("historyData")) {  // check history data

      let data = JSON.parse(localStorage.getItem("historyData"));

      this.setState({ historyItems: data });  // assign history data into historyItems state

    }

    // if not history data then historyItems state is empty object and show no history found


  }



  render() {


    return (


      <>

        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand ml-auto mr-auto"> Trivia App</span>
        </nav>

        {this.state.isShowHistoryPage ?


          <div className=" border w-50 p-5 " style={{ marginLeft: "25%", marginTop: "5%" }} >

            <h2 className="d-inline">History</h2>

            <button className="btn btn-info" style={{ marginLeft: "50%" }} onClick={this.onNewGame.bind(this)} >Start new game</button>


            <hr />  <br />

            {Object.keys(this.state.historyItems).length ?

              Object.keys(this.state.historyItems).map((keys, index) =>

                <div key={keys}>

                  <br />

                  <span> Game {index + 1}   </span> : <span> {moment(this.state.historyItems[keys].createdAt).format('Do MMMM  h:mm a')}</span>

                  <br />

                  {this.state.historyItems[keys]["data"].map((items, index) =>

                    <div key={index}>

                      <br />

                      {items.isInput ? <> Name:- {items.Answer} </> : ""}

                      <br />
                      <br />

                      {this.state.historyItems[keys]["data"].length - 1 === index ? "" :

                        <div>

                          {"Question:--"}

                          {this.state.historyItems[keys]["data"][index + 1].Question}

                          <br />

                          {"Answer:-"}

                          {typeof (this.state.historyItems[keys]["data"][index + 1].Answer) === "object" ?

                            <>
                              {Object.keys(this.state.historyItems[keys]["data"][index + 1].Answer).length ?
                                <>
                                  {Object.keys(this.state.historyItems[keys]["data"][index + 1].Answer).map((item, i) =>
                                    <span key={item}>
                                      {item}
                                      {Object.keys(this.state.historyItems[keys]["data"][index + 1].Answer).length - 1 === i ? "" : ","}
                                    </span>

                                  )}
                                </>
                                :
                                <>
                                </>
                              }

                            </>

                            :
                            <>
                              {this.state.historyItems[keys]["data"][index + 1].Answer}
                            </>
                          }

                        </div>

                      }

                    </div>

                  )}

                  <hr />

                </div>
              )

              :

              <div>
                <br /> <br />
             No History Found
          </div>

            }
          </div>

          :

          <div className=" border w-50 p-5 " style={{ marginLeft: "25%", marginTop: "5%" }} >


            <button className="btn btn-info" style={{ marginLeft: "90%" }} onClick={this.onHistory.bind(this)} >History</button>


            {this.state.currentItem.isInput ?
              <>

                <h2>{this.state.currentItem.Question}</h2>

                <br />

              Answer:-

              <br /><br />

                <input type="text" onChange={this.handleInputChange.bind(this)} />

                {this.state.inputRequired ? <span className="text-danger"> Required</span> : ""}

              </>

              :
              this.state.currentItem.isOption ?
                <>

                  <h2>{this.state.currentItem.Question}</h2>

                  <br />

                  Answer:-

                  <br /><br />

                  <div className="form-check form-check-block">
                    <input className="form-check-input" type="radio" name="checkBoxOptions"
                      id="blockRadio1" value="Sachin Tendulkar" onChange={this.handleOptionsChange.bind(this)} />
                    <label className="form-check-label" htmlFor="blockRadio1">Sachin Tendulkar</label>
                  </div>
                  <div className="form-check form-check-block">
                    <input className="form-check-input" type="radio" name="checkBoxOptions"
                      id="blockRadio2" value="Virat Kohli" onChange={this.handleOptionsChange.bind(this)} />
                    <label className="form-check-label" htmlFor="blockRadio2">Virat Kohli</label>
                  </div>

                  <div className="form-check form-check-block">
                    <input className="form-check-input" type="radio" name="checkBoxOptions"
                      id="blockRadio3" value="Adam Gilchirst" onChange={this.handleOptionsChange.bind(this)} />
                    <label className="form-check-label" htmlFor="blockRadio3">Adam Gilchirst</label>
                  </div>

                  <div className="form-check form-check-block">
                    <input className="form-check-input" type="radio" name="checkBoxOptions"
                      id="blockRadio4" value="Jacques Kallis" onChange={this.handleOptionsChange.bind(this)} />
                    <label className="form-check-label" htmlFor="blockRadio4">Jacques Kallis</label>
                  </div>


                  <br />

                  Select any one.

                  </>

                :

                this.state.currentItem.isMultiOption ?
                  <>

                    <h2>{this.state.currentItem.Question}</h2>

                    <br />

                  Answer:-

                  <br /><br />

                    <div className="ml-4" >

                      <input className="form-check-input" type="checkbox" id="blockCheckbox1" value="White"
                        onChange={this.handleCheckBoxChange.bind(this)} checked={this.state.checkedWhite}
                      />
                      <label className="form-check-label" htmlFor="blockCheckbox1">White</label> <br />
                      <input className="form-check-input" type="checkbox" id="blockCheckbox2" value="Yellow"
                        onChange={this.handleCheckBoxChange.bind(this)} checked={this.state.checkedYellow}
                      />
                      <label className="form-check-label" htmlFor="blockCheckbox2">Yellow</label><br />
                      <input className="form-check-input" type="checkbox" id="blockCheckbox3" value="Orange"
                        onChange={this.handleCheckBoxChange.bind(this)} checked={this.state.checkedOrange}
                      />
                      <label className="form-check-label" htmlFor="blockCheckbox3">Orange</label><br />
                      <input className="form-check-input" type="checkbox" id="blockCheckbox4" value="Green"
                        onChange={this.handleCheckBoxChange.bind(this)} checked={this.state.checkedGreen}
                      />
                      <label className="form-check-label" htmlFor="blockCheckbox4">Green</label>
                    </div>
                    <br />
                    <br />


                  Select more than 1

                  </>

                  : ""

            }

            <br /><br /><br />

            {this.state.isShowFinishButtons ?
              <>
                <button className="btn btn-success" onClick={this.onFinish.bind(this)}>Finish</button>

              </>

              :


              <button className="btn btn-danger " onClick={this.onNextItem.bind(this)}>Next</button>
            }

          </div>

        }

      </>
    )
  }
}


export default App;