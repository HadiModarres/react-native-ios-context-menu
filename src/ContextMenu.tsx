import React, { ReactNode } from "react"
import {  View, Text, AppRegistry } from "react-native"
import { UIMenuDefinition } from "./ReactNativeIosContextMenu.types"
import ReactNativeIosContextMenuView from "./ReactNativeIosContextMenuView"

const ContextMenuPreview = ()=>{
    return (<View style={{width:'100%', 
    height: '100%', 
    backgroundColor:'red', 
    alignItems:'center', 
    justifyContent:'center',
    borderColor:'white',
    borderWidth:12

    }}>
       <Text>context menu preview</Text> 
    </View>)
}


AppRegistry.registerSection('ContextMenuPreview',()=>ContextMenuPreview)

type ContextMenuProps = {
    children: ReactNode
    preview: ReactNode
    menu: UIMenuDefinition
}

export const ContextMenu = ({children, preview, menu}:ContextMenuProps)=>{

    return (<ReactNativeIosContextMenuView style={{ width:300, height: 300,  borderColor: 'red', borderWidth: 1}} 
    menu={JSON.stringify(menu)}>
            <View collapsable={false}>
                {children}
            </View>
      </ReactNativeIosContextMenuView>)
        
}