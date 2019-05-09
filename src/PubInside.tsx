import React, {Component} from "react";
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import api from "./api";
import {Beverage, BeverageType} from "./types";

interface Props {
    username: string,
    logout: () => void
}

interface State {
    beverageTypes: BeverageType[],
    myBeverages: Beverage[],
}

export default class PubInside extends Component<Props, State> {
    state = {
        beverageTypes: [],
        myBeverages: [],
    };

    async componentDidMount() {
        const beverages = await api.fetchBeverages();
        this.setState(beverages);
    }

    addBeverage = async (beverageTypeId: number) => {
      await api.addBeverage(beverageTypeId);
        const beverages = await api.fetchBeverages();
        this.setState(beverages);
    };

    render(): React.ReactNode {

        const {username} = this.props;
        const {beverageTypes, myBeverages} = this.state;

        return <View style={styles.container}>
            <View>
                <Text style={[styles.title, {textAlign: "center"}]}>Szia {username}!</Text>

                <Text style={styles.title}>Kínálat</Text>
                <View style={styles.beverageTypePanel}>
                    {beverageTypes.map(
                        (type: BeverageType) =>
                            <TouchableOpacity key={type.id} onPress={() => this.addBeverage(type.id)}>

                                <BeverageTypeProfile type={type}/>
                            </TouchableOpacity>

                    )}
                </View>

                <Text style={styles.title}>Asztalodon</Text>
                <ScrollView horizontal contentContainerStyle={styles.cartPanel}>
                    {myBeverages.map((beverage: Beverage) =>
                        <BeverageTypeProfile key={beverage.id} type={beverage.beverageType}/>
                    )}
                </ScrollView>
            </View>

            <Button title={"logout"} onPress={this.props.logout}/>

        </View>;
    }
}

const BeverageTypeProfile = ({type}: { type: BeverageType }) =>
    <View style={styles.beverageType}>
        <Image style={[styles.beverageImage, type.alcoholic && styles.beverageImageAlcoholic]}
               source={{uri: type.pictureUrl}}
               resizeMode={"cover"}/>
        <Text style={styles.beverageLabel}>{type.name}</Text>
        <Text style={styles.beverageLabel}>{type.price} coin</Text>
    </View>;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    beverageTypePanel: {
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    beverageImage: {
        width: 60,
        height: 60,

        borderRadius: 40,
    },
    beverageImageAlcoholic: {
        borderWidth: 3,
        borderColor: 'red'
    },

    beverageLabel: {
        textAlign: "center"
    },

    beverageType: {
        // backgroundColor: 'red',
    },

    cartPanel: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }

});