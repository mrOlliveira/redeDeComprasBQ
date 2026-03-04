import { useEffect, useState } from "react"; 
import { FlatList, View, Text } from "react-native"; 
import {styles} from '../styles/style';
//teste de commit
export default function HomeScreen() {
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
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.posicao}</Text>
                    </View>
                </View>
            )}
        />
        </View>
    );
}

