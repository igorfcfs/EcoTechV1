import { TextInput, StyleSheet } from 'react-native';
import { colors, fonts, metrics  } from '../styles/index';

export default function Input({ 
    placeholder, 
    keyboardType, 
    secureTextEntry, 
    value, 
    onChangeText, 
    style,
    editable
}) {
    return (
        <TextInput
            placeholder={placeholder}
            style={StyleSheet.flatten([styles.input, style])} // 🔹 Permite mesclar estilos personalizados
            placeholderTextColor="#4CAF50" // 🔹 Mantém a cor do placeholder no tom do app
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: colors.primario, // Verde moderno
        color: colors.title, // Verde escuro
        borderRadius: 5, // Bordas mais arredondadas
        padding: 15,
        fontSize: fonts.input, //16
        marginBottom: metrics.tripleSmallMargin, //15
        shadowColor: '#000', // Sombras para melhor visualização
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Efeito de sombra no Android
    },
});
