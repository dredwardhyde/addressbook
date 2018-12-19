import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap'
import update from 'react-addons-update'
import React from 'react';
import {ContactContainer} from './ContactContainer'
import {ifNoAuthorizedRedirect} from '../Pages/UniversalListActions';
import * as url from '../Common/Url';
import {TitleConverter} from '../Common/Utils';
import RichTextEditor from 'react-rte';

export class PersonComponent extends React.Component {

    state = {
        person: {},
        contactList: {
            data: []
        },
        resume: RichTextEditor.createEmptyValue()
    };

    handleChange(e, v) {
        this.setState(update(this.state, {person: {[e]: {$set:v.currentTarget.value}}}));
    }

    constructor(props) {
        super(props);
        this.state = {
            person: props.person,
            contactList: {
                data: []
            },
            invalidFields: new Set(),
            resume: RichTextEditor.createValueFromString(props.person['resume'], 'html')
        };
    }

    clearContactList = () => {
        this.setState(update(this.state, {contactList: {data: {$set:undefined}}}));
    };

    onChangeResume = (value) => {
        this.setState(update(this.state, {person: {resume: {$set:value.toString('html')}}, resume: {$set:value}}));
    };

    getContactList = (id) => {
        let isOk = false;
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        fetch(url.GET_CONTACT_LIST + '?personId=' + id, {
            method: 'post',
            credentials: 'include',
            headers: headers
        }).then(response => {
            ifNoAuthorizedRedirect(response);
            isOk = response.ok;
            return response.json()
        }).then(json => {
            if (isOk) {
                this.setState({contactList: json.data});
            }
        })
    };

    savePerson = () => {
        let savedPerson;
        let isOk = false;
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        fetch(url.SAVE_PERSON, {
            method: 'post',
            credentials: 'include',
            headers: headers,
            body: JSON.stringify(this.state.person)
        }).then(response => {
            ifNoAuthorizedRedirect(response);
            isOk = response.ok;
            return response.json()
        }).then(json => {
            if (isOk) {
                savedPerson = json.data;
                fetch(url.SAVE_CONTACT_LIST, {
                    method: 'post',
                    credentials: 'include',
                    headers: headers,
                    body: this.container.getJson()
                }).then(response => {
                    ifNoAuthorizedRedirect(response);
                    isOk = response.ok;
                    return response.json()
                }).then(json => {
                    if (isOk) {
                        if(this.props.forUpdate)
                            this.setState(update(this.state, {person: {$set: savedPerson}, contactList: {data: {$set:json.data}}}));
                        this.props.onUpdate(savedPerson);
                    }
                })
            }
        })
    };

    componentDidMount() {
        if(this.state.person['id'] !== undefined && this.props.forUpdate)
            this.getContactList(this.state.person['id']);
        else
            this.clearContactList();
    }

    getValidationState(field) {
        if(this.state.person[field] === undefined || this.state.person[field] === null) {
            this.state.invalidFields.add(field);
            return 'error';
        }
        const length = this.state.person[field].length;
        if (length > 10) {
            this.state.invalidFields.delete(field);
            return 'success';
        } else if (length > 5) {
            this.state.invalidFields.delete(field);
            return 'warning';
        } else if (length >= 0) {
            this.state.invalidFields.add(field);
            return 'error';
        }
        return null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.person !== this.state.person) {
            this.getContactList(nextProps.person['id']);
            this.setState({ person: nextProps.person, resume: RichTextEditor.createValueFromString(nextProps.person['resume'], 'html') });
        }
    }

    getFieldFormControl(field, fieldType){
        if(fieldType === 'text'){
            return  <FormControl
                type='text'
                value={this.state.person[field]}
                placeholder={'Enter ' + TitleConverter.preparePlaceHolder(TitleConverter.prepareTitle(field))}
                onChange={this.handleChange.bind(this, field)}
            />;
        }
    }

    getFieldForm(field, fieldType){
        return <form>
            <FormGroup
                controlId={field}
                validationState={this.getValidationState(field)}>
                <ControlLabel>{TitleConverter.prepareTitle(field)}</ControlLabel>
                {this.getFieldFormControl(field, fieldType)}
                <FormControl.Feedback />
            </FormGroup>
        </form>;
    }

    render() {
        return (
            <div>
                <div style={{width: '50%', display: 'inline-block', verticalAlign: 'top', paddingLeft: '5px'}}>
                    {this.getFieldForm('firstName', 'text')}
                    {this.getFieldForm('lastName', 'text')}
                    {this.getFieldForm('salary', 'text')}
                    <RichTextEditor
                        placeholder='Resume'
                        editorStyle={{minHeight: 220 }}
                        value={this.state.resume}
                        onChange={this.onChangeResume}
                    />
                    <Button onClick={this.savePerson} disabled={this.state.invalidFields.size !== 0}>
                        Save contacts
                    </Button>
                </div>
                <div style={{width: 'calc(50% - 10px)', display: 'inline-block', verticalAlign: 'top',marginTop: '35px', marginLeft: '5px', marginRight: '5px'}}>
                    <ContactContainer personId={this.state.person['id']} ref={(input) => { this.container = input; if(input !== null) input.addFullContact(this.state.contactList.data);}}/>
                </div>
            </div>
        );
    }
}