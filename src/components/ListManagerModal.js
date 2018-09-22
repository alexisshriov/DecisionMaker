import React from 'react';
import Modal from "react-native-modal";
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Button, FormInput, Card, ListItem } from 'react-native-elements'
import { AsyncStorage } from "react-native"

export default class ListManagerModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = { myKey: '', store: '@RandomeChooser:', listsNames: ['list 1', 'list 2', 'list 3', 'list 4'], currentListName: '' }
  }

  async saveData(key, value) {
    try {
      await AsyncStorage.setItem(this.state.store + key, value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  componentDidMount() {
    // try {
    //   const value = await AsyncStorage.getItem(this.state.store + 'listsNames');
    //   this.setState({ listsNames: value });
    // } catch (error) {
    //   console.log("Error retrieving data" + error);
    // }
  }

  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(this.state.store + key);
      this.setState({ myKey: value });
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }
  
  handleTextChange = (name) => {
    this.setState({ currentListName: name });
  }

  saveList = () => {
    this.setState({ listsNames: [...this.state.listsNames, this.state.currentListName] }, () => {
      this.setState({listsNames: [...this.listsNames, this.state.currentListName]})
    });
    this.saveData(this.state.currentListName, JSON.stringify(this.props.listItems))
  }

  loadList = () => {
    this.getData('TEST_KEY')
  }

  render() {

    return (
      <View>
        <ScrollView>
          <Card >
            <View style={styles.container}>
              <Modal isVisible={this.props.isVisible} onRequestClose={() => { }}>
                <View style={styles.modalContent}>
                  <Text>Hello!</Text>
                  <FormInput onChangeText={this.handleTextChange} value={this.state.currentListName} />
                  <FlatList style={styles.list}
                    data={this.state.listsNames}
                    renderItem={({ item }) => (
                      <TouchableOpacity>
                        <View>
                          <Text>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />

                  <Button title='save keys' onPress={this.saveList} />
                  <Button title='get key' onPress={this.loadList} />
                  
                  <TouchableOpacity onPress={this.props.toggleModal}>
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

