import {StyleSheet} from 'react-native';
import {dimensions} from 'src/styles';

const {rem} = dimensions;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        flex: 1,
        zIndex: 0,
        backgroundColor: '#f6f6f6'
    },
    searchButton: {
        alignSelf: 'flex-end',
        marginRight: 15 * rem,
        marginBottom: 15 * rem
    },
    globeButton: {
        marginVertical: 15 * rem,
        alignSelf: 'center',
        backgroundColor: '#36237d',
        height: 60 * rem,
        width: 60 * rem,
        borderRadius: 30 * rem,
        justifyContent: 'center',
        alignItems: 'center'
    },
    absolutePosition: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        bottom: 0
    }
});

export default styles;
