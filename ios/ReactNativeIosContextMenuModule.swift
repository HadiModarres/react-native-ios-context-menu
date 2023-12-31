import ExpoModulesCore

public class ReactNativeIosContextMenuModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ReactNativeIosContextMenu')` in JavaScript.
        Name("ReactNativeIosContextMenu")
        
        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants([
            "PI": Double.pi
        ])
        
        // Defines event names that the module can send to JavaScript.
        //        Events("onChange","willDisplay", "willEnd", "handlerTrigger")
        
        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("hello") {
            return "Hello world! 👋"
        }
        
        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("setValueAsync") { (value: String) in
            // Send an event to JavaScript.
            self.sendEvent("onChange", [
                "value": value
            ])
        }
        
        // Enables the module to be used as a native view. Definition components that are accepted as part of the
        // view definition: Prop, Events.
        View(ReactNativeIosContextMenuView.self) {
            Events("onWillDisplay", "onWillEnd", "onTriggerHandler")
            // Defines a setter for the `name` prop.
            Prop("menu") { (view: ReactNativeIosContextMenuView, prop: String) in
                
                print(prop)
                
                let decoder = JSONDecoder()
                
                do{
                    
                    let jsonData = prop.data(using: .utf8)!
                    let specs = try decoder.decode(UIMenuDefinition.self, from: jsonData)
                    
                    
                    print(specs)
                    
                    view.menuDefinition = specs
                    view.rebuildMenu()
                    
                } catch {
                    print("an error occurred \(error)")
                }
            }
            
            Prop("showPreview") { (view: ReactNativeIosContextMenuView, prop: Bool) in
                view.showPreview = prop
            }
            
            Prop("id") { (view: ReactNativeIosContextMenuView, prop: String) in
                view.id = prop
            }
            
            
        }
    }
}
