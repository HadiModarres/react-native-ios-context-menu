import { StyleSheet, Text, View } from 'react-native';

import {ContextMenu} from 'react-native-ios-context-menu'

export default function App() {
  return <ContextMenu preview={
    <View style={{width:'100%',height:'100%'}}></View>
  } menu={{
    title: 'my title', subtitle:'my subtitle', children:[{
      menu:{value: {title: 'submenu titlee', subtitle:'submenu subtitle', children:[]}}},
      {action:{value: {title:'action titlee',subtitle:'action subtitle!'}}}]
    }}>
    <Text>press me!</Text>
  </ContextMenu>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
