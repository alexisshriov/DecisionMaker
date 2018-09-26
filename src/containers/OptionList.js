import React from 'react';
import { AsyncStorage, Alert } from "react-native"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native';

import ListManagerModal from '../components/ListManagerModal'
import { View, ScrollView } from 'react-native';
import { Button, FormInput, Card, ListItem } from 'react-native-elements'
import * as actions from '../actions/options';
import { saveData, getData } from '../api/listManager'
//----------------------------------
import { loadList } from '../actions/options'

export class OptionList extends React.Component {

  constructor(props) {
    super(props)
    this.state = { newOption: '', selectedItemIndex: -1, isModalVisible: false }
    //this.state = { newOption: '345', options: ["option 1", "option 2", "option 3", "option 4", "option 5", "option 6", "option 7", "option 8", "option 9", "option 10", "option 11", "option 12", "option 13", "option 14", "option 15"] }
  }
  // async componentWillMount(){
  //   //AsyncStorage.setItem('testListName', JSON.stringify(['asd', 'pqr']));


  //   // AsyncStorage.getItem("testListName")
  //   // .then((user) => {
  //   //     const temp = user
  //   // })
  //   // .catch(() => {
  //   //   debugger
  //   //   this.props.isLoadingCredentials(false); // Error
  //   // });
  // }

  async componentDidMount() {
    
    // debugger
    // const options = ["option 1", "option 2", "option 3", "option 4", "option 5", "option 6", "option 7", "option 8", "option 9", "option 10", "option 11", "option 12", "option 13", "option 14", "option 15"]
    // saveData('TEST_KEY', JSON.stringify(options))
    //loadList()
    //this.props.actions.loadList('testListName')


  }

  handleTextChange = (text) => {
    this.setState({ newOption: text });
  }

  addOption = (event) => {
    //this.randomize()

    this.props.actions.addOption(this.state.newOption)
    this.setState({ newOption: '' })
    //  const updatedOptions = [...this.state.options, this.state.newOption];
    //  this.setState({options: updatedOptions});
    //  this.setState({newOption: ''});

  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomize = () => {
    // setInterval(() => {
    //   this.setState({selectedItemIndex: this.getRandomInt(0, 4)})
    //  }, 100);
    this.setState({ selectedItemIndex: this.getRandomInt(0, 4) })
  }

  deleteItem = (index) => {
    this.props.actions.deleteOption(index)
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  test  = () => {
    this.props.actions.loadList()
  }

  render() {
    return (
      <View>
        <Button title='asyn sstorage test' onPress={this.test} />
        {/* <Text style={{fontWeight: 'bold', textAlign: 'center', paddingTop:30, borderColor: 'black', borderWidth: 1}}>DECISION MAKER</Text> */}
        <FormInput onChangeText={this.handleTextChange} value={this.state.newOption} />
        <Button title='ADD ITEM' onPress={this.addOption} />
        <ScrollView>
          <Card >
            {this.props.options.map((option, index) => <ListItem key={option} title={option} containerStyle={{ backgroundColor: this.state.selectedItemIndex == index ? '#87CEEB' : 'white' }} rightIcon={{ name: "delete" }} onPressRightIcon={() => this.deleteItem(index)} />)}
            {/* <FormValidationMessage>Error message</FormValidationMessage> */}
          </Card>
        </ScrollView>
        <ListManagerModal isVisible={this.state.isModalVisible} toggleModal={this._toggleModal} listItems={this.state.options} />
        <View style={{ flex: 1 }} >
          <Button title='show modal' onPress={this._toggleModal} />
        </View>
      </View>
    );
  }
}

mapStateToProps = (state) => (
  {
    options: state.options
  }
)

mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(actions, dispatch)
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (OptionList);

