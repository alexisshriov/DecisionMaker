import React from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, FormInput } from 'react-native-elements';
import Modal from "react-native-modal";
import { getData, saveData } from '../api/listManager';


export default class ListManagerModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = { myKey: '', listsNames: ['list 1', 'list 2', 'list 3', 'list 4'], currentListName: '' }
  }

  componentDidMount() {
    // getData('LISTS')
    // try {
    //   const value = await AsyncStorage.getItem(this.state.store + 'listsNames');
    //   this.setState({ listsNames: value });
    // } catch (error) {
    //   console.log("Error retrieving data" + error);
    // }
  }

  
  handleTextChange = (name) => {
    this.setState({ currentListName: name });
  }

  saveList = () => {
    // saving the list name in the the list array
    this.setState({ listsNames: [...this.state.listsNames, this.state.currentListName] }, () => {
      saveData('LISTS', JSON.stringify(this.state.listsNames))
      // this.saveData(this.state.currentListName, JSON.stringify(this.props.listsNames))
    });

    this.props.saveList(this.state.currentListName)
    this.props.toggleModal('')
    

    // Saving the list contents
    
  }

  loadList = () => {
    // console.log('inside load list')
    // debugger
    debugger
    this.props.toggleModal('')
    this.props.loadList(this.state.currentListName)
    // debugger

  }

  handlePress(listName) {
    debugger
    this.setState({currentListName: listName})
  }

  render() {
    const buttonTitle = `${this.props.mode} List`;
    const buttonAction = this.props.mode == 'save'?this.saveList:this.loadList;

    return (
      <View>
        <ScrollView>
          <Card >
            <View style={styles.container}>
              <Modal isVisible={this.props.isVisible} onRequestClose={() => { }}>
                <View style={styles.modalContent}>
                  <Text>{this.props.mode} list</Text>
                  <FormInput onChangeText={this.handleTextChange} value={this.state.currentListName} />
                  <FlatList style={styles.list}
                    data={this.state.listsNames}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => this.handlePress(item)}>
                        <View>
                          <Text>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />                 
                  <Button title = {buttonTitle} onPress={buttonAction} />

                  
                  <TouchableOpacity onPress={() => this.props.toggleModal('')}>
                    <View style={styles.button}>
                      <Text>{this.state.myKey}</Text>
                    </View>
                  </TouchableOpacity>
               
                </View>
              </Modal>
            </View>
          </Card>
        </ScrollView>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'darkgray',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

