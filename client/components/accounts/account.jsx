import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { createContainer } from 'meteor/react-meteor-data';
 
class AccountsUIWrapper extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
  render() {
    return <span ref="container" />;
  }
}

const Account = (props) => {
  if(props.user){
    return props.children;
  }

  return <AccountsUIWrapper/>;
}

const AccountContainer = createContainer(()=>{
  return{
    user : Meteor.user()
  };
}, Account);

export default AccountContainer;