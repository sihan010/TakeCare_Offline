import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Keys from '../../constants/asyncStorageKeys.json';
import Language from './Language';
import UserType from './UserType';
import Login from './Login';
import Register from './Register';
import Loading from '../../components/Loading';

class StartUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedComp: null,
            loading: true,
            type:null,
            lang:null
        };
    }

    componentDidMount() {
        AsyncStorage.getItem(Keys.Language).then(lang => {
           lang=JSON.parse(lang);
           AsyncStorage.getItem(Keys.Type).then(type=>{
            type=JSON.parse(type);
                if (!lang || !type) {
                    this.setState({
                        selectedComp: 1,
                        loading: false
                    });
                }
                else{
                    this.setState({
                        lang:lang,
                        type:type,
                        selectedComp: 3,
                        loading: false
                    });
                }
           });
        });
    }

    changeUSerType = () =>{
        this.setState({
            selectedComp:2
        });
    }

    languageComplete = (v) => {
        this.setState({
            selectedComp: 2,
            loading: false,
            lang:v
        });
    }

    typeComplete=(v) =>{
        this.setState({
            selectedComp: 3,
            loading: false,
            type:v
        });
    }

    loginComplete = (v) =>{
        if(v){
            console.log('sign in');
            this.props.typeSelector(this.state.type);
        }
        else{
            this.setState({
                selectedComp: 4,
                loading: false
            });
        }
    }

    registerComplete = (v) =>{
        if(v){
            console.log('sign up');
            this.setState({
                selectedComp: 3,
                loading: false
            });
        }
        else{
            this.setState({
                selectedComp: 3,
                loading: false
            });
        }
    }

    render() {
        let comp;
        if (this.state.loading) {
            comp = <Loading />;
        }
        else {
            switch (this.state.selectedComp) {
                case 1: comp = <Language complete={(v)=>this.languageComplete(v)} />; break;
                case 2: comp = <UserType complete={(v)=>this.typeComplete(v)} />; break;
                case 3: comp = <Login complete={(v)=>this.loginComplete(v)} type={this.state.type} change={()=>this.changeUSerType()} />; break;
                case 4: comp = <Register complete={(v)=>this.registerComplete(v)} change={()=>this.changeUSerType()} />; break;
                default: comp = <Language />;
            }
        }
        return comp;
    }
}

export default StartUp;