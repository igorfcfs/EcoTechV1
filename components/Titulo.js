import { Text, StyleSheet } from 'react-native';
import { colors } from '../styles/index'

export default function Title({ text }) {
    return <Text style={styles.title}>{text}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: colors.title
    },
})