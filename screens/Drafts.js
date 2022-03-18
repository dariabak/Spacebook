import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { LoginContext } from '../LoginContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Draft from '../components/Draft';

const getDrafts = async (id, done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@post_draft' + id);
        const data = JSON.parse(jsonValue);
        console.log(data);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}


const storeDraft = async (value, id) => {
    try {
        const json = await JSON.stringify(value);
        await AsyncStorage.setItem('@post_draft' + id, json);
    } catch (e) {
        console.log(error);
    }
}

class Drafts extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            drafts: [],
            isLoading: true,
            newDrafts: []
        }
    }
    componentDidMount() {
        getDrafts(this.context.id, (data) => {
            this.setState({
                drafts: data,
                isLoading: false
            });
        });
    }
    deleteDraft = (id) => {

        let newDrafts = [];
        this.state.drafts.forEach((draft) => {
            if (draft.id != id) {
                const post = JSON.stringify({
                    id: draft.id,
                    text: draft.text
                })
                const json = JSON.parse(post);
                newDrafts = [...newDrafts, json];
            }
        });
        storeDraft(newDrafts, this.context.id);
        console.log(newDrafts);
        this.setState({
            drafts: newDrafts,
        });
    }
    render() {
        if (this.state.isLoading) {
            return (<View><Text>Loading...</Text></View>);
        } else {
            return (
                <ScrollView>
                    {this.state.drafts.map(draft =>
                        <Draft draft={draft} key={draft.id} deleteDraft={this.deleteDraft} />
                    )}
                </ScrollView>
            );
        }
    }
}

export default Drafts;