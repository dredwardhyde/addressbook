import React from 'react';
import {Contact} from './Contact';
import {Button} from 'react-bootstrap';

export class ContactContainer extends React.Component {

    state = {
        contacts: new Map(),
        conRefs: new Map()
    };

    addFullContact =(contacts) => {
        if(contacts !== undefined){
            let contactsMap = new Map();
            let delFunc = this.deleteContact;
            let conRefsLocal = this.state.conRefs;
            contacts.forEach(function(element, index, array){
                let newCon = <Contact key={element.id} data={element} ref={(input) => { conRefsLocal.set(element.id, input); }} id={element.id} deleteContact={delFunc}/>;
                contactsMap.set(newCon.key, newCon);
            });
            this.setState({ contacts: contactsMap, conRefs: conRefsLocal});
        }
    };

    addEmptyContact = () =>{
        let contacts = new Map(this.state.contacts);
        let id = ContactContainer.getId();
        let newCon = <Contact key={id} data={{}} ref={(input) => { this.state.conRefs.set(id, input); }} id={id} deleteContact={this.deleteContact}/>;
        contacts.set(newCon.key, newCon);
        this.setState({ contacts: contacts });
    };

    static getId(){
        return Math.floor(Math.random() * 10000);
    }

    getJson = () =>{
        let contacts = '[';
        this.state.conRefs.forEach(function(value, key, map){
            if(value !== null) contacts += value.toJson() + ', ';
        });
        contacts = contacts.substring(0, contacts.length - 2);
        contacts +=  ']';
        return contacts;
    };

    deleteContact = (params) =>{
        let contacts = new Map(this.state.contacts);
        contacts.delete(params.id + '');
        this.state.conRefs.delete(params.id);
        this.setState({ contacts: contacts });
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button style={{width: '100%', marginBottom: '5px', marginTop: '-10px'}} onClick={this.addEmptyContact}>Add contact</Button>
                {this.state.contacts}
            </div>
        );
    }
}