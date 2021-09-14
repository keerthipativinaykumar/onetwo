import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import axios from 'axios';
import { EmpData, empdata } from './allSchemas';


const Realm = require('realm');
const empdatabaseOptions = {
  path: 'empTest.realm',
  schema: [EmpData],
  schemaVersion: 0
};
// type Props = {};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { emp: null, size: 0, runTime: 0,text: '',};
  }
  UNSAFE_componentWillMount() {
    Realm.open(empdatabaseOptions).then(realm => {
      this.setState({ size: realm.objects(empdata).length });
    });
  }
  downloademp() {
    const startTime = new Date().getTime();
    axios.get('http://myhrms.net/hrms_info/Logincheck.php?user=9317380&pwd=sai123&deviceid=mc123')
      .then(response => {
        Realm.open(empdatabaseOptions).then(realm => {
          realm.write(() => {
            response.empdata.forEach(obj => {
              if (realm.objects(empdata).filtered(`emp_code=${obj.emp_code}`).length === 0) {
                realm.create(empdata, obj);
              }
            });
            this.setState({ size: realm.objects(empdata).length });
            const endTime = new Date().getTime();
            this.setState({ runTime: endTime - startTime });
          });
        });
      });
  }
  // uploadEvents() {
  // }
  // clearAllEvents() {
  //   const startTime = new Date().getTime();
  //   Realm.open(databaseOptions)
  //   .then(realm => {
  //        realm.write(() => {
  //          const allEvents = realm.objects(EVENTS_SCHEMA);
  //          realm.delete(allEvents); // Deletes all books
  //          this.setState({ size: realm.objects(EVENTS_SCHEMA).length });
  //          const endTime = new Date().getTime();
  //          this.setState({ runTime: endTime - startTime });
  //        })
  //   })
  //   .catch(error => {
  //   });
  // }
  // findID() {
  //   const startTime = new Date().getTime();
  //     const text = this.state.text;
  //   Realm.open(databaseOptions).then(realm => {
  //     const res = realm.objects(EVENTS_SCHEMA).filtered(`EventID=${text}`)
  //     this.setState({ findName: res[0].EventID + ': ' + res[0].EventName })
  //     const endTime = new Date().getTime();
  //     this.setState({ runTime: endTime - startTime });
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  // }
  // findName() {
  //   const startTime = new Date().getTime();
  //   const text = this.state.text;
  //   Realm.open(databaseOptions).then(realm => {
  //     const res = realm.objects(EVENTS_SCHEMA).filtered(`EventName="${text}"`)
  //     this.setState({ findName: res[0].EventID + ': ' + res[0].EventName })
  //     const endTime = new Date().getTime();
  //     this.setState({ runTime: endTime - startTime });
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  // }
  // updateName() {
  //   const startTime = new Date().getTime();
  //   const updateText = this.state.updateText;
  //   const text = this.state.text;
  //   Realm.open(databaseOptions).then(realm => {
  //     let target = realm.objects(EVENTS_SCHEMA).filtered(`EventID=${text}`)[0];
  //     if (!target) {
  //       target = realm.objects(EVENTS_SCHEMA).filtered(`EventName=${text}`)[0];
  //     }
  //     realm.write(() => {
  //       target.EventName = updateText;
  //     })
  //     const endTime = new Date().getTime();
  //     this.setState({ runTime: endTime - startTime });
  //   })
  // }
  render() {
    const info = 'Number of items in this Realm: ' + this.state.size
    return (
      <View >
        <Text>
          {info}
        </Text>
        <Text>
          Execution time: {this.state.runTime} ms
        </Text>
        <Button onPress={this.downloademp.bind(this)} title="Download" />
        {/* <Button onPress={this.uploadEvents.bind(this)} title="Upload" /> */}
        {/* <Button onPress={this.clearAllEvents.bind(this)} title="Delete All" /> */}
        {/* <TextInput
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        /> */}
        {/* <Button onPress={this.findID.bind(this)} title="Find by ID" />
        <Button onPress={this.findName.bind(this)} title="Find by Name" /> */}
        {/* <Text>
          Find user: {this.state.findName}
        </Text>
        <Text>
          Update above user name to:
        </Text>
        <TextInput
          onChangeText={(updateText) => this.setState({ updateText })}
          value={this.state.updateText}
        /> */}
        {/* <Button onPress={this.updateName.bind(this)} title="Update Name" /> */}
      </View>
    );
  }
}