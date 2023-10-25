import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SkillCard = ({ skill, color }) => {
    return (
        <View style={color ? [styles.skillCard, { backgroundColor: color }] : styles.skillCard}>
            <Text style={color ? [styles.skillText, { color: 'black' }] : styles.skillText}>{skill}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    skillCard: {
        backgroundColor: '#1e3799',
        borderRadius: 12,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skillText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SkillCard;
