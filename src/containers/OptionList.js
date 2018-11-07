import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native';

import ListManagerModal from '../components/ListManagerModal'
import { View, FlatList } from 'react-native';
import { Button, FormInput, Card, ListItem, FormValidationMessage } from 'react-native-elements'
import * as actions from '../actions/options';

export class OptionList extends React.Component {

  constructor(props) {
    super(props)
    this.state = { newOption: '', selectedItemIndex: -1, isModalVisible: false, managerMode: '', errorMessage: '' }
  }

  handleTextChange = (text) => {
    this.setState({ newOption: text });
  }

  addOption = (event) => {
    if (!this.state.newOption.trim()) {
      this.setState({ errorMessage: 'This field cannot be empty.' })
    }
    else {
      this.props.actions.addOption(this.state.newOption)
      this.setState({ newOption: '', errorMessage: '' })
    }
  }

  saveList = (listName) => {
    this.props.actions.saveList(listName, this.props.options)
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomize = () => {
    const randomIndex = this.getRandomInt(0, this.props.options.length - 1)
    this.setState({ selectedItemIndex: randomIndex })

    this.flatListRef.scrollToIndex({animated: true, index: randomIndex, viewPosition: 0.5});
  }

  deleteItem = (index) => {
    this.props.actions.deleteOption(index)
    this.setState({ selectedItemIndex: -1 })
  }

  _toggleModal = (managerMode) => {
    this.setState({ managerMode: managerMode, isModalVisible: !this.state.isModalVisible });
  }

  loadList = (listName) => {
    this.props.actions.loadList(listName)
    this.setState({ errorMessage: '', selectedItemIndex: -1 })
  }

  emptyList = () => {
    this.props.actions.emptyList()
  }
  
  render() {

    const selectedIndex = this.state.selectedItemIndex

    
    return (
      <View style={{ marginTop: 50, flex: 1 }} >
        <View style={{ flex: 1, flexDirection: 'row' }} >
          <Button buttonStyle={{borderRadius: 3, height: 30}} title='Save list' onPress={() => this._toggleModal('save')} />
          <Button buttonStyle={{borderRadius: 3, height: 30}} title='Load list' onPress={() => this._toggleModal('load')} />
          <Button buttonStyle={{borderRadius: 3, height: 30}} title='Empty list' onPress={this.emptyList} />
        </View>

       <View style={{flex: 4}} >
          <FormInput placeholder={'Add your new option here...'} onChangeText={this.handleTextChange} value={this.state.newOption} />
          {this.state.errorMessage ? <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage > : null}
          <Button buttonStyle={{ margin: 3,  borderRadius: 3 }} title='ADD OPTION' onPress={this.addOption} />
          <Button buttonStyle={{ margin: 3, borderRadius: 3, backgroundColor: '#87CEEB' }} title='CHOSE RANDOMLY' onPress={this.randomize} />
        </View>

        <View style={{ flex: 9 }}>
          <Card >
            <FlatList
              data={this.props.options}
              ref={(ref) => { this.flatListRef = ref; }}
              extraData={this.state.selectedItemIndex}
              renderItem={({ item, index }) => (
                <ListItem 
                  key={item} 
                  title={item} 
                  containerStyle={{ backgroundColor: selectedIndex === index ? '#17ECEC' : 'white' }} 
                  rightIcon={{ name: "delete" }} 
                  onPressRightIcon={() => this.deleteItem(index)} />
              )}
            />
          </Card>
        </View>
        <View style = {{flex: 1}}>
           <ListManagerModal isVisible={this.state.isModalVisible} toggleModal={this._toggleModal} listItems={this.state.options} mode={this.state.managerMode} saveList={this.saveList} loadList={this.loadList} optionsCount = {this.props.options.length} />
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

