import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 1,
        marginTop: 15,
        marginBottom: 15
    },
    title: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.LG,
        fontFamily: THEME.FONT_FAMILY.BLACK,
        marginLeft: 35
    },
    subtitle:{
        color: THEME.COLORS.CAPTION_400,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        marginLeft: 35
    }

});