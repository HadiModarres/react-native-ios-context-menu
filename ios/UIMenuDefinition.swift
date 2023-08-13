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
        let newMenu = UIMenu(title: uiMenuDefinition.title)
        return newMenu
    }
}
