import React from 'react';
import dualbars from './dualbars.png';


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value })
  }

  onSubmitSignIn = () => {
    //send email to server and set routes
    if (!this.state.signInEmail || !this.state.signInPassword) {
      return this.props.onRouteChange('signin');


    }


    fetch('https://polar-shore-33711.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        //loads user on response
        if (user.id) {
          this.props.loadUser(user)


          fetch('https://polar-shore-33711.herokuapp.com/loadprojects', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: this.state.signInEmail,
            })
          })
            //responds with correct projects
            .then(response => response.json())
            .then(projects => {
              //map through loaded users projects
              if (projects.length === 0) {
                this.props.loadUserProjects(projects)
                this.props.onRouteChange('home');
              } else {

                projects.forEach((val) => {

                  let formatDate = val.updateddate
                  let newFormatDate = new Date(formatDate)
                  let currenttime = new Date().getTime();
                  let expiredtime = newFormatDate.getTime();
                  let diff = expiredtime - val.startdate;
                  let test = currenttime - val.startdate;
                  let daysuntil = Math.abs(diff / 1000 / 60 / 60 / 24);
                  let updateday = Math.abs(test / 1000 / 60 / 60 / 24);
                  //maps through product list to calculate percentage of amount complete
                  let testPercent = Math.round(updateday / daysuntil * 99)


                  fetch('https://polar-shore-33711.herokuapp.com/updatedate', {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      id: val.id,
                      percentage: testPercent > 100 ? testPercent = 100 : testPercent,
                      date: formatDate,
                      key: val.keyid
                    })
                  })
                    //use updatedate route to update percentage
                    .then(response => response.json())
                    .then(changes => {

                      fetch('https://polar-shore-33711.herokuapp.com/loadprojects', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          email: this.state.signInEmail,
                        })
                      })
                        //responds with correct data
                        .then(response => response.json())
                        .then(projects => {
                          this.props.loadUserProjects(projects)
                          this.props.onRouteChange('home');
                        })
                    });
                });
              }

            });
        } else {

          this.props.onRouteChange('signin');
        }
      });



  }

  handleKeyPress = (event) => {

    if (event.key === "Enter") {
      this.onSubmitSignIn()
    }
  }


  render() {
    const { onRouteChange } = this.props;
    return (

      <>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80 ">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph1 mh0">Track-A-Dilly</legend>
              <section></section>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={this.onEmailChange} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={this.onPasswordChange}
                  onKeyPress={this.handleKeyPress} />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                required />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
      <article className="center">
        <section className="roboto db fw4 lh-copy f5">
           <br>
           </br>
          <div>
            What's a dilly? <br>
           </br>An excellent example of a particular type of thing.
          </div>   
          <br>
           </br>
          <div>

            What's Track-A-Dilly? <br>
           </br>A simple, two progress bar app, that helps
           <br></br> track  those excellent projects easily!
           <br>
           </br>
           <br>
           </br>
           <img src={dualbars} height="150px"  alt="logo"/> </div>
          <br>
          </br>
           <div>
           Sign in and start tracking projects now!
          </div>
          <br>
           </br>
        </section>
        </article></>


    );

  }
}

export default Signin;