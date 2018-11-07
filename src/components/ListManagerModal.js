import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, FormInput, FormValidationMessage } from 'react-native-elements';
import Modal from "react-native-modal";

import { getData, saveData } from '../api/listManager';

export default class ListManagerModal extends React.Component {

  state = { myKey: '', listsNames: [], currentListName: '', errorMessage: '' }
  store = '@RandomeChooser:';

  async componentDidMount() {
    const value = await getData('LISTS')

    if (value != null) {
      this.setState({ listsNames: JSON.parse(value) });
    }
  }

  handleTextChange = (name) => {
    this.setState({ currentListName: name });
  }

  saveList = async () => {
    if (!this.state.currentListName.trim()) {
      this.setState({ errorMessage: 'List name cannot be empty.' })
    } else if (this.props.optionsCount === 0) {
      this.setState({ errorMessage: 'The list must have at least one option.' })
    } else {
      const value = await getData('LISTS')

      if (value != null && !value.includes(this.state.currentListName)) {
        this.setState({ listsNames: JSON.parse(value) });
      }

      if (!this.state.listsNames.includes(this.state.currentListName)) {
        this.setState({ listsNames: [...this.state.listsNames, this.state.currentListName] }, () => {
          saveData('LISTS', JSON.stringify(this.state.listsNames))
        });
      }

      this.props.saveList(this.state.currentListName)
      this.toggleModal()
      this.setState({ errorMessage: '' })
    }
  }

  deleteList = async (listName) => {
    const lists = JSON.parse(await getData('LISTS'))
    const index = lists.indexOf(listName)

    if (index >= 0) {
      lists.splice(index, 1)
      saveData('LISTS', JSON.stringify(lists))
      this.setState({ listsNames: lists })
    }
  }

  loadList = () => {
    if (!this.state.currentListName.trim()) {
      this.setState({ errorMessage: 'Select a list to be loaded.' })
      return
    }
    this.toggleModal()
    this.props.loadList(this.state.currentListName)
  }

  handlePress(listName) {
    this.setState({ currentListName: listName })
  }

  toggleModal = () => {
    this.props.toggleModal('')
    this.setState({ errorMessage: '' })
  }

  render() {
    const buttonTitle = `${this.props.mode} List`;
    const buttonAction = this.props.mode == 'save' ? this.saveList : this.loadList;

    return (
      <View>
        <ScrollView>
          <Card >
            <View>
              <View style={styles.container}>
                <Modal isVisible={this.props.isVisible} onRequestClose={() => { }}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <Text>{this.props.mode} list</Text>
                      <TouchableOpacity onPress={this.toggleModal} style={{ marginLeft: 'auto' }}>
                        <View>
                          <Text>{'X'}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <FormInput onChangeText={this.handleTextChange} value={this.state.currentListName} />
                    {this.state.errorMessage ? <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage > : null}
                    <View>
                      <FlatList
                        style={styles.list}
                        data={this.state.listsNames}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => this.handlePress(item)}>
                            <View style={styles.item}>
                              <Text>{item}</Text>
                              <TouchableOpacity onPress={() => this.deleteList(item)} style={styles.eliminateList}><Text> X </Text></TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                    <Button title={buttonTitle} onPress={buttonAction} buttonStyle={{ borderRadius: 3 }} />
                  </View>
                </Modal>
              </View>
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
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  list: {
    margin: 3
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'space-between'
  },
  eliminateList: {
    borderRadius: 3,
    backgroundColor: 'gray',
    margin: 1
  },
});
