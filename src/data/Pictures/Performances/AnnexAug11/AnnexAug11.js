import annexPic1 from "./annex1-min.jpg";
import annexPic2 from "./annex2-min.jpg";
import annexPic3 from "./annex3-min.jpg";
import annexPic4 from "./annex4-min.jpg";
import annexPic5 from "./annex5-min.jpg";

const showTitle = {
    text: "Headlined @ The Annex",
    link: "https://www.eventbrite.com/e/naturosynth-moonglow-conor-keogh-jacob-slade-tickets-686837739167?aff=oddtdtcreator"
};
const showVenue = "The Annex";
const showDate = "August 11th";
const showLocation = {
    text: "Madison, WI",
    link: "https://www.theredzonemadison.com/the-annex/"
};
const showPics = [annexPic1, annexPic2, annexPic3, annexPic4, annexPic5];
const showFeaturing = [
    {
        name: "Jacob Slade",
        link: "https://www.instagram.com/jacob_slade_/",
    },
    {
        name: "Conor",
        link: "https://www.instagram.com/conor.keogh/",
    },
    {
        name: "Moonglow",
        link: "https://www.instagram.com/moonglow_the_band/",
    }
]
const showPress = [
    {
        name: "Isthumus",
        link: "https://isthmus.com/events/naturosynth-moonglow-conor-keogh-jacob-slade/"
    },
    {
        name: "Wisconsin State Journal",
        link: "https://madison.com/events/naturosynth-jpg/image_acdff25a-c2b8-54be-95e4-7ab57519b78b.html"
    }
]

export const AnnexAug11 = {
    title: showTitle,
    date: showDate,
    location: showLocation,
    pics: showPics,
    featuring: showFeaturing,
    press: showPress
}