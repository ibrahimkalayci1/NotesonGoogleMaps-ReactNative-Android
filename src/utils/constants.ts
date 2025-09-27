import { Dimensions } from "react-native";

const screenWidth =Dimensions.get("window").width;
const screenHeight =Dimensions.get("window").height;




enum MapTypes {
    hybrid = 'hybrid',
    mutedStandard = 'mutedStandard',
    none = 'none',
    satellite = 'satellite',
    standard = 'standard',
    terrain = 'terrain',
    satelliteFlyover= 'satelliteFlyover',
    hybridFlyover= 'hybridFlyover',
}

enum NoteTypes {
    note = 'note',
    discount = 'discount',
    warning = 'warning',
    accident = 'accident',
   
}

export {screenWidth,screenHeight,MapTypes,NoteTypes}