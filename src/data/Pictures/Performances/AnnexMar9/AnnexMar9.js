import annexPic6 from "./IMG_7075.jpg";
import annexPic5 from "./IMG_7105.jpg";
import annexPic3 from "./IMG_7130.jpg";
import annexPic2 from "./IMG_7213.jpg";
import annexPic4 from "./IMG_7219.jpg";
import annexPic1 from "./IMG_7288.jpg";

const showTitle = {
    text: "Headlined @ The Annex",
    link: "https://www.eventbrite.com/e/naturosynth-seasaw-fellow-kinsman-secret-menu-colorado-ave-tickets-828000029377"
};
const showVenue = "The Annex";
const showDate = "March 9th";
const showLocation = {
    text: "Madison, WI",
    link: "https://www.theredzonemadison.com/the-annex/"
};
const showPics = [annexPic1, annexPic2, annexPic3, annexPic4, annexPic5];
const showFeaturing = [
    {
        name: "Seasaw",
        link: "https://www.instagram.com/singseasaw/",
    },
    {
        name: "Fellow Kinsman",
        link: "https://www.instagram.com/fellowkinsmanmke/",
    },
    {
        name: "Secret Menu",
        link: "https://www.instagram.com/secretmenutheband/",
    },
    {
        name: "Colorado Ave",
        link: "https://www.instagram.com/coloradoaveband/",
    }
]
const showPress = [
    {
        name: "Wisconsin State Journal",
        link: "https://madison.com/life-entertainment/local/music/photos-naturosynth-performs-at-the-annex-at-red-zone-madison/collection_620d9c18-e15a-11ee-8b47-f75c8dbd4d60.html"
    },
    {
        name: "Isthumus",
        link: "https://isthmus.com/events/naturosynth-seasaw-fellow-kinsman-secret-menu-colorado-ave/"
    },
]

export const AnnexMar9 = {
    title: showTitle,
    date: showDate,
    location: showLocation,
    pics: showPics,
    featuring: showFeaturing,
    press: showPress,
    venue: showVenue,
}