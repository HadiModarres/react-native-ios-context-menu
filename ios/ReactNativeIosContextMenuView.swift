import ExpoModulesCore
import UIKit
import Foundation
import React

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class ReactNativeIosContextMenuView: ExpoView,UIContextMenuInteractionDelegate {
    //    let subView = UIView(frame: CGRect(x: 0, y: 0, width: 300, height: 300))
    var menuDefinition: UIMenuDefinition?
    var menu: UIMenu?
    
    /**
     The required initializer that receives an instance of `AppContext`.
     Override it if the subclassing view needs to do something during initialization.
     */
    required public init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        
        clipsToBounds = true
        
        let interaction = UIContextMenuInteraction(delegate: self)
        
        self.addInteraction(interaction)
        
    }
    
    
    func contextMenuInteraction(_ interaction: UIContextMenuInteraction, willEndFor configuration: UIContextMenuConfiguration, animator: UIContextMenuInteractionAnimating?) {
        self.appContext?.eventEmitter?.sendEvent(withName: "previewWillEnd", body: ["value": "will end"])
    }
    
    func rebuildMenu(){
        if let menuDefinition = self.menuDefinition {
            print("rebuilding menu")
            self.menu = MenuUtils.buildUIMenuFromDefinition(uiMenuDefinition: menuDefinition)
            print(self.menu)
        }
    }
    
    func contextMenuInteraction(_ interaction: UIContextMenuInteraction,
                                configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration? {
        return UIContextMenuConfiguration(identifier: nil,
                                          previewProvider: {
            
            let previewViewController = UIViewController()
            
            previewViewController.modalPresentationStyle = UIModalPresentationStyle.fullScreen
            
            if let bridge = self.appContext?.reactBridge {
                let rootView = RCTRootView(bridge: bridge, moduleName: "ContextMenuPreview", initialProperties: [:])
                previewViewController.view = rootView
                
                self.appContext?.eventEmitter?.sendEvent(withName: "previewWillLoad", body: ["value": "will load"])
                
                return previewViewController
                
            }else{
                return nil
            }
        },
                                          actionProvider: {
            suggestedActions in
            
            return self.menu
//            if let title = self.menuDefinition?.title {
//
//                let inspectAction =
//                UIAction(title: NSLocalizedString(title, comment: ""),
//                         image: UIImage(systemName: "arrow.up.square")) { action in
//                    print("pressed2")
//                }
//
//
//                return UIMenu(title: "Title", children: [inspectAction])
//
//            } else {
//                return nil
//            }
            
        })
    }
    
}
