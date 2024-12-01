import { Card, Typography, FormControl } from "@mui/material";

import { styled } from "@mui/material/styles";
import { TPP_site_fonts } from "../../styles/TPP_site_fonts";
import { TPP_site_colors } from "../../styles/TPP_site_colors";

// typography
export const HeaderTypography = styled(Typography)({
    fontFamily: TPP_site_fonts.header,
    color: TPP_site_colors.headerBlack,
    fontSize: '30px'
});
export const SubheaderTypography = styled(Typography)({
    fontFamily: TPP_site_fonts.header,
    color: TPP_site_colors.headerBlack,
    fontSize: '20px'
});
export const CategoryTypography = styled(Typography)({
    fontFamily: TPP_site_fonts.category,
    fontSize: '15px'
});
export const SummaryTypography = styled(Typography)({
    fontFamily: TPP_site_fonts.summary,
    fontSize: '14px'
});
export const BylineTypography = styled(Typography)({
    fontFamily: TPP_site_fonts.byline,
    color: TPP_site_colors.bylineGrey,
    fontSize: '14px'
});
export const TextTypography = styled(Typography)({
    fontFamily: TPP_site_fonts.text,
    fontSize: '12px'
});

// card typography
export const CardHeaderTypography = styled(Typography)({
    fontFamily: TPP_site_fonts.header,
    color: TPP_site_colors.headerBlack,
    fontSize: '18px',
    '&:hover':{
        cursor: 'pointer',
        color: TPP_site_colors.headerBlackHover
    }
});
// export const CategoryTypography = styled(Typography)({
//     fontFamily: TPP_site_fonts.category,
//     fontSize: '15px'
// });
// export const SummaryTypography = styled(Typography)({
//     fontFamily: TPP_site_fonts.summary,
//     fontSize: '14px'
// });
// export const BylineTypography = styled(Typography)({
//     fontFamily: TPP_site_fonts.byline,
//     color: TPP_site_colors.bylineGrey,
//     fontSize: '14px'
// });
// export const TextTypography = styled(Typography)({
//     fontFamily: TPP_site_fonts.text,
//     fontSize: '12px'
// });


// cards
export const StyledArticleCard = styled(Card)({
    margin: '10px',
    padding: '7px',

    // outline: 'none',
    
    border: '1px solid ' + TPP_site_colors.dividerGrey,
    borderRadius: '7px',
    
    boxShadow: 'none',
    transition: '0.5s ease-in-out',
    
    '&:hover':{
        cursor: 'pointer',
        border: '1px solid black',
    }
});

//  viz form control
export const StyledFormControl = styled(FormControl)({
    margin: '1%',
    minWidth: 120,
  });