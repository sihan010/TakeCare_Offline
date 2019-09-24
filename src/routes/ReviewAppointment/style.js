import {StyleSheet} from 'react-native';
export default  StyleSheet.create({
    containter: {
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: '#FBFCFC'
    },
    doctorName: {
        fontFamily: 'Share',
        fontSize: 22,
        textAlign: 'center'
    },
    specialization: {
        fontFamily: 'Share',
        fontSize: 18,
        textAlign: 'center'
    },
    chamber: {
        fontFamily: 'Share',
        fontSize: 16,
        textAlign: 'center'
    },
    rating: {
        fontFamily: 'Share',
        fontSize: 18,
        textAlign: 'center'
    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#2980B9',
        borderRadius:10,
        margin:5,
        padding:5
    },
    prescriptionContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#2980B9',
        borderRadius:10,
        margin:5,
        padding:5
    },
    prescriptionButton:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'#138D75',
        borderRadius:10,
        margin:5,
        paddingHorizontal:20,
        paddingVertical:10
    },
    submitButton:{
        width:'50%',
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'#138D75',
        borderRadius:10,
        marginTop:5,
        paddingHorizontal:20,
        paddingVertical:10
    },
    date:{
        fontFamily: 'Share',
        fontSize: 20,
        textAlign: 'center',
        color:'#117A65'
    },
    imageStyle:{
        borderRadius:10,
        height:500,
        width:300,
        alignSelf:'center'
    }
});