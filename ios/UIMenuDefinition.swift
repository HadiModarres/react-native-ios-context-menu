import Foundation


protocol UIMenuChildDefinition: Codable {
    
}

struct UIImageDefinition: Codable {
    let systemName: String
}


struct UIActionDefinition: Codable {
    let title: String
    let subtitle: String?
    let image: UIImageDefinition?
    let handler: String?
}

struct UIMenuDefinition: Codable {
    
    enum Child : Codable {
        case action(value: UIActionDefinition)
        case menu(value: UIMenuDefinition)
    }
    
    let title: String
    let subtitle: String?
    let image: UIImageDefinition?
    let children: [Child]?
    
}


class MenuUtils {
    
    static func buildUIMenuFromDefinition(uiMenuDefinition: UIMenuDefinition, onTriggerHandler:  @escaping( String)->Void ) -> UIMenu {
        // complete
        var menuItems: [UIMenuElement] = []
        
        
        if let children = uiMenuDefinition.children {
            for child in children {
                switch child {
                case .action(let actionDefinition):
                    var image: UIImage? = nil
                    if let imageDefinition = actionDefinition.image{
                        image = UIImage(systemName: imageDefinition.systemName)
                    }
                    if #available(iOS 15.0, *){
                        
                        
                        
                        let action = UIAction(
                            title: actionDefinition.title,
                            subtitle: actionDefinition.subtitle,
                            image: image,
                            identifier: nil,
                            handler: { _ in
                                if let handler = actionDefinition.handler {
                                    onTriggerHandler(handler)
                                }
                                
                            }
                        )
                        menuItems.append(action)
                        
                    }else{
                        
                        let action = UIAction(
                            title: actionDefinition.title,
                            image: image,
                            identifier: nil,
                            handler: { _ in
                                if let handler = actionDefinition.handler {
                                    onTriggerHandler(handler)
                                }
                                
                            }
                        )
                        menuItems.append(action)
                        
                    }
                    
                case .menu(let submenuDefinition):
                    let submenu = buildUIMenuFromDefinition(uiMenuDefinition: submenuDefinition, onTriggerHandler: onTriggerHandler)
                    //                    let menu = UIMenu(title: submenuDefinition.title, children: submenu.children)
                    menuItems.append(submenu)
                }
            }
        }
        
        var image: UIImage? = nil
        if let imageDefinition = uiMenuDefinition.image{
            image = UIImage(systemName: imageDefinition.systemName)
        }
        
        if #available(iOS 15.0, *){
            
            let menu = UIMenu(title: uiMenuDefinition.title, subtitle: uiMenuDefinition.subtitle, image: image, children: menuItems)
            return menu
        } else{
            
            let menu = UIMenu(title: uiMenuDefinition.title, image: image, children: menuItems)
            return menu
        }
        
    }
}
