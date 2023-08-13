import Foundation


protocol UIMenuChildDefinition: Codable {
    
}


struct UIActionDefinition: Codable {
    let title: String
    let subtitle: String?
}

struct UIMenuDefinition: Codable {
    
    enum Child : Codable {
        case action(value: UIActionDefinition)
        case menu(value: UIMenuDefinition)
    }
    
    let title: String
    let subtitle: String?
    let children: [Child]?
    
}


class MenuUtils {
    
    static func buildUIMenuFromDefinition(uiMenuDefinition: UIMenuDefinition) -> UIMenu {
        // complete
        var menuItems: [UIMenuElement] = []
        
        if let children = uiMenuDefinition.children {
            for child in children {
                switch child {
                case .action(let actionDefinition):
                    if #available(iOS 15.0, *){
                        
                        let action = UIAction(
                            title: actionDefinition.title,
                            subtitle: actionDefinition.subtitle,
                            image: nil,
                            identifier: nil,
                            handler: { _ in /* Handle action here */ }
                        )
                        menuItems.append(action)
                        
                    }else{
                        
                        let action = UIAction(
                            title: actionDefinition.title,
                            image: nil,
                            identifier: nil,
                            handler: { _ in /* Handle action here */ }
                        )
                        menuItems.append(action)
                        
                    }
                    
                case .menu(let submenuDefinition):
                    let submenu = buildUIMenuFromDefinition(uiMenuDefinition: submenuDefinition)
                    //                    let menu = UIMenu(title: submenuDefinition.title, children: submenu.children)
                    menuItems.append(submenu)
                }
            }
        }
        
        let menu = UIMenu(title: uiMenuDefinition.title, children: menuItems)
        return menu
    }
}
