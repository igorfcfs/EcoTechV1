import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function PrimaryButton({ text, onPress }) {
    return (
        <TouchableOpacity style={styles.botaoLink} onPress={onPress}>
            <Text style={styles.botaoLinkTexto}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botaoLink: {
        marginTop: 10,
    },
    botaoLinkTexto: {
        color: 'green',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
})
