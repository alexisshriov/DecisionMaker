import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert, Text, TextInput, TouchableOpacity, StyleSheet, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ListManagerModal from '../components/ListManagerModal'
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

  deleteOption = (index) => {
    console.log('insideeee')
    this.props.actions.deleteOption(index)
    this.setState({ selectedItemIndex: -1 })
  }

  saveList = (listName) => {
    this.props.actions.saveList(listName, this.props.options)
  }

  loadList = (listName) => {
    this.props.actions.loadList(listName)
    this.setState({ errorMessage: '', selectedItemIndex: -1 })
  }

  emptyList = () => {
    this.props.actions.emptyList()
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  chooseRandomly = () => {
    if (this.props.options.length === 0) {
      return
    }
    const randomIndex = this.getRandomInt(0, this.props.options.length - 1)
    this.setState({ selectedItemIndex: randomIndex })
    this.flatListRef.scrollToIndex({ animated: true, index: randomIndex, viewPosition: 0.5 });
  }

  toggleModal = (managerMode) => {
    this.setState({ managerMode: managerMode, isModalVisible: !this.state.isModalVisible });
  }

  render() {

    const selectedIndex = this.state.selectedItemIndex

    return (
      <View style={styles.container} >
        <View style={styles.listOptions} >
          <TouchableOpacity onPress={() => this.toggleModal('save')}>
            <View style={styles.smallButton}>
              <Text style={{ color: 'white' }}>
                Save list
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleModal('load')}>
            <View style={styles.smallButton}>
              <Text style={{ color: 'white' }}>
                Load list
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.emptyList}>
            <View style={styles.smallButton}>
              <Text style={{ color: 'white' }}>
                Empty list
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4 }} >
          <TextInput
            style={styles.input}
            value={this.state.newOption}
            onChangeText={this.handleTextChange}
            placeholder={'Add your new option here...'}
          />
          {this.state.errorMessage ? <Text style={styles.errorMessage}>{this.state.errorMessage}</Text > : null}
          <TouchableOpacity onPress={this.addOption}>
            <View style={styles.bigButton}>
              <Text style={{ color: 'white' }}>
                ADD OPTION
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.chooseRandomly}>
            <View style={[styles.bigButton, { backgroundColor: '#87CEEB' }]}>
              <Text style={{ color: 'white' }}>
                CHOOSE RANDOMLY
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 9 }}>
          <View style={styles.listContainer} >
            <FlatList
              data={this.props.options}
              ref={(ref) => { this.flatListRef = ref; }}
              extraData={this.state.selectedItemIndex}
              renderItem={({ item, index }) => (
                <View key={item} style={ [styles.option, {backgroundColor: selectedIndex === index ? '#17ECEC' : 'white'}] }>
                  <Text>{item}</Text>
                  <TouchableOpacity onPress={() => this.deleteOption(index)}>
                    <Icon name="trash" size={30} color="#999999" />
                  </TouchableOpacity>
                </View >
              )}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <ListManagerModal isVisible={this.state.isModalVisible} toggleModal={this.toggleModal} listItems={this.state.options} mode={this.state.managerMode} saveList={this.saveList} loadList={this.loadList} optionsCount={this.props.options.length} />
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

const styles = StyleSheet.create({
  listOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15
  },
  container: {
    marginTop: 50,
    flex: 1
  },
  smallButton: {
    backgroundColor: '#999999',
    margin: 3,
    borderRadius: 3,
    paddingTop: 6,
    paddingLeft: 12,
    paddingBottom: 6,
    paddingRight: 12,
    alignItems: 'center',
    width: 90
  },
  bigButton: {
    alignItems: 'center',
    backgroundColor: '#999999',
    margin: 3,
    borderRadius: 3,
    padding: 12,
    marginLeft: 17,
    marginRight: 17
  },
  input: {
    marginHorizontal: 15,
    padding: 7
  },
  listContainer: {
    marginHorizontal: 17,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 10
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 3
  },
  errorMessage: {
    color: 'red',
    marginLeft: 17,
    marginBottom: 10
  }
});
