import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Share',
        fontSize: 18,
        alignSelf: 'center'
    },
    greet: {
        fontFamily: 'Share',
        fontSize: 22,
        marginVertical: 10,
        color: '#1f618d',
        alignSelf: 'center'
    },
    confirmText: {
        fontFamily: 'Share',
        fontSize: 18,
        marginVertical: 10
    },
    doctorName: {
        fontFamily: 'Share',
        fontSize: 22,
        marginVertical: 10,
        color: '#0b5345'
    },
    chamberName: {
        fontFamily: 'Share',
        fontSize: 20,
        marginVertical: 10
    },
    date: {
        fontFamily: 'Share',
        fontSize: 22,
        marginVertical: 10,
        color: '#5b2c6f'
    },
    confirmContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirm: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#16A085',
        borderRadius: 5,
        marginHorizontal: 2
    },
    cancel: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#b03a2e',
        borderRadius: 5,
        marginHorizontal: 2
    },
    review: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#5499c7',
        borderRadius: 5,
        marginVertical: 10
    },
    reviewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;