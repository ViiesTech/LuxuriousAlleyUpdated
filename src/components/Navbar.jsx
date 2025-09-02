import { Home, Message, ShoppingCart, User } from "iconsax-react-native";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Color } from "../../lux/src/utils/Colors";
import { useNavigation } from "../../lux/src/utils/NavigationContext";

const { width, height } = Dimensions.get('window');
const NavBar = () => {
    const { navigate } = useNavigation();
    return (
        <View style={{position: 'absolute', bottom: 0, flexDirection: 'row', backgroundColor: Color('navbarBackground'), borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingVertical: height * 0.015}}>
            <TouchableOpacity onPress={() => navigate('Home')} style={{flex: 1, alignItems: 'center', padding: 10}}>
                <Home size="25" color={Color('navbarIcon')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Inbox')} style={{flex: 1, alignItems: 'center', padding: 10}}>
                <Message size="25" color={Color('navbarIcon')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Cart')} style={{flex: 1, alignItems: 'center', padding: 10}}>
                <ShoppingCart size="25" color={Color('navbarIcon')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('MyProfile')} style={{flex: 1, alignItems: 'center', padding: 10}}>
                <User size="25" color={Color('navbarIcon')} />
            </TouchableOpacity>
        </View>
    )
}

export default NavBar;