import { useEffect, useState,  } from "react"; 
import { FlatList, View, Text, Image, TouchableOpacity} from "react-native"; 
import {styles} from '../styles/style';
import cadeado from '../assets/cadeado.png';
import detailsScreen from "./detailsScreen";
import { useNavigation } from '@react-navigation/native';
//teste de commit final
export default function HomeScreen() {
    const navigation = useNavigation();
    const [armarios, setArmarios] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/armarios")
            .then((response) => response.json())
            .then((data) => setArmarios(data))
            .catch((error) => console.error("Erro ao buscar armários:", error));
    }, []);


    return (
        <View style={styles.list}>
        <FlatList
            data={armarios}
            numColumns={5}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                let status = {}
                if (item.status === 0)
                    status=styles.itemgradelivre;
                else if (item.status === 1)
                    status= styles.itemgradeocupado;
                else if (item.status === 2)
                    status= styles.itemgradereservado;

                return (
                    <TouchableOpacity style={styles.grade} 
                    onPress={() => navigation.navigate('details', { armarioSelec: item })}>
                        <Text style={status}>
                            <Image source={cadeado} style={{width: 20, height: 20}} /> {item.posicao} 
                        </Text>
                    </TouchableOpacity>
                );
            }}
            columnWrapperStyle={styles.column}
        />
        </View>
    );
}

